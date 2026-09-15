#!/usr/bin/env node
/**
 * Downloads brand, team, production, dashboard, and video assets used by the
 * site. Sources: the Unicorn Studios Concept #5 gallery and InterMedia’s public
 * About page (Kris Johnson and Tim Wright portraits).
 *
 * Usage: node scripts/fetch-assets.mjs
 */
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const GALLERY = "https://intermedia-client-gallery.vercel.app/design-5/assets";

const teamFromGallery = [
  "Bob Yallen",
  "Kevin Szymanski",
  "Lindsay Shultz",
  "Dan Schlafman",
  "David Nyurenberg",
  "Joe Gonzales",
  "Guy Sabatano",
  "Jackie Rivera",
  "Stephanie Murphy",
  "Grace Gillespie",
  "Jennifer Khadavi",
  "Lorraine Galano",
  "Melanie McLean",
  "Angela Yadegar",
  "Joseph Poulose",
  "Jason Ninness",
  "Hunington Sachs",
];

const files = [
  [`${GALLERY}/intermedia-original.png`, "public/brand/intermedia-original.png"],
  [`${GALLERY}/intermedia-white.png`, "public/brand/intermedia-white.png"],
  [`${GALLERY}/intermedia-office.png`, "public/brand/intermedia-office.png"],
  [`${GALLERY}/reel-poster-hd.jpg`, "public/video/reel-poster.jpg"],
  [`${GALLERY}/studio-preview-1080.mp4`, "public/video/studio-preview.mp4"],
  [`${GALLERY}/dashboard-overview.png`, "public/dashboards/dashboard-overview.png"],
  [`${GALLERY}/dashboard-lift.png`, "public/dashboards/dashboard-lift.png"],
  [`${GALLERY}/dashboard-ctv.png`, "public/dashboards/dashboard-ctv.png"],
  [`${GALLERY}/dashboard-test.png`, "public/dashboards/dashboard-test.png"],
  [`${GALLERY}/dashboard-analysis.png`, "public/dashboards/dashboard-analysis.png"],
  [
    "https://cdn.prod.website-files.com/6840f57d89da5c14ce75fc6d/68c3cfafd239e33254282973_image28-removebg-preview.png",
    "public/team/kris-johnson.png",
  ],
  [
    "https://cdn.prod.website-files.com/6840f57d89da5c14ce75fc6d/68c3ec0c7c4ddd0d1328d28d_image13.png",
    "public/team/tim-wright.png",
  ],
  [`${GALLERY}/${encodeURIComponent("Rico Pena.png")}`, "public/team/rico-pena.png"],
];

for (const slug of [
  "bts-field-setup-960",
  "bts-production-notes-960",
  "bts-night-shoot-960",
  "bts-playback-review-960",
  "bts-filming-stands-960",
  "bts-camera-movement-960",
  "bts-talent-camera-960",
  "bts-crew-framing-960",
  "bts-location-work-960",
  "bts-between-takes-960",
  "bts-field-direction-960",
]) {
  files.push([`${GALLERY}/${slug}.webp`, `public/bts/${slug}.webp`]);
}

for (const name of teamFromGallery) {
  const slug = name.toLowerCase().replace(/ /g, "-");
  files.push([`${GALLERY}/${encodeURIComponent(`${name}.png`)}`, `public/team/${slug}.png`]);
}

async function download(url, dest) {
  const target = join(root, dest);
  await mkdir(dirname(target), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(target, buffer);
  console.log(`saved ${dest} (${buffer.length} bytes)`);
}

for (const [url, dest] of files) {
  await download(url, dest);
}

await copyFile(join(root, "public/brand/intermedia-original.png"), join(root, "public/favicon.png"));
console.log("saved public/favicon.png");
console.log(`fetched ${files.length} assets`);
