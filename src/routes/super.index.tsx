import { createFileRoute } from "@tanstack/react-router";
import { AppShell, StatCard } from "@/components/AppShell";
import { superNav } from "@/lib/nav";
import { usePortal } from "@/lib/store";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/super/")({
  head: () => ({
    meta: [
      { title: "Super Admin Dashboard — FeeDesk" },
      { name: "description", content: "Platform overview of schools, students and activation status." },
      { property: "og:title", content: "Super Admin Dashboard — FeeDesk" },
      { property: "og:description", content: "Platform-wide school and student metrics." },
    ],
  }),
  component: SuperDashboard,
});

function SuperDashboard() {
  const { schools } = usePortal();
  const totalStudents = schools.reduce((a, s) => a + s.studentCount, 0);
  const active = schools.filter((s) => s.status === "Active").length;

  return (
    <AppShell brand="Super Admin" title="Dashboard" subtitle="Platform overview" nav={superNav}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Schools" value={String(schools.length)} />
        <StatCard label="Total Students" value={totalStudents.toLocaleString("en-IN")} hint="Across all tenants" />
        <StatCard label="Active Schools" value={String(active)} hint={`${schools.length - active} inactive`} />
        <StatCard label="Platform Fee Volume" value={inr(totalStudents * 41000)} hint="Mock estimate" />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">Recently onboarded schools</h2>
        <ul className="mt-4 divide-y divide-border">
          {schools.slice(0, 5).map((s) => (
            <li key={s.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  {s.code} · {s.city}, {s.state}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs ${
                  s.status === "Active"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
