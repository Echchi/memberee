import React from "react";
import { useRouter } from "next/navigation";
import { cls } from "@/libs/client/utils";
import Tag from "@/component/tag";
import LineBox from "@/component/lineBox";
import Input from "@/component/input";
import IcFinder from "../../../../public/icons/ic_finder.svg";
import Image from "next/image";
import { add, addMonths, format } from "date-fns";
import Button from "@/component/button/button";
import Modal from "@/component/modal";
import Register from "./register/page";
import Search from "@/component/search";
import Members from "@/component/page/member/members";
import { setEngine } from "crypto";
import RegisterBtn from "@/component/page/member/registerBtn";

const Page = ({ searchParams }: { searchParams?: { query?: string } }) => {
  const today = new Date();
  const query = searchParams?.query || "";
  // const [desc, setDesc] = useState(true);
  // const [selectedTag, setSelectedTag] = useState(["미납", "납부완료"]);
  // const [month, setMonth] = useState(today);
  // const [registerModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <>
      <div className="my-3 flex justify-between items-center lg:space-x-0 space-x-4">
        <Search placeholder={"이름,   연락처"} />
        <div className="flex space-x-3 w-1/4">
          <RegisterBtn />

          <Button text={"명단 출력"} className="py-3 hidden lg:block" />
        </div>
      </div>
      <Members query={query} />
    </>
  );
};

export default Page;
