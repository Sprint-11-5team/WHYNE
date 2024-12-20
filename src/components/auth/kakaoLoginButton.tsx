"use client";

import Image from "next/image";
import Button from "../../components/common/Button";

const KakaoLoginButton = () => {
  // .env.local에서 환경 변수를 가져옵니다.
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 클라이언트 앱키
  const redirectUri = "http://localhost:3000"; // 리다이렉트 URI (카카오에 등록한 URI)

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = kakaoLoginUrl; // 카카오 로그인 페이지로 리다이렉트
  };

  return (
    <Button
      type="button"
      onClick={handleKakaoLogin}
      size="large"
      color="white"
      addClassName="text-[1.6rem] font-bold mt-[0.8rem] flex items-center justify-center"
    >
      <Image
        src="/icons/kakao.svg"
        alt="카카오 로고"
        width={24}
        height={24}
        className="mr-2"
      />
      kakao로 시작하기
    </Button>
  );
};

export default KakaoLoginButton;
