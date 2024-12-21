import {
  forwardRef,
  TextareaHTMLAttributes,
  ReactNode,
  MouseEvent,
} from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  errorMessage?: string;
  onClick?: (e: MouseEvent<HTMLTextAreaElement>) => void;
  children?: ReactNode;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, errorMessage, onClick, children, ...props }, ref) => {
    return (
      <div className="inline-flex w-full shrink-0 flex-col items-start gap-[0.3rem] px-[1.2rem]">
        {label && (
          <label
            htmlFor={props.id}
            className="font-sans text-lg font-medium text-gray-800"
          >
            {label}
          </label>
        )}
        <textarea
          onClick={onClick}
          className={`flex w-full flex-shrink-0 resize-none 
          items-center rounded-[1.6rem] 
          ${
            errorMessage
              ? "border-[0.2rem] border-primary"
              : "border-[0.1rem] border-gray-300"
          } 
          bg-white px-[0.5rem] py-[0.88rem] text-gray-800 
          focus:border-[0.2rem] focus:border-primary-100 focus:outline-none
          h-[12rem] min-h-[12rem] max-h-[12rem]`}
          ref={ref}
          rows={4}
          {...props}
        >
          {children}
        </textarea>
        {errorMessage && (
          <p className="ml-[0.5rem] font-sans text-lg font-regular text-purple-100">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;
