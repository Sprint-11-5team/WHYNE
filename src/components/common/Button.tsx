import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  addClassName?: string | string[];
  handleClick?: () => void;
  disabled?: boolean;
  size: "small" | "medium" | "large";
  color: "primary" | "white";
  type: "button" | "submit" | "reset";
}

function Button({
  children,
  addClassName,
  handleClick,
  disabled = false,
  type = "button",
  size = "large",
  color = "primary",
  ...rest
}: ButtonProp) {
  const sizeClasses = {
    large: "w-auto h-[5rem] rounded-[1.6rem] ",
    medium: "w-auto h-[4.8rem] rounded-[1.6rem] ",
    small: "w-auto h-[4.2rem] rounded-[1.2rem]",
  };

  const colorClasses = {
    primary: "bg-primary hover:bg-[#7b52f1] text-white",
    white: "bg-white hover:bg-[#e1d7f4] text-gray-800",
  };

  const buttonClass = classNames(
    "rounded transition-all duration-300 ease-in-out cursor-pointer",
    sizeClasses[size],
    colorClasses[color],
    Array.isArray(addClassName) ? addClassName.join(" ") : addClassName,
    {
      "opacity-50 cursor-not-allowed": disabled,
    },
  );

  return (
    <>
      <button
        type={type}
        className={buttonClass}
        onClick={handleClick}
        disabled={disabled}
        {...rest}
      >
        <div>{children}</div>
      </button>
    </>
  );
}

export default Button;
