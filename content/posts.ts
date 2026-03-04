export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  shareLinkId: string;
  cover?: string;
  captions?: Record<string, string>;
};

export const posts: BlogPost[] = [
  {
    slug: "revuelto",
    title: "Revuelto",
    date: "2024-10-16",
    description: "Lamborghini Revuelto at golden hour.",
    shareLinkId: "a21dc138-0fe1-426c-9a27-1912ad4b2700"
  },
  {
    slug: "dual-c8s",
    title: "Dual C8's",
    date: "2026-03-04",
    description: "Two C8's and a spectacular sunset.",
    shareLinkId: "4e18937b-7379-4ba1-a7c4-9cc0e95701a4",
    cover: "bronze-13.jpg"
  },
  {
    slug: "gas-station-vette",
    title: "Gas Station Vette",
    date: "2026-03-04",
    description: "Wrapped Corvette shines even at night.",
    shareLinkId: "d2874b19-071e-43b1-bc80-3ad094892f9f"
  },
  {
    slug: "mclaren",
    title: "P1 HDK McLaren",
    date: "2026-03-04",
    description: "Behold, the P1 HDK McLaren. The hybrid holy trinity, evolved.",
    shareLinkId: "f46b621a-e900-4b65-8bf2-0d9b15155ba5",
    cover: "p1-2.jpg"
  },
  {
    slug: "no-kings",
    title: "No Kings Protest",
    date: "2026-03-04",
    description: "The power rests with the people, not a throne.",
    shareLinkId: "d5eba3fb-7874-442d-8ef9-8e99a3e2b074",
  },
  {
    slug: "cooper",
    title: "Cooper",
    date: "2026-03-04",
    description: "Man's best friend.",
    shareLinkId: "11c534d1-2bee-419f-95e4-f96def1720ec"
  }
];


/*

mclaren - f46b621a-e900-4b65-8bf2-0d9b15155ba5

no kings - d5eba3fb-7874-442d-8ef9-8e99a3e2b074

coop - 11c534d1-2bee-419f-95e4-f96def1720ec

*/