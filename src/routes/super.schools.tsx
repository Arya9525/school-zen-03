import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, Plus, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { superNav, genPassword, genSchoolCode } from "@/lib/nav";
import { usePortal } from "@/lib/store";
import type { School } from "@/lib/mock-data";

export const Route = createFileRoute("/super/schools")({
  head: () => ({
    meta: [
      { title: "Schools — FeeDesk Super Admin" },
      { name: "description", content: "Create schools and issue principal login credentials." },
      { property: "og:title", content: "Schools — FeeDesk Super Admin" },
      { property: "og:description", content: "Directory of tenant schools with status and principal accounts." },
    ],
  }),
  component: SchoolsPage,
});

const field =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function SchoolsPage() {
  const { schools, addSchool, updateSchool } = usePortal();
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState<School | null>(null);

  return (
    <AppShell
      brand="Super Admin"
      title="Schools"
      subtitle={`${schools.length} tenants on the platform`}
      nav={superNav}
      actions={
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Create School
        </button>
      }
    >
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">School Code</th>
              <th className="px-4 py-3">School Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Principal Username</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {schools.map((s) => (
              <tr key={s.id} className="hover:bg-muted/40">
                <td className="px-4 py-3 font-mono text-xs text-foreground">{s.code}</td>
                <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.city}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{s.principalUsername}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      s.status === "Active"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.createdAt}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setViewing(s)}
                    className="rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-accent"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      updateSchool(s.id, { status: s.status === "Active" ? "Inactive" : "Active" })
                    }
                    className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
                  >
                    {s.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open ? <CreateSchoolModal onClose={() => setOpen(false)} onCreate={addSchool} /> : null}
      {viewing ? <ViewSchool school={viewing} onClose={() => setViewing(null)} /> : null}
    </AppShell>
  );
}

function ViewSchool({ school, onClose }: { school: School; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/30 p-0">
      <div className="h-full w-full max-w-md overflow-y-auto bg-card p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{school.name}</h2>
            <p className="text-sm text-muted-foreground">{school.code}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <dl className="mt-6 space-y-3 text-sm">
          {[
            ["Address", school.address],
            ["City", school.city],
            ["State", school.state],
            ["Contact", school.contact],
            ["Email", school.email],
            ["Principal Username", school.principalUsername],
            ["Principal Password", school.principalPassword],
            ["Students", String(school.studentCount)],
            ["Status", school.status],
            ["Created", school.createdAt],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-border pb-2">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-medium text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function CreateSchoolModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (s: School) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
  });
  const [code, setCode] = useState(genSchoolCode());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(genPassword());
  const effectiveUsername = username || `${code.toLowerCase()}.principal`;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/30 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate({
            id: `s${Date.now()}`,
            code,
            name: form.name,
            address: form.address,
            city: form.city,
            state: form.state,
            contact: form.contact,
            email: form.email,
            principalUsername: effectiveUsername,
            principalPassword: password,
            status: "Active",
            createdAt: new Date().toISOString().slice(0, 10),
            studentCount: 0,
          });
          onClose();
        }}
        className="my-8 w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-lg"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Create School</h2>
            <p className="text-sm text-muted-foreground">Onboard a new tenant and issue principal access.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-foreground">School Name</label>
            <input required value={form.name} onChange={set("name")} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Address</label>
            <input value={form.address} onChange={set("address")} className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">City</label>
            <input value={form.city} onChange={set("city")} className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">State</label>
            <input value={form.state} onChange={set("state")} className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Contact Number</label>
            <input value={form.contact} onChange={set("contact")} className={field} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input type="email" value={form.email} onChange={set("email")} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-foreground">School Code</label>
            <div className="flex gap-2">
              <input value={code} onChange={(e) => setCode(e.target.value)} className={field} />
              <button
                type="button"
                onClick={() => setCode(genSchoolCode())}
                className="mt-1.5 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-input px-3 text-xs text-muted-foreground hover:bg-muted"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Regenerate
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Auto-generated, editable.</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-border bg-secondary/60 p-4">
          <h3 className="text-sm font-semibold text-foreground">Principal First Login</h3>
          <p className="text-xs text-muted-foreground">Share these credentials with the principal.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Username</label>
              <input
                value={effectiveUsername}
                onChange={(e) => setUsername(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="flex gap-2">
                <input value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} font-mono`} />
                <button
                  type="button"
                  onClick={() => setPassword(genPassword())}
                  className="mt-1.5 inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-input px-3 text-xs text-muted-foreground hover:bg-muted"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-input px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            Cancel
          </button>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Create School &amp; Generate Principal Login
          </button>
        </div>
      </form>
    </div>
  );
}
