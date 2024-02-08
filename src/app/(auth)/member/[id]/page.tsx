import React from "react";
import Input from "@/component/input";

const Page = () => {
  return (
    <div className="box mt-3">
      <div className="flex flex-col w-full">
        <Input
          type={"div"}
          label={"이름"}
          value={"회원"}
          className="h-16 border-t rounded-t-lg border-b lg:text-lg"
        />
        <Input
          type={"div"}
          label={"연락처"}
          value={"회원"}
          className="h-16 border-t-0 border-b lg:text-lg"
        />
        <Input
          type={"div"}
          label={"담당"}
          value={"함코치"}
          className="h-16 border-t-0 border-b lg:text-lg"
        />
        <Input
          type={"div"}
          label={"등록일"}
          value={"2024. 01. 01."}
          className="h-16 border-t-0 border-b lg:text-lg"
        />
        <Input
          type={"div"}
          label={"납부"}
          value={"회원"}
          className="h-16 border-t-0 border-b lg:text-lg"
        />
      </div>
    </div>
  );
};

export default Page;
