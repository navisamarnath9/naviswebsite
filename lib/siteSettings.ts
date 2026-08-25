export type SiteSettings = {
  introVideoSource: string;
  introVideoPoster: string;
  groupWhyImage: string;
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
  xUrl: "",
  threadsUrl: "",
};
