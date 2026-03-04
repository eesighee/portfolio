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
  {
    slug: "dual-c8s",
    title: "Dual C8's",
    date: "2026-03-04",
    description: "Two C8's and a spectacular sunset.",
    shareLinkId: "4e18937b-7379-4ba1-a7c4-9cc0e95701a4",
  },
  {
    slug: "gas-station-vette",
    title: "Gas Station Vette",
    date: "2026-03-04",
    description: "Wrapped Corvette shines even at night.",
    shareLinkId: "d2874b19-071e-43b1-bc80-3ad094892f9f",
  },
];
