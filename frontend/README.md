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

The app uses the same HTTP API in both modes. During Vite development, MSW is
enabled by default unless `VITE_USE_MOCKS=false`. Set it to `true` to enable
MSW explicitly in any mode. In production builds, MSW is disabled unless the
variable is explicitly set to `true`. When mocks are disabled, requests go to
the real backend; `VITE_API_BASE_URL` is prepended to each endpoint.

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

MSW handlers are in `src/mocks/handlers.ts`; keep their response contracts in
sync with the backend API.
