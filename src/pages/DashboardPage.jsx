import { useEffect, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardStatsSection } from "../components/DashboardStatsSection";
import { DashboardUsersChart } from "../components/DashboardUsersChart";
import { DashboardUserList } from "../components/DashboardUserList";
import { apiRequest } from "../lib/api";

export function DashboardPage() {
  usePageTitle("Dashboard");
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear()),
  );
  const [stats, setStats] = useState({
    totalUsers: 0,
    blockedUsers: 0,
  });
  const [chartState, setChartState] = useState({
    isLoading: true,
    data: [],
    error: "",
  });
  const [recentUsersState, setRecentUsersState] = useState({
    isLoading: true,
    data: [],
    error: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const [allUsersPayload, blockedUsersPayload] = await Promise.all([
          apiRequest("/user", {
            query: {
              limit: 0,
            },
          }),
          apiRequest("/user", {
            query: {
              isBlocked: true,
              limit: 0,
            },
          }),
        ]);

        if (!isMounted) {
          return;
        }

        setStats({
          totalUsers: allUsersPayload.total || allUsersPayload.data.length || 0,
          blockedUsers:
            blockedUsersPayload.total || blockedUsersPayload.data.length || 0,
        });
        setRecentUsersState({
          isLoading: false,
          data: (allUsersPayload.data || []).slice(0, 5),
          error: "",
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setRecentUsersState({
          isLoading: false,
          data: [],
          error: error.message || "Unable to load users",
        });
      }
    }

    void loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadMetrics() {
      setChartState((currentState) => ({
        ...currentState,
        isLoading: true,
        error: "",
      }));

      try {
        const payload = await apiRequest("/user", {
          query: {
            metrics: true,
            period: "year",
            year: selectedYear,
          },
        });

        if (!isMounted) {
          return;
        }

        setChartState({
          isLoading: false,
          data: payload.data.chart || [],
          error: "",
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setChartState({
          isLoading: false,
          data: [],
          error: error.message || "Unable to load chart",
        });
      }
    }

    void loadMetrics();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  return (
    <section className="grid w-full gap-4">
      <DashboardStatsSection stats={stats} />
      <DashboardUsersChart
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        chartData={chartState.data}
        isLoading={chartState.isLoading}
        error={chartState.error}
      />
      <DashboardUserList
        users={recentUsersState.data}
        isLoading={recentUsersState.isLoading}
        error={recentUsersState.error}
      />
    </section>
  );
}
