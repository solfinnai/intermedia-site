# HubSpot contact form

The contact page at `/contact` is the only inquiry form. Other pages link here.

## Situation

Verified from the site code before this change: the form collected six fields, showed a review screen, and opened a `mailto:sales@im.agency` draft. It did not call HubSpot. There was no CAPTCHA and no server route.

Verified from Andrew Blanco’s email on Wed 24 Sep 2026 (`ablanco@im.agency`): the only artifact was

`https://js-na2.hsforms.net/forms/embed/47186401.js`

Checked against that live script on 28 Sep 2026:

- Portal id `47186401`
- Region `na2` (host `js-na2.hsforms.net`)
- New forms editor (`HubSpotFormsV4`), not the legacy `hbspt.forms.create` snippet
- The page must render `<div class="hs-form-frame" data-region="na2" data-form-id="..." data-portal-id="47186401">`
- If `data-region` is omitted, the script defaults to `na1` and will not load an na2 form
- `data-form-id` must be a form GUID. Andrew did not send one
- After a real submit, the script emits `hs-form-event:on-submission:success` or `hs-form-event:on-submission:failed` with `detail.formId`

Proposed inbox in Henry’s 22 Sep 2026 brief: `sales@im.agency`. That address is also the address already published on the site. Inbox delivery is not verified.

## What the site does now

When `NEXT_PUBLIC_HUBSPOT_FORM_ID` is a real GUID, `/contact` loads Andrew’s embed script and shows HubSpot’s form inside the existing white card. The thank-you card replaces the form only after `hs-form-event:on-submission:success`. A failed submit leaves the HubSpot form in place and asks the visitor to correct it and try again. If the script never paints an iframe, the page offers a reload and the `sales@im.agency` mailto.

When the variable is missing or not a GUID, `/contact` stays on the email-draft preview. That preview now includes the seventh field, “How did you hear about InterMedia?”, and labels a blank answer as `(not provided)`. The preview still does not create a HubSpot record.

The form GUID is public embed configuration, not an API token. Do not invent one. Do not put a private-app token in this repo.

## Why embed, not the Forms API

Andrew’s URL is the new-editor embed script. The unauthenticated Forms API would still need the same missing GUID, plus the exact internal property names and dropdown values, which nobody has sent. HubSpot CAPTCHA also blocks Forms API submissions. The embed keeps CAPTCHA, validation, and the stored field list inside HubSpot, and it can show a thank-you only after HubSpot accepts the post.

Tradeoff: the new editor draws the fields in an iframe. This repo styles the card around that iframe (width, border reset). Button color, type, and field labels are set in the HubSpot form editor. Raw HTML styling needs Marketing Hub or Content Hub Professional or Enterprise. That plan is not confirmed.

## What Andrew or IT still must send

1. The form GUID (`data-form-id`) from the form’s embed snippet. The portal script URL is not enough.
2. Confirmation that portal `47186401` / region `na2` is the InterMedia account that should receive site inquiries.
3. A published form on that portal with these seven fields:
   - First name
   - Last name
   - Company
   - Work email (HubSpot’s default Email field, or notifications can be suppressed)
   - Area of interest
   - Message
   - How they heard about InterMedia
4. Allowed values if interest or referral is a dropdown. Current site interest options, if they want parity: New to TV, Expanding into CTV, Converged TV, Measurement, Creative, Partnerships, Help choosing an approach. Referral options are not defined in the site. A blank referral must remain possible, and the notification must show that it was blank.
5. The domains allowed to embed the form. The public InterMedia site linked from this repo is `https://www.im.agency`. The host that will actually serve this Next.js app is not recorded here. Add production, preview, and any test host before the smoke test.
6. The notification route to `sales@im.agency`, or an approved workflow or forward, plus a person who can confirm the received email. HubSpot’s standard notification goes to users or teams with notifications on. A shared inbox is not guaranteed by the form embed alone.
7. Consent text, cookie behavior, and record retention. The embed is HubSpot-hosted and can set HubSpot cookies once the form id is turned on. Do not turn on marketing-subscription enrollment unless someone explicitly approves it.
8. Form style in HubSpot so it sits in the card: no duplicate page title, submit button `#002d72`, light background.

Internal HubSpot property names are not in this repo. The embed does not need them. They would be required only if someone later switches to the Forms API.

## Turn the embed on

1. Put the GUID in the environment as `NEXT_PUBLIC_HUBSPOT_FORM_ID`. See `.env.example`.
2. Rebuild and redeploy. Next.js reads this variable at build time.
3. Run the checklist below on the host that was added to HubSpot’s domain list. A local `npm run dev` smoke test only counts if that machine’s origin is allowed, or if the form has no domain restriction.

## Acceptance checklist for 100%

Do this on a real allowed domain after the GUID is set. The thank-you on the page proves HubSpot accepted the submit. It does not prove `sales@im.agency` received anything. Check the inbox separately.

- [ ] Submit a new contact from the contact page. HubSpot shows a new submission and a contact or update for that email.
- [ ] The HubSpot record contains all seven fields. Repeat with the referral field left blank and confirm the notification shows it was blank, not omitted.
- [ ] `sales@im.agency` (or the approved route) receives the notification, including the visitor’s email, so sales can reply. Check the spam folder.
- [ ] The on-page thank-you appears only after HubSpot accepts. It does not appear on click, on validation errors, or when the network fails.
- [ ] A failed submit keeps the entries and can be retried without retyping.
- [ ] Repeat on a phone-width viewport: every field is usable, the submit control is visible, and the thank-you replaces the form.
- [ ] Spam check: if HubSpot CAPTCHA or filtering is on, a normal visitor can still submit, and an obvious junk submit is blocked or flagged. Confirm cookie-declined behavior, because HubSpot notification rules can depend on the Email field and tracking cookies.
- [ ] Submit once as a brand-new email and once as an email already in the portal. Confirm both land in the inbox.
- [ ] Double-clicking submit does not create two inquiries beyond what HubSpot itself records.
- [ ] No private app token was added to the site, the repo, or the client bundle.
