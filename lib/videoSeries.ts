export interface YouTubeVideo {
  id: string;
  youtubeUrl: string;
  title: string;
  description?: string;
  createdAt?: string;
}

export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeVideoId(url);
  if (id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return "/thumbnail.jpeg";
}

export function getYouTubeEmbedUrl(url: string): string {
  const id = getYouTubeVideoId(url);
  if (id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  return url;
}

export const defaultVideos: YouTubeVideo[] = [
  {
    id: "default-1",
    youtubeUrl: "https://www.youtube.com/watch?v=f_out_1_z2fwcd",
    title: "Navisamarnath Introduction: Where Aspiration Meets Transformation",
    description:
      "A safe and supportive space to explore your emotions, heal from past wounds, and unlock your fullest potential.",
    createdAt: "2026-08-01",
  },
  {
    id: "default-2",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Understanding Anxiety & Building Lasting Inner Resilience",
    description:
      "Practical tools and emotional insights to help navigate overwhelmed thoughts and restore balance.",
    createdAt: "2026-08-03",
  },
];
