import { z } from "zod";
import { isValidAddOnId } from "@/lib/packages";

const CTRL = new RegExp("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]", "g");

/** Single-line PII fields: no HTML brackets, no control chars, normalized space. */
export function sanitizeSingleLine(input: string, maxLen: number): string {
  const s = input
    .replace(CTRL, "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return s.slice(0, maxLen);
}

/** Notes: allow newlines; strip tags and NUL etc. */
export function sanitizeNotes(input: string, maxLen: number): string {
  const s = input.replace(CTRL, "").replace(/[<>]/g, "");
  return s.slice(0, maxLen).trim();
}

/** Email: do not collapse internal spaces (valid local-parts can include them rarely). */
export function sanitizeEmail(input: string, maxLen: number): string {
  return input
    .replace(CTRL, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLen)
    .toLowerCase();
}

const packageIdSchema = z.enum(["limited-protection", "ultimate-protection"]);
const serviceTypeSchema = z.enum(["mobile", "dropoff"]);

export const contactFormSchema = z
  .object({
    name: z.string().min(1).max(120),
    email: z.string().email().max(254),
    phone: z.string().min(1).max(40),
    vehicle: z.string().min(1).max(200),
    package: packageIdSchema,
    serviceType: serviceTypeSchema,
    notes: z.string().max(4000),
    addOnIds: z.array(z.string()).max(20),
    utmSource: z.string().max(120),
    utmMedium: z.string().max(120),
    utmCampaign: z.string().max(120),
    utmContent: z.string().max(120),
  })
  .superRefine((data, ctx) => {
    for (const id of data.addOnIds) {
      if (!isValidAddOnId(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid add-on selection.",
          path: ["addOnIds"],
        });
        return;
      }
    }
  });

export type ContactFormParsed = z.infer<typeof contactFormSchema>;

export function parseContactFormFromFormData(formData: FormData):
  | { ok: true; data: ContactFormParsed }
  | { ok: false; message: string } {
  const addOnRaw = formData.getAll("addOn").map((v) => String(v).trim());
  const addOnIds = [...new Set(addOnRaw)].filter(Boolean);

  const raw = {
    name: sanitizeSingleLine(String(formData.get("name") ?? ""), 120),
    email: sanitizeEmail(String(formData.get("email") ?? ""), 254),
    phone: sanitizeSingleLine(String(formData.get("phone") ?? ""), 40),
    vehicle: sanitizeSingleLine(String(formData.get("vehicle") ?? ""), 200),
    package: String(formData.get("package") ?? "").trim(),
    serviceType: String(formData.get("serviceType") ?? "").trim(),
    notes: sanitizeNotes(String(formData.get("notes") ?? ""), 4000),
    addOnIds,
    utmSource: sanitizeSingleLine(String(formData.get("utm_source") ?? ""), 120),
    utmMedium: sanitizeSingleLine(String(formData.get("utm_medium") ?? ""), 120),
    utmCampaign: sanitizeSingleLine(String(formData.get("utm_campaign") ?? ""), 120),
    utmContent: sanitizeSingleLine(String(formData.get("utm_content") ?? ""), 120),
  };

  const parsed = contactFormSchema.safeParse(raw);
  if (parsed.success) {
    return { ok: true, data: parsed.data };
  }

  const flat = parsed.error.flatten();
  if (
    flat.fieldErrors.name?.length ||
    flat.fieldErrors.email?.length ||
    flat.fieldErrors.phone?.length
  ) {
    return { ok: false, message: "Please fill in name, email, and phone." };
  }
  if (flat.fieldErrors.vehicle?.length) {
    return { ok: false, message: "Please enter your vehicle make and model." };
  }
  if (flat.fieldErrors.package?.length) {
    return {
      ok: false,
      message: "Please choose Full Detail Limited or Ultimate Protection.",
    };
  }
  if (flat.fieldErrors.serviceType?.length) {
    return { ok: false, message: "Please choose how you would like service." };
  }
  if (flat.fieldErrors.addOnIds?.length) {
    return { ok: false, message: "Invalid add-on selection." };
  }

  return { ok: false, message: "Please check your information and try again." };
}
