import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { School } from "lucide-react";
import { usePortal } from "@/lib/store";

export const Route = createFileRoute("/principal/login")({
  head: () => ({
    meta: [
      { title: "Principal Login — FeeDesk" },
      { name: "description", content: "Principals sign in with school code, user ID and password." },
      { property: "og:title", content: "Principal Login — FeeDesk" },
      { property: "og:description", content: "Access your school's fee and admission workspace." },
    ],
  }),
  component: PrincipalLogin,
});

function PrincipalLogin() {
  const { loginPrincipal, schools } = usePortal();
  const navigate = useNavigate();
  const [code, setCode] = useState("SCH-1042");
  const [userId, setUserId] = useState("SCH-1042.principal");
  const [password, setPassword] = useState("Gw!7f2Kq");
  const [error, setError] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const school = schools.find((s) => s.code.toLowerCase() === code.trim().toLowerCase());
          if (!school) {
            setError("Unknown school code. Try SCH-1042.");
            return;
          }
          loginPrincipal(school.code, userId);
          navigate({ to: "/principal" });
        }}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-7 shadow-sm"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <School className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-foreground">Principal Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Use the credentials issued by the super admin.</p>

        <label className="mt-6 block text-sm font-medium text-foreground">School Code</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <label className="mt-4 block text-sm font-medium text-foreground">User ID</label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <label className="mt-4 block text-sm font-medium text-foreground">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        {error ? <p className="mt-3 text-xs text-destructive">{error}</p> : null}

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
