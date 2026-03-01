export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  shareLinkId: string;
  captions?: Record<string, string>;
};

export const posts: BlogPost[] = [
  {
    slug: "revuelto",
    title: "Revuelto",
    date: "2024-10-16",
    description: "Lamborghini Revuelto at golden hour.",
    shareLinkId: "a21dc138-0fe1-426c-9a27-1912ad4b2700",
  },
];
