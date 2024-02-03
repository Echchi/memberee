import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Link href={"/login"} className="text-9xl">
      랜딩
    </Link>
  );
}
