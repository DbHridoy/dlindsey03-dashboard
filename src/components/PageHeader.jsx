export function PageHeader({ title, description }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-end">
      <div>
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-teal-700/80">
          Overview
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
      <p className="m-0 text-slate-600">{description}</p>
    </div>
  );
}
