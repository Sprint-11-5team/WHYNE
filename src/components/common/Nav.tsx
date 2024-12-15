import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/icons/white_medium_logo.svg";

export default function Nav() {
  return (
    <header className="nav-container flex-between tablet:py-[1.1rem] mobile:py-[1.5rem] tablet:px-[6rem] mobile:px-[2rem] tablet:h-[7rem] mobile:h-[5rem] ">
      <nav className="w-full flex-between">
        <Link href="/">
          <Image width={52} height={15} src={logo} alt="와인 로고" />
        </Link>
        <div className="flex-between tablet:gap-[4rem] mobile:gap-[2rem]">
          <Link
            href="/login"
            className="text-white font-medium tablet:text-[1.6rem]/[1.9rem] mobile:text-[1.4rem]/[1.6rem]"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="text-white font-medium tablet:text-[1.6rem]/[1.9rem] mobile:text-[1.4rem]/[1.6rem]"
          >
            회원가입
          </Link>
        </div>
      </nav>
    </header>
  );
}
