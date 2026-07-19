interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  if (!message) return null;

  return (
    <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-600">
      {message}
    </div>
  );
}
