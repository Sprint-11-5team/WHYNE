interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputItem({ label, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
}
