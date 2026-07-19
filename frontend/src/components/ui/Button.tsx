import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  children,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}
