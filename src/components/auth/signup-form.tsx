import Link from "next/link";
import Button from "../common/Button";
import InputItem from "./input-item";

export default function SignUpForm() {
  return (
    <div className="flex flex-col gap-[4rem]">
      <form className="gap-[2.4rem] flex flex-col">
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder="whyne@email.com"
        />
        <InputItem
          label="닉네임"
          id="nickname"
          type="text"
          placeholder="whyne"
        />
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
        <Button
          type="submit"
          size="large"
          color="primary"
          disabled={true}
          addClassName="text-[1.6rem] font-bold mt-[0.8rem]"
        >
          가입하기
        </Button>
      </form>
      <p className="flex gap-[1rem] text-gray-500 text-[1.6rem] mx-auto">
        계정이 이미 있으신가요?
        <Link href="/signin" aria-label="로그인으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            로그인하기
          </span>
        </Link>
      </p>
    </div>
  );
}
