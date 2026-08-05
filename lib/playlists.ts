export interface PlaylistThumbnail {
  id: string;
  title: string;
  imageUrl: string;
  playlistUrl: string;
}

export const defaultPlaylists: PlaylistThumbnail[] = [
  {
    id: "playlist-1",
    title: "Art of Possibility — Insights & Conversations",
    imageUrl: "/AOP 01 cover pic.jpg",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
  {
    id: "playlist-2",
    title: "Relational Excellence — Reflections & Guidance",
    imageUrl: "/RE 01 cover pic.jpg",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
  {
    id: "playlist-3",
    title: "Self Mastery — Personal Growth & Transformation",
    imageUrl: "/SM intro cover pic.jpg",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
];
