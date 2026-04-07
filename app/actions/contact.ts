"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import type { ContactState } from "@/lib/contact-form-state";
import { parseContactFormFromFormData } from "@/lib/contact-form-schema";
import { addOnLabel, packageLabel } from "@/lib/packages";
import {
  clientIpFromHeaders,
  getContactRatelimit,
} from "@/lib/rate-limit";
import { site } from "@/lib/site";

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = parseContactFormFromFormData(formData);
  if (!parsed.ok) {
    return { ok: false, message: parsed.message };
  }

  const {
    name,
    email,
    phone,
    vehicle,
    package: packageId,
    serviceType,
    notes,
    addOnIds,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
  } = parsed.data;

  const limiter = getContactRatelimit();
  if (limiter) {
    try {
      const h = await headers();
      const ip = clientIpFromHeaders(h);
      const { success } = await limiter.limit(`contact:${ip}`);
      if (!success) {
        return {
          ok: false,
          message:
            "Too many requests. Please wait a few minutes and try again.",
        };
      }
    } catch (err) {
      console.warn("[contact] rate limit check failed — allowing request", err);
    }
  }

  const addOnLine =
    addOnIds.length === 0
      ? "None"
      : addOnIds.map((id) => addOnLabel(id) ?? id).join("; ");

  const pkgLine = packageLabel(packageId);

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
    message:
      "Thanks — we will get back to you shortly with availability and a quote.",
  };
}
