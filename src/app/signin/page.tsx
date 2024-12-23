import SignUpForm from "@/components/auth/signin-form";
import Container from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Signin() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Container
        color="white"
        addClassName="
          /* 기존 스타일 유지 */
          max-w-[49.6rem] max-h-[77.2rem] px-[4.8rem] py-[8rem] w-full h-auto aspect-[496/772] 
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          
          /* 미디어 쿼리 사용하여 반응형 스타일 적용 */
          @media (max-width: 1024px) { /* M 화면 크기 */
            max-width: 49.6rem; /* 496px */
            max-height: 74rem; /* 740px */
            padding: 6.4rem 4.8rem; /* 64px 48px */
            top: 19.65rem; /* 196.5px */
            left: 12.4rem; /* 124px */
            gap: 1rem; /* 10px */
            border-radius: 1.6rem 0 0 0; /* 16px 0 0 0 */
            border: 0.1rem solid transparent; /* 1px */
            opacity: 0;
          }

          @media (max-width: 640px) { /* S 화면 크기 */
            max-width: 34.3rem; /* 343px */
            max-height: 64.8rem; /* 648px */
            padding: 5.6rem 2rem; /* 56px 20px */
            top: 8.25rem; /* 82.5px */
            left: 1.6rem; /* 16px */
            gap: 1rem; /* 10px */
            border-radius: 1.2rem 0 0 0; /* 12px 0 0 0 */
            border: 0.1rem solid transparent; /* 1px */
            opacity: 0;
          }
        "
      >
        <div className="flex flex-col gap-[6.4rem]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/black_large_logo.svg"
              alt="WHYNE 로고"
              width={104} /* 104px */
              height={104} /* 104px */
              className="block mx-auto"
            />
          </Link>
          <SignUpForm />
        </div>
      </Container>
    </div>
  );
}
