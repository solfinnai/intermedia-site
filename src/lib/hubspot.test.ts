import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  HUBSPOT_EMBED_SCRIPT_URL,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_REGION,
  hubSpotFormIdsMatch,
  parseHubSpotFormId,
} from "./hubspot.ts";

describe("parseHubSpotFormId", () => {
  it("accepts a canonical form GUID", () => {
    assert.equal(
      parseHubSpotFormId("A1B2C3D4-E5F6-7890-ABCD-EF1234567890"),
      "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    );
  });

  it("accepts a GUID without dashes, matching the embed script", () => {
    assert.equal(
      parseHubSpotFormId("a1b2c3d4e5f67890abcdef1234567890"),
      "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    );
  });

  it("rejects an empty value, the portal id, and a pasted script URL", () => {
    assert.equal(parseHubSpotFormId(""), null);
    assert.equal(parseHubSpotFormId("   "), null);
    assert.equal(parseHubSpotFormId(undefined), null);
    assert.equal(parseHubSpotFormId(HUBSPOT_PORTAL_ID), null);
    assert.equal(parseHubSpotFormId(HUBSPOT_EMBED_SCRIPT_URL), null);
    assert.equal(parseHubSpotFormId("REPLACE_WITH_FORM_GUID"), null);
  });
});

describe("hubSpotFormIdsMatch", () => {
  it("compares GUID text without depending on dashes or case", () => {
    assert.equal(
      hubSpotFormIdsMatch(
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "A1B2C3D4E5F67890ABCDEF1234567890",
      ),
      true,
    );
    assert.equal(
      hubSpotFormIdsMatch("a1b2c3d4-e5f6-7890-abcd-ef1234567890", "b1b2c3d4-e5f6-7890-abcd-ef1234567890"),
      false,
    );
  });
});

describe("verified embed coordinates", () => {
  it("keeps the portal script URL Andrew sent", () => {
    assert.equal(HUBSPOT_REGION, "na2");
    assert.equal(HUBSPOT_PORTAL_ID, "47186401");
    assert.equal(
      HUBSPOT_EMBED_SCRIPT_URL,
      "https://js-na2.hsforms.net/forms/embed/47186401.js",
    );
  });
});
