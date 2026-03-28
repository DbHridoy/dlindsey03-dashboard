export function StatCard({ label, value, trend }) {
  return (
    <article className="rounded-3xl border border-cyan-100/60 bg-white/85 p-6 shadow-[0_18px_50px_rgba(17,75,82,0.14)] backdrop-blur">
      <p className="m-0 text-sm text-slate-500">{label}</p>
      <strong className="my-2 block text-4xl font-semibold tracking-tight text-slate-900">
        {value}
      </strong>
      <span className="text-sm font-medium text-teal-700">{trend}</span>
    </article>
  );
}
