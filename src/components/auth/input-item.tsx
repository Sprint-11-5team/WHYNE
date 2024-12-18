import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  validationRule?: RegExp;
  errorMessage?: string;
}

export default function InputItem({
  label,
  id,
  validationRule,
  errorMessage = "입력값이 유효하지 않습니다.",
  ...props
}: InputProps) {
  const [error, setError] = useState(false);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validationRule) {
      setError(!validationRule.test(value));
    }
  };

  return (
    <div className="gap-[1rem] flex flex-col">
      <label htmlFor={id} className="text-[1.6rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`placeholder-gray-500 text-[1.6rem] border border-gray-300 rounded-[1.6rem] w-[40rem] h-[4.8rem] pl-[2rem]"
        ${error ? "bordere-red" : "border-gray-300"}`}
        onChange={handleValidation}
        {...props}
      />
      {error && <p>{errorMessage}</p>}
    </div>
  );
}
