interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputItem({ label, id, ...props }: InputProps) {
  return (
    <div className="gap-[1rem] flex flex-col">
      <label htmlFor={id} className="text-[1.6rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        className="placeholder-gray-500 text-[1.6rem] border border-gray-300 rounded-[1.6rem] w-[40rem] h-[4.8rem] pl-[2rem]"
        {...props}
      />
    </div>
  );
}
