import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev is bound to 0.0.0.0 and documented at 127.0.0.1. Next blocks that
  // host's dev resources unless it is listed, which skips client hydration
  // and lets the contact form fall through to a normal browser submit.
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
