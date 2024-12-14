import InputItem from "@/components/auth/input-item";
import Image from "next/image";
import React from "react";

export default function SignUp() {
  return (
    <>
      <Image
        src="/icons/black_large_logo.svg"
        alt="WHYNE 로고"
        width={104}
        height={0}
      />
      <form>
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder="whyne@email.com"
        />
        <InputItem label="닉네임" id="nickname" type="" placeholder="whyne" />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="영문, 숫자 포함 8자 이상"
        />
        <InputItem
          label="비밀번호 확인"
          id="pw-check"
          type="password"
          placeholder="비밀번호 확인"
        />
      </form>
    </>
  );
}
