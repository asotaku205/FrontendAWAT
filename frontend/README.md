# FrontendAWAT

React, TypeScript, and Vite frontend for AWAT Logistics.

## Run locally

Copy `.env.example` to `.env.local`, then start the frontend:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

Vite reads environment variables at startup/build time; restart the dev server
after changing `.env.local`.

## Mock API and backend API

The app uses the same HTTP API in both modes. MSW is enabled only when
`VITE_USE_MOCKS=true`, in both development and production. Set it to `false`
or leave it unset to disable MSW. When mocks are disabled, requests go to the
real backend; `VITE_API_BASE_URL` is prepended to each endpoint.

```dotenv
VITE_USE_MOCKS=true
VITE_API_BASE_URL=/api
```

For a real backend, use for example:

```dotenv
VITE_USE_MOCKS=false
VITE_API_BASE_URL=https://backend.example.com/api
```

The backend should expose these GET endpoints and return JSON with the indicated
shapes:

| Endpoint | Response |
| --- | --- |
| `/address-parse/options` | `{ city: string[], district: string[], region: string[], reliability: { label: string, value: string }[] }` |
| `/address-parse/pending` | `PendingAddressDataType[]` |
| `/address-parse/parsed` | `AddressParseDataType[]` |
| `/blacklist/monitor` | `MonitorCustomer[]` |
| `/delivery-date/orders` | `DeliveryOrder[]` |
| `/telesale/records` | `TelesaleRecord[]` |
| `/business-forecast/products` | `ForecastProduct[]` |
| `/order-distribution/options` | `{ locations: string[], statuses: string[], employeeStatuses: string[], employees: string[], batches: string[] }` |
| `/order-distribution/orders/assigned` | `DistributionOrder[]` |
| `/order-distribution/orders/unassigned` | `DistributionOrder[]` |
| `/order-distribution/audit-log` | `AuditLogRecord[]` |
| `/order-distribution/exceptions` | `ExceptionOrder[]` |
| `/order-distribution/workers` | `WorkerProgress[]` |
| `/order-distribution/ready-orders` | `ReadyOrdersSummary` |
| `/order-distribution/recommendation` | `DistributionRecommendation` |
| `/order-distribution/print-request` | `PrintRequest` |
| `/order-distribution/employees` | `WarehouseEmployee[]` |
| `/telesale/assignment/orders` | `TelesalePriorityOrder[]` (supports `search`, `status`, and `deliveryDate` query parameters) |
| `/telesale/assignment/agents` | `TelesaleAssignmentAgent[]` |
| `/telesale/assignment/summary` | `TelesaleAssignmentSummary` |
| `/telesale/assignment/work-orders?employeeName=...` | `TelesaleWorkOrder[]` |

Telesale assignment mutations use `POST /telesale/assignment/auto` with
`{ employeeIds: string[], orderCodes: string[] }` (an empty `orderCodes` array
assigns all available orders), `POST /telesale/assignment/manual` with
`{ employeeId: string, orderCodes: string[] }`, and `PATCH
/telesale/assignment/receiving` to update agent availability, automatic
acceptance, or priority. Use `PATCH /telesale/assignment/call-result` with
`{ orderCode: string, result: "Thành công" | "Thất bại" }` to close a call.
MSW includes sample order and agent data and applies these updates in memory
while the app is running.

### Telesale mockup screens

Run the frontend with `VITE_USE_MOCKS=true`, then open these routes:

| Route | Screen |
| --- | --- |
| `/telesale/dashboard` | CSKH overview, prioritized calls, and team progress |
| `/telesale/split` | Priority order assignment and automatic assignment settings |
| `/telesale/work` | Assigned calls, customer details, and quick call-result updates |
| `/telesale` | Employee performance overview |
| `/telesale/Employees?employeeName=Nguyễn%20Thị%20Lan` | Employee call progress and work-time summary |
| `/telesale/calls/DH00130?employeeName=Nguyễn%20Thị%20Lan` | Call detail and processing timeline |

Assignment, call-result, and receiving-status changes made through MSW are
kept in memory for the current app session. Reload the page to restore the
seeded sample data.

Authentication uses `POST /auth/login` with `{ email: string, password: string }`.
On success, it returns `{ accessToken: string, user: { id: string, email: string, name: string, role: string } }`.
When MSW is enabled, use `admin@awat.vn` / `awat123` to sign in; other credentials
return `401 Unauthorized`.

MSW handlers are in `src/mocks/handlers.ts`; keep their response contracts in
sync with the backend API.
