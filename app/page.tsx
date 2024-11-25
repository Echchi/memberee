"use client";

import ScrollProvider, {
  useScrollContext,
} from "../component/page/landing/scrollProvider";

import Landing from "../component/page/landing/landing";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);
  return null;

  // return (
  //   <ScrollProvider>
  //     <Landing />
  //   </ScrollProvider>
  // );
}
