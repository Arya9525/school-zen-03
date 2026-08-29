# SchoolFlow Portal

Build a multi-tenant School Fee Management Portal prototype (frontend + mock data, no real backend needed yet). Use React with Tailwind CSS, clean and professional UI (soft blues/whites, card-based layouts, sidebar navigation).

There are two user roles for this prototype: SUPER ADMIN and PRINCIPAL (School Admin). No parent or student login needed in this version.

=== 1. SUPER ADMIN MODULE ===

Login Page:

- Simple email/username + password login for Super Admin

Super Admin Dashboard:

- Sidebar with: Dashboard, Schools, Settings

- Dashboard shows summary cards: Total Schools, Total Students (across all schools), Active Schools

- "Schools" section: a table listing all created schools with columns — School Code, School Name, City, Principal Username, Status (Active/Inactive), Created Date, and an "Edit"/"View" action

Create School Form (modal or separate page):

- Fields: School Name, Address, City, State, Contact Number, Email

- Auto-generate a unique School Code (e.g. format "SCH-XXXX") but allow manual override

- Section to set up the Principal's first login: auto-generate Username (e.g. based on school code) and Password (with a "regenerate" button), both shown clearly so Super Admin can note them down

- Submit button: "Create School & Generate Principal Login"

=== 2. PRINCIPAL MODULE ===

Login Page:

- Three fields: School Code, User ID, Password

Principal Dashboard:

- Sidebar with: Dashboard, Classes & Sections, Students, Fee Structure, Discount Rules, Settings

- Dashboard shows summary cards: Total Students, Total Classes, Total Fee Collected (mock number), Pending Fees (mock number)

- A simple bar chart showing student count per class (use mock data)

Classes & Sections Page:

- Simple interface to add a Class (e.g. "Class 5") and add Sections under it (e.g. "A", "B", "C")

- Table view showing all classes with their sections and student count per section

Student Admission Page (this is the most important screen — make it detailed):

- A multi-step or single scrollable form with these sections:

  1. Student Info: Full Name, Date of Birth, Gender, Class, Section, Admission Date

  2. Contact Info: Email, Contact Number, Address

  3. Parent/Guardian Info: Parent Name, Father's Name, Mother's Name, a "Search Existing Parent" button that opens a search box (search by Parent Name / Father's Name / Address) — searching shows a result list of matching parent records with their existing children's names and classes, with a "Link to this Parent" button on each result, OR a "This is a new parent" option to create a fresh parent record

  4. Fee Info: Base Fee Amount (auto-filled based on selected Class from a fee structure table, but editable), Discount Type dropdown (No Discount / Custom % / Sibling Discount / Staff-Management Discount), if Sibling Discount is selected show the list of already-linked siblings and auto-calculate which one gets the discount, a final "Net Payable Fee" field that recalculates live

Students List Page:

- Table with filters for Class and Section

- Columns: Admission No, Student Name, Class-Section, Parent Name, Net Fee, Status

- Click a row to view full student profile in a side panel

Fee Structure Page:

- Table to set Fee Amount per Class per Academic Year (e.g. Class 5 - 2026-27 - ₹XXXX)

- "Add New Academic Year" button to set updated fee rates while keeping old year's data visible in history

Discount Rules Page:

- Configuration panel where Principal can set:

  - Sibling discount percentage for 2 children

  - Toggle: "Full fee waiver for lowest-fee child when 3+ siblings"

  - Staff/Management discount percentage

  - A general "Custom Discount" toggle to allow manual % entry per student

Use realistic mock data (at least 3-4 schools, 5-6 classes with sections, and 15-20 sample students with varied fee/discount scenarios) so the prototype feels real when navigating.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://school-zen-03.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ec231cf5-60ad-47a4-aec9-93f6e74391ef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
