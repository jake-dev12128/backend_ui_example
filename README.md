# ACC Computer College Dashboard - Full Mock Data + RBAC Prototype

Frontend-only production-style prototype for the ACC Computer College management system.

## Stack

- Vite
- React
- JavaScript (no TypeScript)
- Chakra UI v3
- React Icons

## Included

### Example data

The mock database contains example records for:

- Students
- Teachers
- Courses
- Classes
- Attendance
- Exams
- Results
- Payments
- Invoices
- Announcements
- Staff
- Registrations
- Academic Reports
- News
- Course Content
- Media
- Documents
- Course Materials
- Security Logs
- Settings

### Roles

- Super Admin
- Academic Admin
- Staff
- Content Admin
- Teacher

### Permission matrix

The prototype includes explicit module/action permissions for:

- view
- create
- update
- delete
- export
- approve

The `Roles & Permissions` screen lets you switch between roles and toggle permissions. The selected permission matrix controls the CRUD page UI. This is frontend-only and is NOT a security boundary.

## CRUD

CRUD pages support:

- Search
- Create
- Read/list
- Update
- Delete
- Permission-aware Add/Edit/Delete controls

Data is stored in React state for now. Refreshing the browser resets it to the example data.

## Important production rule

Frontend permissions are only for UX. In the real system, every protected API endpoint must enforce authorization again on the Express backend.

Recommended flow:

React UI
  -> API wrapper
  -> Express route
  -> authentication middleware
  -> authorization / RBAC middleware
  -> controller
  -> service
  -> MongoDB

For your existing project, Clerk can authenticate the user, MongoDB can store the application user/role data, and Redis can continue handling OTP/session/temp workflow data.

## Run

```bash
npm install
npm run dev
```

Then open the Vite development URL.

## Next integration step

Replace the local `initialData` state with your existing API wrapper. For example:

- `GET /api/v1/students`
- `POST /api/v1/students`
- `PATCH /api/v1/students/:id`
- `DELETE /api/v1/students/:id`

Then move permission definitions from frontend mock data to the backend database/API and enforce them on Express routes.
