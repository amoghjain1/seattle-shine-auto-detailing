export type PackageId = "limited-protection" | "ultimate-protection";

export const packages: {
  id: PackageId;
  name: string;
  subtitle: string;
  blurb: string;
  features: string[];
  featured?: boolean;
}[] = [
  {
    id: "limited-protection",
    name: "Full Detail Limited Protection",
    subtitle: "Interior, exterior & wheel care",
    blurb:
      "Deep interior reset, premium hand wash, paint decon, and dressed wheels — full detail without ceramic or mat coating.",
    features: [
      "Complete Interior Deep Clean: Vacuum, Deep Clean, and steam.",
      "Leather: Condition for all leather seats.",
      "Detailing: Crevice-level cleaning vents, cup holders, console, streak-free glass, and fresh scent restoration.",
      "Premium Exterior Wash: Foam Wash, Two-bucket hand wash including all door jambs.",
      "Paint Decontamination: Removal of minor bugs and road grime.",
      "Wheel & Tire Treatment: Deep wheel clean finished with a premium tire dressing.",
    ],
  },
  {
    id: "ultimate-protection",
    name: "Full Detail Ultimate Protection",
    subtitle: "Everything in Limited, plus coatings",
    blurb:
      "Our top tier: every Limited Protection step, weather mat protection, and a premium ceramic coating for lasting gloss and hydrophobic protection.",
    featured: true,
    features: [
      "Includes Everything in the Limited Protection Package, PLUS:",
      "Weather Mat Protection: Deep clean and apply protective coating to all weather mats.",
      "Ceramic Coating: Application of a premium 1-3 year ceramic coating (2-year coating applied as the standard) for long-lasting paint protection and hydrophobic shine.",
    ],
  },
];

export const ADD_ON_OPTIONS = [
  { id: "carpet-shampoo", label: "Carpet shampoo / stain removal" },
  { id: "light-sealant-wax", label: "Light sealant & wax" },
  { id: "headlight-restoration", label: "Headlight restoration" },
  { id: "engine-bay", label: "Engine bay detailing" },
  { id: "pet-hair", label: "Pet hair removal" },
] as const;

export type AddOnId = (typeof ADD_ON_OPTIONS)[number]["id"];

const addOnIdSet = new Set<string>(ADD_ON_OPTIONS.map((o) => o.id));

export function isValidAddOnId(v: string): v is AddOnId {
  return addOnIdSet.has(v);
}

export function addOnLabel(id: string): string | undefined {
  return ADD_ON_OPTIONS.find((o) => o.id === id)?.label;
}

export function packageLabel(id: PackageId): string {
  const p = packages.find((x) => x.id === id);
  return p ? p.name : id;
}
