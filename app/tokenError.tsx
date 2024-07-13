"use client";
import React, { useState } from "react";
import Web from "../component/tabs/web";
import TopBar from "../component/tabs/mobile/topBar";
import PageTransition from "../component/pageTransition";
import TabBar from "../component/tabs/mobile/tabBar";
import { useRouter } from "next/navigation";
import Modal from "../component/modal/modal";
import Join from "./login/join";
import FindId from "./login/findId";
import Button from "../component/button/button";

const TokenError = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isFindIdOpen, setIsFindIdOpen] = useState(false);
  return (
    <>
      {isFindIdOpen && (
        <Modal
          onClose={() => setIsFindIdOpen(false)}
          title={"아이디 찾기"}
          content={<FindId onClose={() => setIsFindIdOpen(false)} />}
        />
      )}
      {isJoinOpen && (
        <Modal
          onClose={() => setIsJoinOpen(false)}
          title={"이메일 인증"}
          content={
            <Join
              onClose={() => setIsJoinOpen(false)}
              findId={() => setIsFindIdOpen(true)}
            />
          }
        />
      )}
      <div className="flex flex-col xl:w-full xl:max-w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-white from-[1%] to-stone-100">
        <TopBar canGoBack={true} />
        <PageTransition>
          <div className="xl:pt-28 xl:max-w-full xl:w-[1400px] xl:mx-auto px-3 xl:px-5 text-stone-800 min-h-fit mb-20 pt-16">
            <div className="flex flex-col justify-center items-center h-[500px] xl:h-[700px] my-auto space-y-2 xl:space-y-4">
              {/*<p className="text-7xl xl:text-9xl text-green-700 font-extrabold">*/}
              {/*  앗!*/}
              {/*</p>*/}
              <p className="text-xl xl:text-4xl text-green-700 font-bold">
                인증이 완료되었거나 유효시간이 만료되었어요
              </p>
              <p className="text-sm xl:text-lg font-bold">
                멤버리 서비스를 이용하시려면,
              </p>
              <p className="text-sm xl:text-lg font-bold">
                아래 버튼을 눌러 이메일을 다시 인증해 주세요
              </p>

              <div className="flex xl:flex-row flex-col justify-center items-center w-2/3 xl:w-1/3 pt-2 xl:pt-4">
                <Button
                  onClick={() => setIsJoinOpen(true)}
                  type="button"
                  text={"인증 메일 요청하기"}
                  large={true}
                />
              </div>
            </div>
          </div>
        </PageTransition>

        <TabBar />
      </div>
    </>
  );
};

export default TokenError;
