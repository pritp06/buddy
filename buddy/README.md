# Hackathon Buddy

Hackathon Buddy is a hackathon team formation engine. It helps builders move from team need to discovery, trust evaluation, requests, and team formation with clear workflow state and explainable compatibility signals.

The project is designed as a startup MVP, not a static portfolio or generic dashboard. The core product goal is to help users form reliable hackathon teams quickly by making role gaps, proof, availability, trust, and request decisions operational.

## Product Workflow

The platform is organized around this workflow:

```text
Team Need -> Discovery -> Trust -> Request -> Team Formation
```

Primary capabilities include:

- Builder and team discovery by role, skill, verification status, location, timezone, availability, and activity.
- Explainable trust and compatibility signals based on profile completeness, proof of work, skills, availability, and team role gaps.
- Persistent request workflows for join requests, invites, shortlist decisions, acceptance, rejection, and duplicate prevention.
- Operational dashboards for profile completion, pending requests, unread notifications, active teams, missing roles, team readiness, and next actions.
- Team workflows for creation, membership, readiness tracking, leadership transfer, and recruiting status.
- Notification and activity systems with categories, priorities, unread tracking, and deduplication.
- Demo data tooling for realistic local testing and presentations.

## Tech Stack

Frontend:

- HTML5
- CSS3
- Native JavaScript modules
- Responsive interface served as static assets and Django templates

Backend:

- Python 3.9+
- Django 4.2
- SQLite for local development
- Django session authentication
- Django ORM models, migrations, and tests

## Architecture

```text
backend/
  apps/
    accounts/        Custom user model and authentication flows
    users/           Profile, skills, proof projects, links, resumes
    teams/           Teams, members, missing roles, required skills
    requestsystem/   Join and invite request lifecycle
    discovery/       Builder and team search
    dashboard/       Operational command center data
    notifications/   Prioritized user notifications
    activity/        Activity feed events
    saved/           Saved users and teams
    core/            Shared product logic, services, utilities, tests
  config/            Django settings, URLs, middleware, WSGI, ASGI
```

Important backend concepts:

- Domain workflow operations live in `apps/core/services.py`.
- Request transitions are validated and transactional.
- Team creation normalizes required skills and missing roles.
- Discovery querysets use prefetching, filtering, sorting, and pagination.
- Profile completion and team readiness are computed from persisted state.
- Tests live in `apps/core/tests.py`.

## Environment Variables

Create a local environment file from the example:

```bash
cd backend
cp .env.example .env
```

Variables:

```text
SECRET_KEY=replace-this-with-a-long-random-value
DEBUG=False
ALLOWED_HOSTS=127.0.0.1,localhost
SESSION_COOKIE_SECURE=False
CSRF_COOKIE_SECURE=False
```

For production, use a strong secret key, set `DEBUG=False`, configure real hostnames in `ALLOWED_HOSTS`, and enable secure cookies when serving over HTTPS.

## Backend Setup

From the project root:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r backend/requirements.txt
python backend/manage.py migrate
```

On macOS or Linux:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
python backend/manage.py migrate
```

## Running the Server

```bash
python backend/manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

The frontend does not require a build step. It can be used in two ways:

1. Through Django templates and static files, which is recommended for real workflows.
2. By opening the static HTML files directly for visual review and standalone demos.

When served through Django, forms submit to backend routes and persist data. When opened as standalone static files, forms keep demo navigation behavior.

## Admin Setup

Create a superuser:

```bash
python backend/manage.py createsuperuser
```

Then visit:

```text
http://127.0.0.1:8000/admin/
```

## Demo Data

Generate realistic local data:

```bash
python backend/manage.py seed_demo
```

Demo login:

```text
Email: demo.lead@example.com
Password: DemoPass123
```

The command creates demo builders, skills, proof projects, a recruiting team, join requests, notifications, and operational readiness data.

## Testing

Run the automated test suite:

```bash
python backend/manage.py test
```

Current coverage includes:

- Signup, login, logout, invalid login, password reset route, and protected routes.
- Profile updates, skill creation, proof project creation, and resume upload.
- Team creation, normalized required skills, normalized missing roles, and team membership.
- Join requests, duplicate prevention, shortlist, acceptance, membership creation, and invalid transition prevention.
- Unauthorized request transition enforcement.
- Discovery filtering, sorting, pagination, and dynamic `HB_DATA`.
- Dashboard operational data.
- Saved teams, saved users, notification read tracking.
- CSRF protection for unsafe writes.

## Migrations

After model changes, create and apply migrations:

```bash
python backend/manage.py makemigrations
python backend/manage.py migrate
```

Check for missing migrations before delivery:

```bash
python backend/manage.py makemigrations --check --dry-run
```

## Production Notes

Before deploying:

- Use PostgreSQL instead of SQLite.
- Set `DEBUG=False`.
- Configure `ALLOWED_HOSTS`.
- Store `SECRET_KEY` outside source control.
- Enable `SESSION_COOKIE_SECURE=True` and `CSRF_COOKIE_SECURE=True` under HTTPS.
- Configure static file serving with `collectstatic`.
- Add email delivery for password reset and notification workflows.
- Replace the in-process rate limiter with Redis-backed throttling for multi-process deployments.
- Add observability for request volume, error rates, slow queries, and team formation funnel metrics.

## Quality Status

The backend now includes executable workflow tests, transactional request state handling, normalized skill and role entities, database constraints, query optimization, operational dashboard data, demo data tooling, and production-oriented settings.
