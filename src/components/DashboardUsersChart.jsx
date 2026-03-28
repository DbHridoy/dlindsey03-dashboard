import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartDataByYear = {
  2024: [
    { label: "Jan", value: 680 },
    { label: "Feb", value: 380 },
    { label: "Mar", value: 780 },
    { label: "Apr", value: 560 },
    { label: "May", value: 450 },
    { label: "Jun", value: 850 },
    { label: "Jul", value: 550 },
    { label: "Aug", value: 610 },
    { label: "Sep", value: 830 },
    { label: "Oct", value: 730 },
    { label: "Nov", value: 560 },
    { label: "Dec", value: 780 },
  ],
  2025: [
    { label: "Jan", value: 520 },
    { label: "Feb", value: 460 },
    { label: "Mar", value: 640 },
    { label: "Apr", value: 590 },
    { label: "May", value: 720 },
    { label: "Jun", value: 760 },
    { label: "Jul", value: 700 },
    { label: "Aug", value: 820 },
    { label: "Sep", value: 870 },
    { label: "Oct", value: 790 },
    { label: "Nov", value: 740 },
    { label: "Dec", value: 910 },
  ],
};

export function DashboardUsersChart({ selectedYear, onYearChange }) {
  const chartData = chartDataByYear[selectedYear];
  const activeIndex = chartData.reduce(
    (bestIndex, item, index, items) =>
      item.value > items[bestIndex].value ? index : bestIndex,
    0,
  );

  return (
    <article className="rounded-[6px] bg-linear-to-r from-[#24438d] to-[#0f564f] p-5 text-white shadow-[0_8px_18px_rgba(8,35,35,0.16)]">
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-[1.75rem] font-medium">User Ratio</h2>
          <div className="mt-2 flex items-center gap-2 text-[#19d4c8]">
            <span className="h-3 w-3 rounded-full bg-[#19d4c8]" />
            <span className="text-[0.9rem]">Users</span>
          </div>
        </div>
        <label className="w-fit">
          <span className="sr-only">Filter user ratio by year</span>
          <select
            value={selectedYear}
            onChange={(event) => onYearChange(event.target.value)}
            className="rounded-[4px] bg-[#22d3c8] px-3.5 py-2 text-[0.84rem] font-medium text-white outline-none"
          >
            {Object.keys(chartDataByYear).map((year) => (
              <option key={year} value={year} className="text-slate-900">
                Year-{year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
                data={chartData}
                margin={{ top: 14, right: 8, left: -18, bottom: 4 }}
                barCategoryGap="20%"
              >
            <CartesianGrid
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="4 6"
              vertical={false}
            />
            <XAxis
                  dataKey="label"
                  tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
            <YAxis
              domain={[0, 1000]}
              ticks={[0, 250, 500, 750, 1000]}
                  tick={{ fill: "rgba(255,255,255,0.72)", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={34}
                />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                background: "#18d4c8",
                border: "none",
                borderRadius: "6px",
                color: "#20548f",
                fontWeight: 700,
                fontSize: "12px",
              }}
              labelStyle={{ color: "#20548f", fontWeight: 700 }}
            />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={26}>
                  <LabelList
                    dataKey="value"
                    position="top"
                    offset={8}
                    formatter={(value, _name, entryIndex) =>
                      entryIndex === activeIndex ? value : ""
                    }
                    style={{ fill: "#18d4c8", fontSize: 11, fontWeight: 700 }}
                  />
              {chartData.map((item, index) => (
                <Cell
                  key={`${selectedYear}-${item.label}`}
                  fill={index === activeIndex ? "#18d4c8" : "#d7e7ff"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
