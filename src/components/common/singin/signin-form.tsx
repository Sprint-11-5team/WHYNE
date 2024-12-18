import Link from "next/link";
import Button from "../Button";
import InputItem from "./input-item";
import Image from "next/image";
import KakaoLoginButton from "./kakaoLoginButton";

export default function SignUpForm() {
  return (
    <div className="flex flex-col gap-[4rem]">
      <form className="gap-[2.4rem] flex flex-col">
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일 입력"
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="비밀번호 입력"
        />
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            비밀번호를 잊으셨나요?
          </span>
        </Link>
        <Button
          type="submit"
          size="large"
          color="primary"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem]"
        >
          로그인
        </Button>
        <Button
          type="submit"
          size="large"
          color="white"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] flex items-center justify-center"
        >
          <Image
            src="/icons/google.svg"
            alt="kakao 로고"
            width={24}
            height={24}
            className="mr-2"
          />
          Goggle로 시작하기
        </Button>

        <KakaoLoginButton />
      </form>
      <p className="flex gap-[1rem] text-gray-500 text-[1.6rem] mx-auto">
        계정이 없으신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            회원가입 하기
          </span>
        </Link>
      </p>
    </div>
  );
}
