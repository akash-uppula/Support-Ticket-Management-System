import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <input
        {...props}
        className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
