import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { usePortal } from "@/lib/store";

export const Route = createFileRoute("/super/login")({
  head: () => ({
    meta: [
      { title: "Super Admin Login — FeeDesk" },
      { name: "description", content: "Sign in to the FeeDesk super admin console to manage schools." },
      { property: "og:title", content: "Super Admin Login — FeeDesk" },
      { property: "og:description", content: "Sign in to manage schools and principal accounts." },
    ],
  }),
  component: SuperLogin,
});

function SuperLogin() {
  const { loginSuper } = usePortal();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@feedesk.io");
  const [password, setPassword] = useState("demo1234");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginSuper();
          navigate({ to: "/super" });
        }}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-7 shadow-sm"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Super Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage all schools on the platform.</p>

        <label className="mt-6 block text-sm font-medium text-foreground">Email or Username</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <label className="mt-4 block text-sm font-medium text-foreground">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <button className="mt-6 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Sign in
        </button>
        <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground">
          Back to portal selection
        </Link>
      </form>
    </div>
  );
}
