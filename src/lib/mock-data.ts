export type School = {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email: string;
  principalUsername: string;
  principalPassword: string;
  status: "Active" | "Inactive";
  createdAt: string;
  studentCount: number;
};

export type Section = { id: string; name: string };
export type SchoolClass = { id: string; name: string; sections: Section[] };

export type FeeRow = { id: string; className: string; year: string; amount: number };

export type Parent = {
  id: string;
  parentName: string;
  fatherName: string;
  motherName: string;
  address: string;
  contact: string;
};

export type DiscountType =
  | "No Discount"
  | "Custom %"
  | "Sibling Discount"
  | "Staff-Management Discount";

export type Student = {
  id: string;
  admissionNo: string;
  fullName: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  className: string;
  section: string;
  admissionDate: string;
  email: string;
  contact: string;
  address: string;
  parentId: string;
  baseFee: number;
  discountType: DiscountType;
  discountPercent: number;
  netFee: number;
  status: "Active" | "Inactive";
};

export type DiscountRules = {
  siblingTwoPercent: number;
  fullWaiverThreeOrMore: boolean;
  staffPercent: number;
  allowCustom: boolean;
};

export const schools: School[] = [
  {
    id: "s1",
    code: "SCH-1042",
    name: "Greenwood Public School",
    address: "12 Nehru Road",
    city: "Pune",
    state: "Maharashtra",
    contact: "+91 98220 11223",
    email: "office@greenwood.edu.in",
    principalUsername: "SCH-1042.principal",
    principalPassword: "Gw!7f2Kq",
    status: "Active",
    createdAt: "2026-01-14",
    studentCount: 842,
  },
  {
    id: "s2",
    code: "SCH-2278",
    name: "St. Xavier's Academy",
    address: "44 Church Street",
    city: "Bengaluru",
    state: "Karnataka",
    contact: "+91 80456 77120",
    email: "admin@stxaviers.edu.in",
    principalUsername: "SCH-2278.principal",
    principalPassword: "Sx#3mR9t",
    status: "Active",
    createdAt: "2026-02-02",
    studentCount: 1136,
  },
  {
    id: "s3",
    code: "SCH-3391",
    name: "Riverdale International",
    address: "8 Lakeview Avenue",
    city: "Hyderabad",
    state: "Telangana",
    contact: "+91 40223 88914",
    email: "contact@riverdale.edu.in",
    principalUsername: "SCH-3391.principal",
    principalPassword: "Rv$5bT1w",
    status: "Active",
    createdAt: "2026-03-19",
    studentCount: 613,
  },
  {
    id: "s4",
    code: "SCH-4507",
    name: "Sunrise Convent School",
    address: "23 MG Road",
    city: "Jaipur",
    state: "Rajasthan",
    contact: "+91 14122 55670",
    email: "info@sunriseconvent.edu.in",
    principalUsername: "SCH-4507.principal",
    principalPassword: "Sn@8dP4y",
    status: "Inactive",
    createdAt: "2026-04-08",
    studentCount: 297,
  },
];

export const classes: SchoolClass[] = [
  { id: "c1", name: "Class 1", sections: [{ id: "c1a", name: "A" }, { id: "c1b", name: "B" }] },
  { id: "c2", name: "Class 2", sections: [{ id: "c2a", name: "A" }, { id: "c2b", name: "B" }] },
  { id: "c3", name: "Class 3", sections: [{ id: "c3a", name: "A" }] },
  {
    id: "c5",
    name: "Class 5",
    sections: [{ id: "c5a", name: "A" }, { id: "c5b", name: "B" }, { id: "c5c", name: "C" }],
  },
  { id: "c8", name: "Class 8", sections: [{ id: "c8a", name: "A" }, { id: "c8b", name: "B" }] },
  { id: "c10", name: "Class 10", sections: [{ id: "c10a", name: "A" }] },
];

export const feeStructure: FeeRow[] = [
  { id: "f1", className: "Class 1", year: "2026-27", amount: 32000 },
  { id: "f2", className: "Class 2", year: "2026-27", amount: 34000 },
  { id: "f3", className: "Class 3", year: "2026-27", amount: 36000 },
  { id: "f4", className: "Class 5", year: "2026-27", amount: 42000 },
  { id: "f5", className: "Class 8", year: "2026-27", amount: 52000 },
  { id: "f6", className: "Class 10", year: "2026-27", amount: 64000 },
  { id: "f7", className: "Class 1", year: "2025-26", amount: 29000 },
  { id: "f8", className: "Class 2", year: "2025-26", amount: 31000 },
  { id: "f9", className: "Class 3", year: "2025-26", amount: 33000 },
  { id: "f10", className: "Class 5", year: "2025-26", amount: 38500 },
  { id: "f11", className: "Class 8", year: "2025-26", amount: 47000 },
  { id: "f12", className: "Class 10", year: "2025-26", amount: 58000 },
];

