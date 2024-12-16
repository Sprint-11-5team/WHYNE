import SignUpForm from "@/components/auth/signup-form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <div>
      <Link href="/" aria-label="홈으로 이동">
        <Image
          src="/icons/black_large_logo.svg"
          alt="WHYNE 로고"
          width={104}
          height={0}
        />
      </Link>
      <SignUpForm />
      {/* 진희님 공통 버튼 완성되면 넣어야지~ */}
      <button>가입하기</button>
      <p>
        계정이 이미 있으신가요?
        <Link href="/signin" aria-label="로그인으로 이동">
          <span>로그인하기</span>
        </Link>
      </p>
    </div>
  );
}
