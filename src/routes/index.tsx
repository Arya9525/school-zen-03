import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, School } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FeeDesk — School Fee Management Portal" },
      {
        name: "description",
        content:
          "Multi-tenant school fee management portal for super admins and principals: schools, classes, admissions, fee structures and discount rules.",
      },
      { property: "og:title", content: "FeeDesk — School Fee Management Portal" },
      {
        property: "og:description",
        content: "Manage schools, admissions, fee structures and sibling discounts in one portal.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="mb-10 flex flex-col items-center text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="h-6 w-6" />
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">FeeDesk</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Multi-tenant school fee management. Choose your portal to continue.
        </p>
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        <Link
          to="/super/login"
          className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h2 className="mt-4 text-base font-semibold text-foreground">Super Admin</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Onboard schools and generate principal logins.
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-primary">Sign in →</span>
        </Link>

        <Link
          to="/principal/login"
          className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <School className="h-6 w-6 text-primary" />
          <h2 className="mt-4 text-base font-semibold text-foreground">Principal</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage classes, admissions, fees and discounts.
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-primary">Sign in →</span>
        </Link>
      </div>
    </div>
  );
}
