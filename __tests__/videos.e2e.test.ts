import request from 'supertest';
import { app } from '../src/settings';
import { CodeResponsesEnum } from '../src/types/CodeResponsesEnum';
import { IVideo } from '../src/types/IVideo';

describe('/videos', () => {
  let newVideo: IVideo;
  beforeAll(async () => {
      await request(app).delete('/testing/all-data').expect(204);
  });

  it('GET videos = []', async () => {
      await request(app).get('/videos/').expect([]);
  });

  it('POST does not create the video with incorrect data (no title, no author)', async function () {
    await request(app)
      .post('/videos/')
      .send({ title: '', author: '' })
      .expect(CodeResponsesEnum.Incorrect_values_400, {
        errorsMessages: [
          { message: 'Incorrect value for title', field: 'title' },
          { message: 'Incorrect value for author', field: 'author' },
        ],
      });

    const res = await request(app).get('/videos/');
    expect(res.body).toEqual([]);
  })

  it('POST does create the video with correct data (title, author)', async function () {
    const response = await request(app)
      .post('/videos/')
      .send({ title: 'test', author: 'Jack' })
      .expect(CodeResponsesEnum.Created_201);

    newVideo = response.body;
    const res = await request(app).get('/videos/');
    expect(res.body.length).toEqual(1);
  })

  it('GET video by ID with incorrect id', async () => {
    await request(app).get('/videos/helloWorld').expect(404);
  });
  it('GET video by ID with correct id', async () => {
    await request(app)
      .get('/videos/' + newVideo!.id)
      .expect(200, newVideo)
  });

  it('PUT video by ID with incorrect data', async () => {
    await request(app)
      .put('/videos/' + 1223)
      .send({ title: 'title', author: 'title' })
      .expect(CodeResponsesEnum.Not_found_404)

    const res = await request(app).get('/videos/');
    expect(res.body[0]).toEqual(newVideo);
  })

  it('PUT video by ID with correct data', async () => {
    await request(app)
      .put('/videos/' + newVideo!.id)
      .send({
        title: 'hello title',
        author: 'hello author',
        publicationDate: '2023-01-12T08:12:39.261Z',
      })
      .expect(CodeResponsesEnum.No_content_204)

    const res = await request(app).get('/videos/');
    expect(res.body[0]).toEqual({
      ...newVideo,
      title: 'hello title',
      author: 'hello author',
      publicationDate: '2023-01-12T08:12:39.261Z',
    })
    newVideo = res.body[0]
  });

  it('DELETE video by incorrect ID', async () => {
    await request(app)
      .delete('/videos/876328')
      .expect(CodeResponsesEnum.Not_found_404)

    const res = await request(app).get('/videos/');
    expect(res.body[0]).toEqual(newVideo);
  })

  it('DELETE video by correct ID', async () => {
    await request(app)
      .delete('/videos/' + newVideo!.id)
      .expect(CodeResponsesEnum.No_content_204)

    const res = await request(app).get('/videos/');
    expect(res.body.length).toBe(0);
  });
});
