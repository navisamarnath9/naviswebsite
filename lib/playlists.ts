export interface PlaylistThumbnail {
  id: string;
  title: string;
  imageUrl: string;
  playlistUrl: string;
}

export const defaultPlaylists: PlaylistThumbnail[] = [
  {
    id: "playlist-1",
    title: "Navisamarnath Insights & Conversations",
    imageUrl: "/homepage-video-thumbnail.png",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
  {
    id: "playlist-2",
    title: "Therapeutic Reflections & Guidance",
    imageUrl: "/thumbnail.jpeg",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
  {
    id: "playlist-3",
    title: "Personal Growth & Emotional Health",
    imageUrl: "/homepage-video-thumbnail-16-9.png",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
];
