import { HomePage } from "@/components/home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Performance TV Agency",
  description:
    "Strategic media buying and measurement across linear TV and streaming. We connect the media plan to your business goals.",
};

export default function Page() {
  return <HomePage />;
}
