# WorkForceGov — Angular 21 Frontend

A complete, production-ready Angular SPA for the WorkForceGov Government Employment Platform.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure your API endpoints (REQUIRED — never commit this file)
cp src/environments/environment.example.ts src/environments/environment.ts
# Open environment.ts and replace the localhost URLs with your actual API base URLs

# 3. Start the dev server
npm start
# → http://localhost:4200
```

## 🏗️ Architecture

```
src/
├── environments/
│   ├── environment.example.ts   ← Template — copy and rename to environment.ts
│   ├── environment.ts           ← ⚠️ GITIGNORED — your actual API URLs
│   └── environment.prod.ts      ← ⚠️ GITIGNORED — production API URLs
├── app/
│   ├── core/
│   │   ├── models/index.ts      ← All TypeScript interfaces (30+ models)
│   │   ├── services/            ← 7 API services (one per module)
│   │   │   ├── auth.service.ts
│   │   │   ├── admin.service.ts
│   │   │   ├── citizen.service.ts
│   │   │   ├── employer.service.ts
│   │   │   ├── labor-officer.service.ts
│   │   │   ├── compliance.service.ts
│   │   │   ├── auditor.service.ts
│   │   │   └── program-manager.service.ts
│   │   ├── guards/auth.guard.ts      ← authGuard, guestGuard, roleGuard()
│   │   └── interceptors/jwt.interceptor.ts  ← Auto-attaches Bearer token + X-User-Id
│   ├── shared/components/layout/    ← Sidebar + topnav shell
│   └── features/
│       ├── Home/                    ← Public landing page (already present)
│       ├── auth/                    ← Login + Register (full validation)
│       ├── admin/                   ← 6 pages
│       ├── citizen/                 ← 8 pages
│       ├── employer/                ← 9 pages
│       ├── labor-officer/           ← 6 pages
│       ├── compliance-officer/      ← 4 pages
│       ├── gov-auditor/             ← 5 pages
│       └── program-manager/         ← 13 pages
```

## 🔒 Security

| Feature | Implementation |
|---|---|
| JWT Auth | `jwtInterceptor` attaches `Authorization: Bearer <token>` to every request |
| User ID | `X-User-Id` header auto-sent from stored session |
| 401 Handling | Interceptor auto-redirects to `/login` on 401 |
| Role Guards | `roleGuard(['Role1','Role2'])` protects each route group |
| Guest Guard | `guestGuard` prevents logged-in users from seeing login/register |
| API Secrets | `environment.ts` is gitignored — API URLs never committed |
| Session | JWT stored in `localStorage` under key `wfg_user` |

## 👤 Role → Route Mapping

| Role | Login redirects to |
|---|---|
| `SystemAdmin` | `/admin/dashboard` |
| `Citizen` | `/citizen/dashboard` |
| `Employer` | `/employer/dashboard` |
| `LaborOfficer` | `/labor-officer/dashboard` |
| `ComplianceOfficer` | `/compliance-officer/dashboard` |
| `GovernmentAuditor` | `/gov-auditor/dashboard` |
| `ProgramManager` | `/program-manager/dashboard` |

## 📦 Pages (55 components)

**Admin** — Dashboard, Manage Users, Create User, Edit User, Reports, System Logs  
**Citizen** — Dashboard, Job Search + Apply, Applications, Benefits, Trainings, Documents, Profile, Notifications  
**Employer** — Dashboard, Manage Jobs, Create/Edit Job, Applications, Application Review (shortlist/hire/reject), Upload Documents, Profile, Notifications, Register  
**Labor Officer** — Dashboard, Document Verifications (Citizen + Employer tabs), Applications, Audits, Compliance, Reports  
**Compliance Officer** — Dashboard, Employer Review, Investigate Complaints (resolve), Compliance Reports  
**Government Auditor** — Dashboard, Audit Reports (create audits), Compliance Monitoring, Workforce Programs, Alerts  
**Program Manager** — Dashboard (budget bar), Programs, Create/Edit Program, Trainings, Create/Edit Training, Benefits, Assign Benefit, Resources, Budget Monitoring, Performance Tracking, Reports  

## 🛠 Tech Stack

- **Angular 21** — standalone components, signals, computed, functional guards
- **Bootstrap 5.3** — npm installed (no CDN dependency)
- **Bootstrap Icons 1.11** — npm installed
- **RxJS** — HTTP observables
- **Angular Router** — lazy-loaded routes, role guards
- **Google Fonts** — Inter + Space Grotesk (loaded via CSS)
- **Zone.js** — change detection

## 🏭 Build for Production

```bash
# Set environment.prod.ts with real API URLs, then:
npm run build
# Output: dist/WorkForceGov/browser/
```
