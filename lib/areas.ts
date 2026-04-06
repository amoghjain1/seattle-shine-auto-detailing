export type ServiceAreaPage = {
  slug: string;
  city: string;
  title: string;
  intro: string;
  highlights: string[];
};

export const SERVICE_AREAS: ServiceAreaPage[] = [
  {
    slug: "bothell",
    city: "Bothell",
    title: "Auto detailing in Bothell",
    intro:
      "Seattle Shine is based in Bothell, offering both mobile and drop-off detailing with quote-first service and premium finish standards.",
    highlights: [
      "Home-base scheduling flexibility for faster appointments",
      "Interior resets, exterior wash, wheel care, and protection packages",
      "Trusted by local repeat clients and families",
    ],
  },
  {
    slug: "woodinville",
    city: "Woodinville",
    title: "Auto detailing in Woodinville",
    intro:
      "From neighborhood driveways to scheduled handoffs, we bring high-end detailing standards to Woodinville clients who care about long-lasting finish quality.",
    highlights: [
      "Mobile appointments for busy schedules",
      "Condition-based quotes with no one-size-fits-all pricing",
      "Protection-focused service for daily drivers and weekend cars",
    ],
  },
  {
    slug: "everett",
    city: "Everett",
    title: "Auto detailing in Everett",
    intro:
      "Seattle Shine serves Everett with premium detail packages designed around your vehicle condition, size, and goals.",
    highlights: [
      "Everett route coverage with responsive quote turnaround",
      "Complete interior deep clean plus paint-safe wash process",
      "Add-ons available for pet hair, headlight restoration, and more",
    ],
  },
  {
    slug: "seattle",
    city: "Seattle",
    title: "Auto detailing in Seattle",
    intro:
      "For Seattle clients looking for a cleaner, glossier vehicle without shop hassle, Seattle Shine offers mobile detailing and protected finish results.",
    highlights: [
      "Mobile detailing built for city schedules",
      "Premium product stack and careful prep process",
      "Quote-first service with transparent expectations",
    ],
  },
  {
    slug: "renton",
    city: "Renton",
    title: "Auto detailing in Renton",
    intro:
      "Seattle Shine serves Renton with premium detailing packages and add-ons that are tailored to your car instead of fixed menu pricing.",
    highlights: [
      "Renton service coverage from a Bothell-based specialist",
      "Interior + exterior detail options with protection upgrades",
      "Friendly, responsive service built on repeat customers",
    ],
  },
];

export function areaBySlug(slug: string): ServiceAreaPage | undefined {
  return SERVICE_AREAS.find((area) => area.slug === slug);
}
