import type { NavItem } from "@/components/AppShell";

export const superNav: NavItem[] = [
  { label: "Dashboard", to: "/super" },
  { label: "Schools", to: "/super/schools" },
  { label: "Settings", to: "/super/settings" },
];

export const principalNav: NavItem[] = [
  { label: "Dashboard", to: "/principal" },
  { label: "Classes & Sections", to: "/principal/classes" },
  { label: "Students", to: "/principal/students" },
  { label: "Admission", to: "/principal/admission" },
  { label: "Fee Structure", to: "/principal/fees" },
  { label: "Discount Rules", to: "/principal/discounts" },
  { label: "Settings", to: "/principal/settings" },
];

export function genSchoolCode() {
  return `SCH-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function genPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
