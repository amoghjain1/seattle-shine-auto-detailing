"use server";

import { Resend } from "resend";
import type { ContactState } from "@/lib/contact-form-state";
import { site } from "@/lib/site";
import {
  addOnLabel,
  isValidAddOnId,
  packageLabel,
  type PackageId,
} from "@/lib/packages";

function isPackageId(v: string): v is PackageId {
  return v === "limited-protection" || v === "ultimate-protection";
}

function trackingValue(formData: FormData, key: string): string {
  const raw = String(formData.get(key) ?? "").trim();
  if (!raw) return "";
  return raw.slice(0, 120);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const vehicle = String(formData.get("vehicle") ?? "").trim();
  const packageRaw = String(formData.get("package") ?? "").trim();
  const serviceType = String(formData.get("serviceType") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const addOnRaw = formData.getAll("addOn").map((v) => String(v).trim());
  const utmSource = trackingValue(formData, "utm_source");
  const utmMedium = trackingValue(formData, "utm_medium");
  const utmCampaign = trackingValue(formData, "utm_campaign");
  const utmContent = trackingValue(formData, "utm_content");

  if (!name || !email || !phone) {
    return { ok: false, message: "Please fill in name, email, and phone." };
  }

  if (!vehicle) {
    return { ok: false, message: "Please enter your vehicle make and model." };
  }

  if (!isPackageId(packageRaw)) {
    return {
      ok: false,
      message: "Please choose Full Detail Limited or Ultimate Protection.",
    };
  }

  if (serviceType !== "mobile" && serviceType !== "dropoff") {
    return { ok: false, message: "Please choose how you would like service." };
  }

  const addOnIds = [...new Set(addOnRaw)].filter(Boolean);
  for (const id of addOnIds) {
    if (!isValidAddOnId(id)) {
      return { ok: false, message: "Invalid add-on selection." };
    }
  }
  const addOnLine =
    addOnIds.length === 0
      ? "None"
      : addOnIds.map((id) => addOnLabel(id) ?? id).join("; ");

  const pkgLine = packageLabel(packageRaw);

  const body = [
    `New inquiry — ${site.name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Vehicle: ${vehicle || "—"}`,
    `Package: ${pkgLine}`,
    `Add-ons: ${addOnLine}`,
    `Service: ${
      serviceType === "dropoff"
        ? "Drop-off at my home — Seattle Shine owner (by appointment)"
        : "Mobile at your location — you as the client (we use your water & power hookups)"
    }`,
    "",
    "Attribution:",
    `UTM source: ${utmSource || "—"}`,
    `UTM medium: ${utmMedium || "—"}`,
    `UTM campaign: ${utmCampaign || "—"}`,
    `UTM content: ${utmContent || "—"}`,
    "",
    notes ? `Notes:\n${notes}` : "",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY missing — logging only");
    console.warn(body);
    return {
      ok: true,
      message:
        "Thanks — your message was received (demo mode: configure RESEND_API_KEY to email).",
    };
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? "Seattle Shine <onboarding@resend.dev>";
  // Resend test sender only allows delivering to the account owner inbox; a
  // customer `replyTo` triggers validation_error (403). Omit until you verify a
  // domain and use a `from` on that domain.
  const sandboxFrom = /onboarding@resend\.dev/i.test(from);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    ...(sandboxFrom ? {} : { replyTo: email }),
    subject: `New detail request from ${name}`,
    text: body,
  });

  if (error) {
    console.error(error);
    return {
      ok: false,
      message: "Something went wrong sending your message. Please call or DM us.",
    };
  }

  return {
    ok: true,
    message: "Thanks — we will get back to you shortly with availability and a quote.",
  };
}
