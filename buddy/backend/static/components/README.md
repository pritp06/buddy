# Hackathon Buddy Frontend

The static route shells load `js/app.js`, which composes the platform from small modules:

- `js/data.js`: routes, teams, builders, trust evidence, requests, deadlines, activity
- `js/ui.js`: shell, navigation, cards, forms, badges, meters, trust and compatibility UI
- `js/pages.js`: landing, onboarding, discovery, profiles, requests, teams, settings, system states
- `js/app.js`: route selection, theme, form routing, discovery filter and sort state

The product is organized around the team formation path:

Team need -> discovery -> trust -> request -> team formation.
