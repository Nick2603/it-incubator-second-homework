import { IVideo, Resolutions } from "../types/IVideo";

const videos: IVideo[] = [];

export const videosRepository = {
  deleteAllVideos(): void {
    videos.length = 0;
  },

  getVideos(title?: string): IVideo[] {
    if (title) {
      return videos.filter(v => v.title.indexOf(title) > -1);
    };
    return videos;
  },

  getVideoById(id: number): IVideo | undefined {
    const video = videos.find(v => v.id === id);
    return video;
  },

  createVideo(title: string, author: string, availableResolutions: Resolutions[] = []): IVideo {
    const today = new Date();
    const tomorrow = new Date().setDate(today.getDate() + 1);
    const newVideo: IVideo = {
      id: +Date.now().toString(),
      title,
      author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: today.toISOString(),
      publicationDate: new Date(tomorrow).toISOString(),
      availableResolutions,
    };
    videos.unshift(newVideo);
    return newVideo;
  },

  updateVideo(id: number, title: string, author: string, availableResolutions: Resolutions[] = [], canBeDownloaded = false, minAgeRestriction = null, publicationDate: string): IVideo | undefined {
    const video = videos.find(v => v.id === id);
    if (video) {
      video.title = title;
      video.author = author;
      video.availableResolutions = availableResolutions;
      video.canBeDownloaded = canBeDownloaded;
      video.minAgeRestriction = minAgeRestriction;
      video.publicationDate = publicationDate;
      return video;
    };
    return;
  },

  deleteVideo(id: number): boolean {
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].id === id) {
        videos.splice(i, 1);
        return true;
      };
    };
    return false;
  },
};