export const parents: Parent[] = [
  { id: "p1", parentName: "Rakesh Sharma", fatherName: "Rakesh Sharma", motherName: "Anita Sharma", address: "14 Model Colony, Pune", contact: "+91 98111 20034" },
  { id: "p2", parentName: "Imran Qureshi", fatherName: "Imran Qureshi", motherName: "Sana Qureshi", address: "7 Sadar Bazaar, Pune", contact: "+91 98111 55621" },
  { id: "p3", parentName: "Vikram Nair", fatherName: "Vikram Nair", motherName: "Leela Nair", address: "22 Kalyani Nagar, Pune", contact: "+91 98111 78210" },
  { id: "p4", parentName: "Sunita Deshmukh", fatherName: "Prakash Deshmukh", motherName: "Sunita Deshmukh", address: "3 Baner Road, Pune", contact: "+91 98111 90876" },
  { id: "p5", parentName: "Arun Patel", fatherName: "Arun Patel", motherName: "Hetal Patel", address: "56 Aundh, Pune", contact: "+91 98111 33445" },
  { id: "p6", parentName: "Joseph Fernandes", fatherName: "Joseph Fernandes", motherName: "Maria Fernandes", address: "9 Camp Area, Pune", contact: "+91 98111 66009" },
  { id: "p7", parentName: "Neha Kulkarni", fatherName: "Sameer Kulkarni", motherName: "Neha Kulkarni", address: "31 Kothrud, Pune", contact: "+91 98111 12398" },
  { id: "p8", parentName: "Ravi Menon", fatherName: "Ravi Menon", motherName: "Divya Menon", address: "18 Viman Nagar, Pune", contact: "+91 98111 44120" },
];

function mk(
  id: number,
  fullName: string,
  gender: Student["gender"],
  className: string,
  section: string,
  parentId: string,
  baseFee: number,
  discountType: DiscountType,
  discountPercent: number,
  dob: string,
): Student {
  return {
    id: `st${id}`,
    admissionNo: `ADM-2026-${String(id).padStart(3, "0")}`,
    fullName,
    dob,
    gender,
    className,
    section,
    admissionDate: "2026-04-12",
    email: `${(fullName.split(" ")[0] ?? "student").toLowerCase()}${id}@parentmail.com`,
    contact: "+91 98111 00000",
    address: parents.find((p) => p.id === parentId)?.address ?? "",
    parentId,
    baseFee,
    discountType,
    discountPercent,
    netFee: Math.round(baseFee * (1 - discountPercent / 100)),
    status: "Active",
  };
}

export const students: Student[] = [
  mk(1, "Aarav Sharma", "Male", "Class 5", "A", "p1", 42000, "No Discount", 0, "2015-06-11"),
  mk(2, "Diya Sharma", "Female", "Class 2", "B", "p1", 34000, "Sibling Discount", 25, "2018-09-02"),
  mk(3, "Zoya Qureshi", "Female", "Class 8", "A", "p2", 52000, "No Discount", 0, "2012-01-27"),
  mk(4, "Ayaan Qureshi", "Male", "Class 3", "A", "p2", 36000, "Sibling Discount", 25, "2017-03-15"),
  mk(5, "Ishaan Nair", "Male", "Class 10", "A", "p3", 64000, "Staff-Management Discount", 50, "2010-11-05"),
  mk(6, "Meera Nair", "Female", "Class 5", "B", "p3", 42000, "Staff-Management Discount", 50, "2015-02-19"),
  mk(7, "Kabir Nair", "Male", "Class 1", "A", "p3", 32000, "Sibling Discount", 100, "2020-07-30"),
  mk(8, "Riya Deshmukh", "Female", "Class 8", "B", "p4", 52000, "Custom %", 15, "2012-05-21"),
  mk(9, "Om Deshmukh", "Male", "Class 5", "C", "p4", 42000, "Sibling Discount", 25, "2015-12-09"),
  mk(10, "Aditya Patel", "Male", "Class 10", "A", "p5", 64000, "No Discount", 0, "2010-08-14"),
  mk(11, "Anaya Patel", "Female", "Class 3", "A", "p5", 36000, "Sibling Discount", 25, "2017-10-01"),
  mk(12, "Kian Fernandes", "Male", "Class 2", "A", "p6", 34000, "No Discount", 0, "2018-04-23"),
  mk(13, "Alisha Fernandes", "Female", "Class 1", "B", "p6", 32000, "Sibling Discount", 25, "2020-01-16"),
  mk(14, "Sara Kulkarni", "Female", "Class 5", "A", "p7", 42000, "Custom %", 10, "2015-09-28"),
  mk(15, "Arjun Kulkarni", "Male", "Class 8", "A", "p7", 52000, "Sibling Discount", 25, "2012-06-03"),
  mk(16, "Tanvi Kulkarni", "Female", "Class 1", "A", "p7", 32000, "Sibling Discount", 100, "2020-11-22"),
  mk(17, "Nikhil Menon", "Male", "Class 10", "A", "p8", 64000, "No Discount", 0, "2010-03-07"),
  mk(18, "Kavya Menon", "Female", "Class 2", "B", "p8", 34000, "Sibling Discount", 25, "2018-12-12"),
  mk(19, "Rohan Menon", "Male", "Class 5", "B", "p8", 42000, "Sibling Discount", 25, "2015-05-18"),
  mk(20, "Naina Sharma", "Female", "Class 3", "A", "p1", 36000, "Sibling Discount", 25, "2017-07-25"),
];

export const defaultDiscountRules: DiscountRules = {
  siblingTwoPercent: 25,
  fullWaiverThreeOrMore: true,
  staffPercent: 50,
  allowCustom: true,
};

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
