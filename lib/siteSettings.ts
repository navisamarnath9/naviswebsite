export type SiteSettings = {
  introVideoSource: string;
  introVideoPoster: string;
  groupWhyImage: string;
  imageOverrides: Record<string, string>;
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
  imageOverrides: {},
  xUrl: "https://x.com",
  instagramUrl: "https://www.instagram.com/navisamarnath?igsh=MWw5aHRob3FzaWpybg==",
  facebookUrl: "https://www.facebook.com/share/14nQckuA18H/?mibextid=wwXIfr",
  youtubeUrl: "https://www.youtube.com/@navisamarnath",
  threadsUrl: "https://www.threads.net",
};

export const imageLibrary = [
  { label: "Footer & FAQ logo", src: "/logo-white.png" },
  { label: "Home page hero", src: "https://res.cloudinary.com/ndgpjcbs/image/upload/v1786116768/hero-navis-pic_uf9rl2.jpg" },
  { label: "About page hero", src: "https://res.cloudinary.com/ndgpjcbs/image/upload/v1786116749/About_-_cut_jtxbui.jpg" },
  { label: "FAQ page hero", src: "https://res.cloudinary.com/ndgpjcbs/image/upload/v1786116850/faq-hero_hnpo5g.jpg" },
  { label: "Resources page hero", src: "https://res.cloudinary.com/ndgpjcbs/image/upload/v1786116865/resources-hero_etwt8i.jpg" },
  { label: "Individual therapy service image", src: "/service-individual.png" },
  { label: "Couples therapy service image", src: "/service-couples.png" },
  { label: "Coaching service image", src: "/service-coaching.png" },
  { label: "Group sessions service image", src: "/service-groups.png" },
  { label: "Individual therapy booking image", src: "/Individual Therapy.jpg" },
  { label: "Couples therapy booking image", src: "/Couple.jpg" },
  { label: "Coaching booking image", src: "/Coaching.jpg" },
  { label: "Group sessions booking image", src: "/Group Sessions.jpg" },
  { label: "Shared profile & article image", src: "/About - cut.jpg" },
  { label: "Shared home page image", src: "/Home Page.jpg" },
  { label: "Playlist thumbnail fallback", src: "/homepage-video-thumbnail.png" },
] as const;