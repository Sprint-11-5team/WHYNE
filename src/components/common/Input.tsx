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
  px-5 
  rounded-xl 
  text-md-14px-regular 
  text-gray-800 
  focus:border-[#330066]
  focus:outline-none
  placeholder:text-gray-500 
  md:h-12 
  md:rounded-2xl 
  md:text-lg-16px-regular 
  ${isErrored ? "border-[#f74747]" : "border-[1px] border-gray-300"}  // border 속성을 하나로 합침
  ${className ? ` ${className}` : ""}
  `;
  
    return <input className={classCombined} {...props} />;
  }