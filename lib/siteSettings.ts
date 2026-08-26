export type SiteSettings = {
  introVideoSource: string;
  introVideoPoster: string;
  groupWhyImage: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  xUrl: string;
  threadsUrl: string;
};

export const defaultSiteSettings: SiteSettings = {
  // This is the current Cloudinary URL. Replace it in Admin with the Cloudflare
  // Stream delivery URL once the video has been uploaded there.
  introVideoSource:
    "https://res.cloudinary.com/ndgpjcbs/video/upload/v1785835870/f_out_1_z2fwcd.mp4",
  introVideoPoster: "/web. Intro. cover pic.jpg",
  groupWhyImage: "/Group Sessions.jpg",
  xUrl: "https://x.com",
  instagramUrl: "https://www.instagram.com/navisamarnath?igsh=MWw5aHRob3FzaWpybg==",
  facebookUrl: "https://www.facebook.com/share/14nQckuA18H/?mibextid=wwXIfr",
  youtubeUrl: "https://www.youtube.com/@navisamarnath",
  threadsUrl: "https://www.threads.net",
};
