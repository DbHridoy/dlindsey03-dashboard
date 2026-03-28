export function DashboardStatsSection() {
  return (
    <div className="grid rounded-[6px] bg-linear-to-r from-[#24438d] to-[#0f564f] px-5 py-4 text-white shadow-[0_8px_18px_rgba(8,35,35,0.16)] md:grid-cols-2">
      <div className="border-white/70 py-1.5 md:border-r md:pr-8">
        <p className="text-center text-[2.1rem] font-semibold leading-none">38.6K</p>
        <p className="mt-2 text-center text-[0.9rem] font-semibold">Total User</p>
      </div>
      <div className="py-1.5 md:pl-8">
        <p className="text-center text-[2.1rem] font-semibold leading-none">$4.9k</p>
        <p className="mt-2 text-center text-[0.9rem] font-semibold">Total Revenue</p>
      </div>
    </div>
  );
}
