interface Props {
  title: string;
  count: number;
}

export default function StatCard({ title, count }: Props) {
  return (
    <div className="rounded-lg border p-6 text-center shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-3 text-3xl font-bold">{count}</p>
    </div>
  );
}
