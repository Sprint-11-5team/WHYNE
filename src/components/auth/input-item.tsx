"use client"; // useState 훅 사용 위해 클라이언트 컴포넌트로 명시(멘토님이 말씀주신 서버 클라이언트 제약사항?)

import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  minLengthRule?: number;
  validationRule?: string;
  errorMessage?: string;
}

export default function InputItem({
  label,
  id,
  minLengthRule,
  validationRule,
  errorMessage = "입력값이 유효하지 않습니다.",
  ...props
}: InputProps) {
  const [error, setError] = useState(false);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (minLengthRule && value.length < minLengthRule) {
      setError(true);
    }

    if (validationRule) {
      // validationRule?: RegExp; 로 하면 const regex 안 해도 되지만, 서버 컴포넌트에서 클라이언트 컴포넌트로 해당 객체는 전달 불가
      const regex = new RegExp(validationRule);
      if (!regex.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    }
  };

  return (
    <div className="gap-[1rem] flex flex-col">
      <label htmlFor={id} className="text-[1.6rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`placeholder-gray-500 text-[1.6rem] border border-gray-300 rounded-[1.6rem] w-[40rem] h-[4.8rem] pl-[2rem]
        ${error ? "border-red" : "border-gray-300"}`}
        onChange={handleValidation}
        {...props}
      />
      {error && <span className="text-red">{errorMessage}</span>}
    </div>
  );
}
