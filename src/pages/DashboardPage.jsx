import { useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardStatsSection } from "../components/DashboardStatsSection";
import { DashboardUsersChart } from "../components/DashboardUsersChart";
import { DashboardUserList } from "../components/DashboardUserList";

export function DashboardPage() {
  usePageTitle("Dashboard");
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <section className="grid w-full gap-4">
      <DashboardStatsSection />
      <DashboardUsersChart
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
      <DashboardUserList />
    </section>
  );
}
