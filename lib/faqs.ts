import { site } from "@/lib/site";

export const HOME_FAQS = [
  {
    q: "How does mobile detailing work?",
    a: "We roll up to your location and use your water and power hookups. We walk the vehicle with you, set expectations, then work carefully with our own towels, tools, and products matched to your paint and interior.",
  },
  {
    q: "Can I drop off instead?",
    a: "Yes - drop-offs are by appointment. We will confirm timing and what to expect for handoff and pickup when you request a quote.",
  },
  {
    q: "What areas do you serve?",
    a: `Home base in Bothell. We regularly serve ${site.servedAreas}.`,
  },
  {
    q: "How do I get pricing?",
    a: "Packages on the Services page are a starting point; every job gets a quick quote based on condition, size, and add-ons. Photos help us recommend the right package.",
  },
] as const;
