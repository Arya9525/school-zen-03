import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  classes as seedClasses,
  defaultDiscountRules,
  feeStructure as seedFees,
  parents as seedParents,
  schools as seedSchools,
  students as seedStudents,
  type DiscountRules,
  type FeeRow,
  type Parent,
  type School,
  type SchoolClass,
  type Student,
} from "./mock-data";

type Auth = { super: boolean; principal: { schoolCode: string; userId: string } | null };

type Ctx = {
  auth: Auth;
  loginSuper: () => void;
  loginPrincipal: (schoolCode: string, userId: string) => void;
  logout: () => void;
  schools: School[];
  addSchool: (s: School) => void;
  updateSchool: (id: string, patch: Partial<School>) => void;
  classes: SchoolClass[];
  addClass: (name: string) => void;
  addSection: (classId: string, name: string) => void;
  students: Student[];
  addStudent: (s: Student) => void;
  parents: Parent[];
  addParent: (p: Parent) => void;
  fees: FeeRow[];
  setFees: (rows: FeeRow[]) => void;
  rules: DiscountRules;
  setRules: (r: DiscountRules) => void;
};

const PortalContext = createContext<Ctx | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>({ super: false, principal: null });
  const [schools, setSchools] = useState<School[]>(seedSchools);
  const [classes, setClasses] = useState<SchoolClass[]>(seedClasses);
  const [students, setStudents] = useState<Student[]>(seedStudents);
  const [parents, setParents] = useState<Parent[]>(seedParents);
  const [fees, setFees] = useState<FeeRow[]>(seedFees);
  const [rules, setRules] = useState<DiscountRules>(defaultDiscountRules);

  const addClass = useCallback((name: string) => {
    setClasses((c) => [...c, { id: `c${Date.now()}`, name, sections: [] }]);
  }, []);

  const addSection = useCallback((classId: string, name: string) => {
    setClasses((cs) =>
      cs.map((c) =>
        c.id === classId
          ? { ...c, sections: [...c.sections, { id: `${classId}-${name}-${Date.now()}`, name }] }
          : c,
      ),
    );
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      auth,
      loginSuper: () => setAuth({ super: true, principal: null }),
      loginPrincipal: (schoolCode, userId) => setAuth({ super: false, principal: { schoolCode, userId } }),
      logout: () => setAuth({ super: false, principal: null }),
      schools,
      addSchool: (s) => setSchools((v) => [s, ...v]),
      updateSchool: (id, patch) => setSchools((v) => v.map((s) => (s.id === id ? { ...s, ...patch } : s))),
      classes,
      addClass,
      addSection,
      students,
      addStudent: (s) => setStudents((v) => [s, ...v]),
      parents,
      addParent: (p) => setParents((v) => [p, ...v]),
      fees,
      setFees,
      rules,
      setRules,
    }),
    [auth, schools, classes, students, parents, fees, rules, addClass, addSection],
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside PortalProvider");
  return ctx;
}
