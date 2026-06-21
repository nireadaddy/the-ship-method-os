# Dashboard / Internal Analytics Tool Template

A dashboard succeeds or fails on trust in the numbers, not visual polish — if a chart is wrong once, the whole tool gets ignored forever after. Plan the data pipeline (where does truth live, how fresh is it, what happens when a source is late or down) before designing a single widget. Permissions matter more here than in most product types, because dashboards often expose sensitive company data across teams — decide row-level and column-level access rules in the plan, not as an afterthought. Build the data layer and one reliable chart before adding the tenth widget nobody asked for.

## Feature Checklist

- [ ] Data source connections (database, API, CSV upload, or warehouse)
- [ ] Scheduled or real-time data refresh/sync
- [ ] Widget library (line, bar, pie/donut, table, KPI number, funnel)
- [ ] Dashboard builder/layout (arrange widgets, resize, save layout)
- [ ] Filters (date range, segment, dimension) that apply across widgets
- [ ] Drill-down (click a chart segment to see underlying rows)
- [ ] Role-based access (who sees which dashboards/data)
- [ ] Export (CSV, PDF, image of chart/dashboard)
- [ ] Scheduled reports (emailed snapshot on a cadence)
- [ ] Alerting (notify when a metric crosses a threshold)
- [ ] Caching/performance handling for large datasets
- [ ] Audit log of who viewed/changed dashboard configs (for sensitive data)
- [ ] Multi-dashboard navigation (saved views per team/use case)

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| Data Source | type, connection_config, last_synced_at | has many Metrics/Datasets |
| Dataset / Metric | name, source_id, query_or_field, refresh_interval | belongs to Data Source; used by many Widgets |
| Dashboard | name, owner_id, layout_config (JSON) | has many Widgets; belongs to User (owner) |
| Widget | type (chart/table/kpi), dataset_id, config (JSON), position | belongs to Dashboard; belongs to Dataset |
| User | name, email, role | has many Dashboards; restricted by Permission |
| Permission | user_id or role, resource_id, access_level | belongs to User/Role; applies to Dashboard or Dataset |
| Alert Rule | metric_id, condition, threshold, notify_channel | belongs to Dataset |

## Core User Flows

1. Admin connects a data source → defines datasets/metrics to track
2. Admin/user builds a dashboard → adds widgets → arranges layout → saves
3. User opens dashboard → applies date/segment filter → all widgets update
4. User clicks into a chart segment → sees underlying detail rows (drill-down)
5. User exports current view (CSV/PDF) for a meeting or report
6. Admin sets an alert rule → gets notified when a metric crosses threshold
7. Admin manages permissions → restricts a sensitive dashboard to specific roles

## Monetization Pattern

If internal-only: no direct revenue — value is measured in decision speed and reduced manual reporting labor (the build is justified by hours saved, not a price point). If sold as a product (analytics SaaS), monetization is typically per-seat or usage-tiered by data volume/number of dashboards/refresh frequency, with higher tiers unlocking more data sources, longer history retention, and advanced alerting/export.

## Build Order (MVP fastest path)

1. One reliable data source connection + one dataset (resist connecting everything at once)
2. 3-5 hardcoded but real KPI/chart widgets on a single fixed-layout page
3. Basic date-range filter applied across all widgets
4. Simple role check (admin vs. viewer) — skip granular permissions initially
5. CSV export of underlying data
6. Defer: drag-and-drop dashboard builder, alerting, scheduled email reports, drill-down

## Example AI Build Prompts

```
Build a data pipeline that pulls data from [Postgres/API source] on a scheduled
job (every 15 minutes), aggregates it into a metrics table with columns for
metric_name, value, dimension, and timestamp, and exposes a REST endpoint that
returns time-series data filtered by metric_name and date range.
```

```
Build a dashboard page in [React/Next.js] with a global date-range filter at
the top and 4 widgets below it: a KPI number card, a line chart (trend over
time), a bar chart (breakdown by category), and a data table. All widgets
should re-fetch and update when the date filter changes, without a full page reload.
```

```
Add role-based access control to the dashboard app: viewers can see dashboards
shared with their role but cannot edit layout or data source connections;
admins can create/edit dashboards and manage which roles can access which
dashboard. Include a permissions table and middleware that checks access on
every dashboard load.
```
