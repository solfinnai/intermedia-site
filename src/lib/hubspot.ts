/**
 * HubSpot contact embed settings.
 *
 * Verified from Andrew Blanco's 24 Sep 2026 email, which contained only:
 * https://js-na2.hsforms.net/forms/embed/47186401.js
 *
 * That URL is the new HubSpot forms editor script for portal 47186401
 * in the na2 region. It does not include a form GUID. The live script
 * defaults data-region to na1 when the attribute is omitted, so the
 * contact page must set data-region="na2".
 *
 * The form GUID is public (it appears in the embed markup). It is not a
 * secret. Leave it unset until Andrew sends the real data-form-id.
 */

export const HUBSPOT_PORTAL_ID = "47186401";
export const HUBSPOT_REGION = "na2";
export const HUBSPOT_EMBED_SCRIPT_URL =
  "https://js-na2.hsforms.net/forms/embed/47186401.js";

/** Public env var. Not a secret. Rebuild after changing it. */
export const HUBSPOT_FORM_ID_ENV = "NEXT_PUBLIC_HUBSPOT_FORM_ID";

const FORM_ID_PATTERN =
  /^[{]?[0-9a-f]{8}-?([0-9a-f]{4}-?){3}[0-9a-f]{12}[}]?$/i;

export function parseHubSpotFormId(value: string | undefined | null): string | null {
  const trimmed = value?.trim() ?? "";
  if (!FORM_ID_PATTERN.test(trimmed)) return null;
  const hex = trimmed.replace(/[{}-]/g, "").toLowerCase();
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function hubSpotFormIdsMatch(left: string, right: string): boolean {
  return left.replace(/[{}-]/g, "").toLowerCase() === right.replace(/[{}-]/g, "").toLowerCase();
}

export function getHubSpotFormId(): string | null {
  const raw = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
  const parsed = parseHubSpotFormId(raw);
  if (raw?.trim() && !parsed) {
    console.error(
      `${HUBSPOT_FORM_ID_ENV} is set but is not a HubSpot form GUID. The contact page is staying on the email-draft preview.`,
    );
  }
  return parsed;
}
