export interface PlaylistThumbnail {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  playlistUrl: string;
}

export const defaultPlaylists: PlaylistThumbnail[] = [
  {
    id: "playlist-1",
    title: "Relationship Engineering",
    description: "Understanding the patterns, emotions, and choices that shape our relationships — and learning how to build stronger, healthier connections.",
    imageUrl: "/RE 01 cover pic.jpg",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
  {
    id: "playlist-2",
    title: "The Art of Parenting",
    description: "A thoughtful look at the everyday moments of parenting — helping us understand our children while growing alongside them.",
    imageUrl: "/AOP 01 cover pic.jpg",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
  {
    id: "playlist-3",
    title: "Becoming Me",
    description: "Exploring the journey of becoming more self-aware, authentic, and intentional in the way we live, relate, and grow.",
    imageUrl: "/SM intro cover pic.jpg",
    playlistUrl: "https://www.youtube.com/@navisamarnath/playlists",
  },
];
