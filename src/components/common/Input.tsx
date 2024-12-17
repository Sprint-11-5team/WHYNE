import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isErrored?: boolean;
}

export default function Input({
    className,
    isErrored = false,
    ...props
  }: Props) {
    const classCombined = `
  w-full
  h-[2.625rem] 
  px-[2rem]
  rounded-[1.1rem]
  text-[1.2rem] font-regular
  text-gray-800 
  focus:border-primary
  focus:outline-none
  placeholder:text-gray-500 
  tablet:h-[4.8rem]
  tablet:rounded-[1.6rem] 
  tablet:text-[1.4rem]
  desktop:text-[1.6rem]
  ${isErrored ? "border-red" : "border-[1px] border-gray-300"}  // border 속성을 하나로 합침
  ${className ? ` ${className}` : ""}
  `;
  
    return <input className={classCombined} {...props} />;
  }