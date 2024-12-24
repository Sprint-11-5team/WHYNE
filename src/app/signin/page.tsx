"use client";

import { useEffect, useState } from "react";
import SignUpForm from "@/components/auth/signin-form";
import Container from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";
import { signInWithKakao } from "../../api/api"; // 카카오 로그인 관련 API 호출 함수

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // URL 파라미터에서 카카오 인증 코드 추출
    const params = new URLSearchParams(window.location.search);
    const kakaoCode = params.get("code");

    if (kakaoCode) {
      // 카카오 로그인 후 인가 코드가 존재하면 토큰 요청
      setIsLoading(true);
      signInWithKakao({
        redirectUri: "http://localhost:3000/signin",
        token: kakaoCode,
      })
        .then((response) => {
          // 토큰을 받아서 로컬 스토리지에 저장
          localStorage.setItem("accessToken", response.data.token);
          window.location.href = "/"; // 로그인 후 홈으로 리디렉션
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response", error.response.data);
            console.error("Error status:", error.response.status);
          } else {
            console.error("카카오 로그인 오류", error);
            alert("카카오 로그인에 실패했습니다.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container
        color="white"
        addClassName="max-w-[49.6rem] max-h-[77.2rem] px-[4.8rem] py-[8rem] w-full h-auto aspect-[496/772] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-[6.4rem]">
          <Link href="/" aria-label="홈으로 이동">
            <Image
              src="/icons/black_large_logo.svg"
              alt="WHYNE 로고"
              width={104}
              height={0}
              className="block mx-auto"
            />
          </Link>

          {/* 로딩 중일 때 텍스트 표시 */}
          {isLoading ? (
            <div className="text-center text-gray-500">로그인 중...</div>
          ) : (
            <SignUpForm />
          )}
        </div>
      </Container>
    </div>
  );
}
