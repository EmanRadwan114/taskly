# Taskly — Project Management Platform

Taskly is a full-stack project management web application built with **Next.js 16 (App Router)** and **React 19**. It helps teams organize their work through structured **projects**, **epics**, and **tasks**, with multiple views (Kanban board and list), real-time statistics, and team collaboration features.

---

## Features

### 1. Project Management

- Create and edit projects with name and description.
- Browse all projects with debounced search and responsive pagination (desktop page-based, mobile infinite scroll).

### 2. Epics

- Organize work into high-level epics scoped to a specific project.
- View epic details and all tasks linked to an epic via a modal route.
- Desktop pagination + mobile infinite scroll using TanStack Query `useInfiniteQuery`.

### 3. Task Management

- **List View**: Tabular task list with desktop pagination and mobile infinite scroll.
- **Board View**: Interactive Kanban board with drag-and-drop powered by `@dnd-kit/react` across status columns (`TODO`, `IN_PROGRESS`, `BLOCKED`, `IN_REVIEW`, `READY_FOR_QA`, `REOPENED`, `DONE`).
- **Task Details**: Deep-linkable modal with full task metadata — status, assignees, due date, and epic association.
- **Optimistic Updates**: Drag-and-drop and status transitions apply instantly via TanStack Query optimistic cache mutations.
- Add new tasks per project directly from the list or board.

### 4. Statistics

- Per-project task stats with visual charts (Chart.js / `react-chartjs-2`).
- Personal statistics dashboard (`/my-statistics`) for tracking productivity.
- Calendar view for displaying upcoming & previous weekly tasks.

### 5. Members

- Invite new members via a shared invite link (`/invite`).

### 6. Authentication

- Sign-in and sign-up flows (`/login`, `/sign-up`).
- Forgot password and reset password pages with server-side action handling.

---

## 🛠️ Technology Stack

| Category                       | Technology                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------- |
| **Framework**                  | [Next.js 16 (App Router)](https://nextjs.org/)                                   |
| **UI Library & Language**      | [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)  |
| **Data Fetching & Cache**      | [TanStack React Query v5](https://tanstack.com/query/latest)                     |
| **State Management**           | [Redux Toolkit](https://redux-toolkit.js.org/), React-Redux                      |
| **Styling**                    | [Tailwind CSS v4](https://tailwindcss.com/), `@svgr/webpack` (SVG as components) |
| **Form Handling & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)         |
| **Drag and Drop**              | [`@dnd-kit/react`](https://dndkit.com/)                                          |
| **Data Visualization**         | [Chart.js](https://www.chartjs.org/), `react-chartjs-2`, `react-day-picker`      |
| **Notifications**              | `react-toastify`                                                                 |
| **Select & Date Utilities**    | `react-select`, `date-fns`                                                       |

---

## Directory Structure

```text
src/
├── app/                            # Next.js App Router
│   ├── (auth)/                     # Auth route group
│   │   ├── login/                  # Sign-in page
│   │   └── sign-up/                # Registration page
│   ├── (password-change)/          # Password flow route group
│   │   ├── forgot-password/        # Request password reset
│   │   └── reset-password/         # Set new password
│   ├── (dashboard)/                # Protected dashboard route group
│   │   ├── my-statistics/          # Personal stats & calendar
│   │   └── project/
│   │       ├── page.tsx            # All projects listing
│   │       ├── add/                # Create new project form
│   │       └── [projectId]/        # Project workspace
│   │           ├── tasks/          # Task list & board views
│   │           ├── epics/          # Epic listing & creation
│   │           ├── members/        # Project team members
│   │           └── edit/           # Edit project details
│   ├── invite/                     # Public invite landing page
│   └── api/                        # Next.js API proxy routes
│       ├── fetch-projects/
│       ├── fetch-epics-with-pagination/
│       ├── fetch-all-epics/
│       ├── fetch-epic-by-id/
│       ├── fetch-epic-tasks/
│       ├── fetch-project-tasks/
│       ├── fetch-project-tasks-by-status/
│       ├── fetch-task-by-id/
│       ├── fetch-members/
│       ├── fetch-tasks-stats-per-project/
│       ├── fetch-tasks-calendar-stats/
│       └── fetch-user-data/
│
├── features/                       # Feature-sliced domain modules
│   ├── auth/                       # Auth forms, server actions & hooks
│   ├── epics/                      # Epic list, detail modal, creation form
│   ├── members/                    # Member list & invite modal
│   ├── projects/                   # Project cards, form & hooks
│   ├── statistics/                 # Charts, calendar & stats components
│   └── tasks/                      # Board, list view, task details, dnd
│       ├── components/
│       │   ├── board-view/         # Kanban board & column components
│       │   ├── list-view/          # Task table & mobile card components
│       │   ├── task-details/       # Task detail modal
│       │   └── add-task/           # Add task form
│       ├── hooks/                  # Task-specific React Query hooks
│       ├── services/               # API fetch functions
│       └── types/                  # Task TypeScript types
│
└── shared/                         # Cross-feature shared code
    ├── components/
    │   ├── ui/                     # Button, Table, Pagination, Search, Modal…
    │   ├── Navbar.tsx
    │   ├── Sidebar.tsx
    │   └── MainLayoutMobile.tsx
    ├── hooks/                      # useHandlePagination, useInfiniteScroll, useMobile…
    ├── libs/                       # Redux store & TanStack Query client setup
    ├── types/                      # Shared TypeScript interfaces
    ├── utils/                      # Helper functions & constants
    └── validation/                 # Shared Zod schemas
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **pnpm**: v8.x or higher — install via `npm install -g pnpm`

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd taskly
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:

   ```env
   BASE_URL=supabase url
   API_KEY=supabase secret key
   APP_URL=frontend url
   ```

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script       | Description                                       |
| ------------ | ------------------------------------------------- |
| `pnpm dev`   | Start the development server with hot-reloading   |
| `pnpm build` | Compile and build the production application      |
| `pnpm start` | Start the production server (after `build`)       |
| `pnpm lint`  | Run Prettier formatting and Next.js ESLint checks |

---
