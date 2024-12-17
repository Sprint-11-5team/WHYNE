import Link from "next/link";
import Button from "../Button";
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
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="영문, 숫자 포함 8자 이상"
        />
        <Button
          type="submit"
          size="large"
          color="primary"
          disabled={true}
          addClassName="text-[1.6rem] font-bold mt-[0.8rem]"
        >
          로그인
        </Button>
        <Button
          type="submit"
          size="large"
          color="white"
          disabled={true}
          addClassName="text-[1.6rem] font-bold mt-[0.8rem]"
        >
          카카오
        </Button>
        <Button
          type="submit"
          size="large"
          color="white"
          disabled={true}
          addClassName="text-[1.6rem] font-bold mt-[0.8rem]"
        >
          구글
        </Button>
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
