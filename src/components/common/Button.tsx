import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...rest }: ButtonProp) {
  return (
    <>
      <button {...rest}>
        <div>{children}</div>
      </button>
    </>
  );
}

export default Button;
