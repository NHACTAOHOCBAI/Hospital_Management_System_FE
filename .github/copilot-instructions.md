# Hospital Management System - Frontend AI Instructions

## Architecture Overview

Next.js 16 App Router application with TypeScript, using **pnpm** as package manager. Built for hospital operations with role-based dashboards (Admin, Doctor, Receptionist). Currently uses **mock data** in services - backend integration pending.

## Critical Workflows

```bash
pnpm install          # Install dependencies (uses pnpm@10.22.0)
pnpm dev              # Dev server at localhost:3000 (webpack mode)
pnpm run lint         # ESLint check
pnpm run build        # Production build
```

CI workflow (`.github/workflows/ci.yml`) checks lockfile sync, linting, and builds.

## Project Structure

- `src/app/(admin)/` - Admin routes with shared layout (sidebar + breadcrumbs)
- `src/app/auth/` - Login/register pages
- `src/components/` - Organized by feature: `ui/` (shadcn), `admin/`, `auth/`, `crud_table/`, `table/`
- `src/services/` - API service layer with **mock data** (e.g., `user.service.ts`)
- `src/hooks/queries/` - React Query hooks wrapping services
- `src/hooks/` - Form hooks using react-hook-form + zod validation
- `src/constants/icons.enum.tsx` - Centralized Lucide icon exports as JSX

## Documentation & UI Standards

### Always Use Context7 for Latest Documentation

When working with external libraries or frameworks, **always use Context7** to fetch up-to-date documentation instead of relying on potentially outdated knowledge. This ensures accuracy with the latest API changes, best practices, and patterns.

Example: Before implementing a new library feature, query Context7 for the most recent documentation.

### ShadCN UI Components

**All common UI components must use ShadCN UI** from `src/components/ui/`. Never create custom implementations of standard components (buttons, inputs, dialogs, etc.).

Available components: `Button`, `Input`, `Card`, `Sheet`, `Sidebar`, `Alert`, `Dialog`, `Dropdown`, `Select`, `Checkbox`, `Tooltip`, and more in `src/components/ui/`.

**If a needed component doesn't exist**, add it using:

```bash
npx shadcn@latest add [component-name]
```

This automatically installs the component to `src/components/ui/` with proper theming. Always prefer adding official ShadCN components over custom implementations.

### ShadCN UI Theme Customization

When styling ShadCN UI components, **always reference the project's color palette** defined in:

- `design/color-pallette.json` - Source of truth for all colors
- `src/app/globals.css` - CSS variables mapped to Tailwind tokens

**Never override ShadCN component styles with hardcoded colors.** Instead:

1. Use semantic tokens: `bg-primary`, `text-foreground`, `border-border`
2. Use palette tokens: `bg-primary-blue-500`, `text-feedback-error`
3. Modify CSS variables in `globals.css` for theme-wide changes

Example of correct theming:

```tsx
// ✅ Correct - uses design system tokens
<Button className="bg-primary-blue-600 hover:bg-primary-blue-700">
// ❌ Wrong - hardcoded color
<Button className="bg-[#2563eb] hover:bg-[#1565c0]">
```

## Key Patterns

### 1. Route Groups & Layouts

Use Next.js route groups: `(admin)` has shared layout with `AppSidebar`, breadcrumbs, and theme toggle. Breadcrumb text resolves from `PAGENAMES` enum based on pathname segments.

### 2. Table/CRUD Pattern

- **`CrudTable`** component (`src/components/crud_table/crud-table.tsx`) orchestrates:
  - `useTable` hook manages pagination, sorting, filtering, column visibility
  - `useQuery` hook for data fetching (React Query)
  - `useDelete` mutation for bulk delete with toast notifications
  - Selection state via TanStack Table
- **Column definitions** live alongside page (e.g., `user-columns.tsx`) with checkbox selection, sortable headers via `DataTableColumnHeader`, and action dropdowns
- **Pagination** controlled by `pageIndex`/`pageSize`; resets to page 0 on filter change

Example:

```tsx
<CrudTable
  columns={userColumns()}
  useQuery={useUserQuery}
  useDelete={useDeleteUsers}
  filterPlaceholder="Search users..."
/>
```

### 3. Form Validation

Forms use `react-hook-form` + `zod` schemas. Hook pattern:

```tsx
export const loginSchema = z.object({ email: z.string().email(), ... });
export function useLoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });
  return { form };
}
```

### 4. API Layer (Mock Data)

Services export async functions returning mock data with 300ms delay. Example:

```tsx
// src/services/user.service.ts
export const getUsers = async (params: QueryParams) => {
  // Filter, sort, paginate mockUsers array
  await new Promise(r => setTimeout(r, 300));
  return { pagination: {...}, data: [...] };
};
```

**Note:** Replace mock logic when backend is ready; Axios instance configured in `src/configs/axios-config.ts` with token interceptors.

### 5. State Management

- **React Query** via `Providers` wrapper (`src/app/providers.tsx`) with devtools
- **Context API** for global state (e.g., `UserContext.tsx`)
- No Redux/Zustand currently used

### 6. Design System (shadcn/ui + Tailwind)

- **Color tokens:** CSS variables in `globals.css` mapped to Tailwind (`@theme inline`). Use semantic tokens: `bg-primary`, `text-muted-foreground`, `bg-feedback-warning/15`
- **Components:** Always use shadcn variants (`Button` with `default|destructive|outline|secondary|ghost|link`)
- **Icons:** Import from `ICONS` enum (e.g., `ICONS.USER`) - centralized Lucide icons
- **Spacing/Radius:** Tailwind utilities (`p-6`, `rounded-xl`); `--radius` CSS var for consistency
- **Never hardcode colors** - reference `docs/design_guidelines.md` and `design/color-pallette.json`

## Common Tasks

**Add new page:** Create folder in `src/app/(admin)/[module]/`, add `page.tsx`. Update `PAGENAMES` enum and `AppSidebar` nav items.

**New API service:** Add function in `src/services/`, create React Query hook in `src/hooks/queries/`. Follow mock data pattern until backend available.

**New table:** Define columns with `ColumnDef<T>[]`, use `CrudTable` with query/mutation hooks. Enable sorting via `DataTableColumnHeader`, row selection via `Checkbox` column.

**Add icon:** Export from `src/constants/icons.enum.tsx` using Lucide React: `export const ICONS = { NEW_ICON: <IconName /> };`

## Dependencies

- Next.js 16, React 19, TypeScript 5
- TanStack Query/Table for data fetching and tables
- Zod + react-hook-form for validation
- Radix UI (via shadcn/ui) for accessible components
- Axios (configured but using mocks)
- Tailwind CSS 4 with postcss

## Design References

- `docs/design_guidelines.md` - Color palette, typography, component usage
- `docs/UI Specifications.md` - Detailed Vietnamese UI specs by role
