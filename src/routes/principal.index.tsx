import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, StatCard } from "@/components/AppShell";
import { principalNav } from "@/lib/nav";
import { usePortal } from "@/lib/store";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/principal/")({
  head: () => ({
    meta: [
      { title: "Principal Dashboard — FeeDesk" },
      { name: "description", content: "School-level view of students, classes, collections and pending fees." },
      { property: "og:title", content: "Principal Dashboard — FeeDesk" },
      { property: "og:description", content: "Track enrolment and fee collection for your school." },
    ],
  }),
  component: PrincipalDashboard,
});

function PrincipalDashboard() {
  const { students, classes, auth } = usePortal();
  const totalNet = students.reduce((a, s) => a + s.netFee, 0);
  const collected = Math.round(totalNet * 0.68);
  const pending = totalNet - collected;

  const chartData = classes.map((c) => ({
    name: c.name.replace("Class ", "C"),
    students: students.filter((s) => s.className === c.name).length,
  }));

  return (
    <AppShell
      brand={auth.principal?.schoolCode ?? "Principal"}
      title="Dashboard"
      subtitle="Academic year 2026-27"
      nav={principalNav}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={String(students.length)} />
        <StatCard label="Total Classes" value={String(classes.length)} hint={`${classes.reduce((a, c) => a + c.sections.length, 0)} sections`} />
        <StatCard label="Total Fee Collected" value={inr(collected)} hint="68% of net billed" />
        <StatCard label="Pending Fees" value={inr(pending)} hint="Outstanding this term" />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">Students per class</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="students" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}
