"use client";

import ScrollProvider, {
  useScrollContext,
} from "@/component/page/landing/scrollProvider";

import Landing from "@/component/page/landing/landing";

export default function Home() {
  return (
    <ScrollProvider>
      <Landing />
    </ScrollProvider>
  );
}
