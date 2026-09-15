import { AboutPage } from "@/components/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About InterMedia",
  description: "Independent media expertise since 1974. Meet the InterMedia team, history, and performance TV FAQ.",
};

export default function Page() {
  return <AboutPage />;
}
