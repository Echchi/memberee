"use client";

import ScrollProvider, {
  useScrollContext,
} from "../components/common/pagination/scrollProvider";

import Landing from "../components/page/landing/landing";
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
