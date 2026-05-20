import {
  activity,
  deadlines,
  notificationPriority,
  onboardingGuidance,
  people,
  profileCompletion,
  requestPipeline,
  requests,
  sprintPulse,
  teamOperations,
  teams,
  trustStandards
} from './data.js';
import {
  actionRail,
  badge,
  builderCard,
  card,
  compatibilityRows,
  decisionGrid,
  evidenceList,
  field,
  formActions,
  href,
  initials,
  meter,
  pageHead,
  reasonStack,
  riskList,
  shell,
  state,
  tags,
  teamCard,
  trustSummary
} from './ui.js';

export function landingPage() {
  return `
    <div class="container">
      <nav class="marketing-nav">
        <a class="brand" href="index.html"><img src="assets/brand-mark.svg" alt=""><span>Hackathon Buddy<small>Team formation engine</small></span></a>
        <div class="links"><a class="btn ghost desktop-only" href="${href('login')}">Log in</a><a class="btn primary" href="${href('signup')}">Find teammates</a></div>
      </nav>
      <section class="hero">
        <div class="hero-grid">
          <div class="hero-copy">
            <div class="trust-row">${badge('Proof-backed matching', 'ok')}${badge('Role gaps first', 'info')}${badge('3-5 minute setup', 'warn')}</div>
            <h1>Build the right hackathon team before momentum fades.</h1>
            <p class="lede">Find builders by team need, verify proof, understand compatibility, send focused requests, and move into a sprint workspace fast.</p>
            <div class="actions"><a class="btn primary" href="${href('signup')}">Start matching</a><a class="btn" href="${href('findBuddy')}">Browse builders</a></div>
          </div>
          <div class="product-shot" aria-label="Hackathon Buddy product preview">
            <div class="shot-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
            <div class="mock-app">
              <div class="mock-panel">
                <div class="mini-head"><strong>CarbonLoop readiness</strong>${badge('2 roles open', 'warn')}</div>
                ${meter(72, '72% ready - frontend blocks demo polish')}
                <div class="table-list">
                  <div class="list-row"><span>Frontend Engineer</span>${badge('Urgent', 'warn')}</div>
                  <div class="list-row"><span>ML Builder</span>${badge('Open', 'info')}</div>
                  <div class="list-row"><span>Pitch Lead</span>${badge('Covered', 'ok')}</div>
                </div>
              </div>
              <div class="mock-panel">
                ${people.slice(0, 3).map(person => `
                  <div class="mock-card">
                    <div class="person-row"><div class="avatar">${initials(person.name)}</div><div><strong>${person.name}</strong><p class="caption">${person.role}</p></div></div>
                    ${meter(person.score, `${person.score}% because ${person.compatibility[0][2].toLowerCase()}`)}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="section band"><div class="container grid three">
      <div><h3>Team need first</h3><p class="lede">Search starts from missing roles, urgency, deadlines, and collaboration coverage.</p></div>
      <div><h3>Explainable trust</h3><p class="lede">Every match shows proof source, recency, role contribution, availability, and response reliability.</p></div>
      <div><h3>Decision-grade requests</h3><p class="lede">Accepting a teammate means seeing fit, risks, team impact, and sprint commitments first.</p></div>
    </div></section>
  `;
}

export function authPage(type) {
  const data = {
    login: ['Welcome back', 'Continue to command center', 'dashboard'],
    signup: ['Create your builder profile', 'Start trust setup', 'verify'],
    forgot: ['Reset password', 'Send secure reset link', 'login'],
    verify: ['Verify your email', 'Start onboarding', 'basic']
  }[type];
  const form = type === 'verify'
    ? `<p class="lede">Confirm your email to unlock proof-based discovery. For this MVP route, continue into onboarding.</p>`
    : `${field({ id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' })}
       ${type !== 'forgot' ? field({ id: 'password', label: 'Password', type: 'password', placeholder: 'Minimum 8 characters' }) : ''}`;

  return `<div class="auth-wrap"><section class="card auth-card"><div class="card-body">
    <a class="brand" href="${href('landing')}"><img src="../assets/brand-mark.svg" alt=""><span>Hackathon Buddy<small>Trust-first access</small></span></a>
    <h2>${data[0]}</h2>
    <form class="form" data-demo-form>${form}<button class="btn primary" type="submit" data-next="${href(data[2])}">${data[1]}</button></form>
    <div class="actions"><a class="btn ghost" href="${href(type === 'login' ? 'signup' : 'login')}">${type === 'login' ? 'Create profile' : 'Log in'}</a><a class="btn ghost" href="${href('forgot')}">Forgot password</a></div>
  </div></section></div>`;
}

export function onboardingPage(step) {
  const steps = ['basic', 'skills', 'proof', 'resume', 'complete'];
  const index = steps.indexOf(step);
  const next = steps[index + 1] || 'dashboard';
  const forms = {
    basic: [
      field({ id: 'name', label: 'Builder name', placeholder: 'Maya Chen' }),
      field({ id: 'role', label: 'Preferred hackathon role', options: ['Frontend Engineer', 'ML Builder', 'Backend Engineer', 'Product Designer', 'Pitch Lead', 'Full Stack Engineer'] }),
      field({ id: 'timezone', label: 'Timezone and overlap window', placeholder: 'UTC-5, available 6 PM-1 AM' }),
      field({ id: 'availability', label: 'Hackathon availability', options: ['Full weekend sprint', 'Evenings only', 'Final day polish', 'Remote async only'] })
    ],
    skills: [
      field({ id: 'stack', label: 'Primary stack', placeholder: 'React, Flask, Postgres' }),
      field({ id: 'confidence', label: 'Stack confidence', options: ['Can lead this area', 'Can contribute independently', 'Can support with guidance'] }),
      field({ id: 'style', label: 'Collaboration style', options: ['Async updates', 'Pairing blocks', 'Design review loops', 'Fast solo execution'] }),
      field({ id: 'teamPref', label: 'Team preference', options: ['Small focused team', 'Cross-functional team', 'Need strong PM/design', 'Need strong engineering core'] })
    ],
    proof: [
      field({ id: 'github', label: 'GitHub or code proof', placeholder: 'https://github.com/you/project' }),
      field({ id: 'projectRole', label: 'Your contribution role', placeholder: 'Frontend lead, API owner, UX researcher' }),
      field({ id: 'recency', label: 'Proof recency', options: ['Shipped this week', 'Shipped this month', 'Updated in last 90 days', 'Older but relevant'] }),
      field({ id: 'proofNote', label: 'What this proves', type: 'textarea', placeholder: 'Explain what a team should trust you to own.' })
    ],
    resume: [
      field({ id: 'resume', label: 'Resume or LinkedIn URL', placeholder: 'Optional credibility link', required: false }),
      field({ id: 'history', label: 'Hackathon history', placeholder: '3 hackathons, 1 finalist demo' }),
      field({ id: 'commitment', label: 'Commitment level', options: ['Can own a role end-to-end', 'Can contribute a focused module', 'Can help polish and pitch'] }),
      field({ id: 'response', label: 'Expected response speed', options: ['Within 1 hour', 'Within 3 hours', 'Same day', 'Async only'] })
    ],
    complete: [
      field({ id: 'openTo', label: 'Open to requests for', options: ['Teams missing my role', 'Solo builders forming a team', 'Only saved teams', 'Hidden for now'] }),
      field({ id: 'proofVisibility', label: 'Proof visibility', options: ['Show proof previews publicly', 'Show after request', 'Show only to accepted teams'] }),
      field({ id: 'goal', label: 'Current team goal', type: 'textarea', placeholder: 'What kind of hackathon team should contact you?' })
    ]
  };
  return shell(step, `<section class="page">
    ${pageHead(step)}
    ${card(`${meter((index + 1) * 20, `Step ${index + 1} of 5 - trust profile ${((index + 1) * 20)}% complete`)}<p class="caption">${onboardingGuidance[step]}</p>${decisionGrid([['Improves', step === 'proof' ? 'Acceptance confidence' : 'Match quality'], ['Used in', 'Discovery ranking'], ['Reduces', step === 'basic' ? 'Schedule risk' : 'Request hesitation']], true)}`)}
    <section class="card"><div class="card-body"><h3>${stepTitle(step)}</h3><form class="form" data-demo-form novalidate>${forms[step].join('')}${formActions(step === 'complete' ? 'Open command center' : 'Continue', next)}${step === 'proof' ? `<a class="btn ghost" href="${href('resume')}">Skip proof for now</a>` : ''}</form></div></section>
  </section>`);
}

function stepTitle(step) {
  return ({ basic: 'Basic team-fit signals', skills: 'Skills and collaboration setup', proof: 'Proof of work evidence', resume: 'Credibility and availability', complete: 'Profile visibility and request readiness' })[step];
}

export function dashboardPage() {
  const live = window.HB_DATA || {};
  const liveProfile = live.profileCompletion || profileCompletion;
  const liveRequests = live.requestPipeline || requestPipeline;
  const liveActivity = live.activity || activity;
  const liveTeamOps = { ...teamOperations, ...(live.teamOperations || {}) };
  const livePeople = live.people?.length ? live.people : people;
  const liveTeams = live.teams?.length ? live.teams : teams;
  const action = `<a class="btn primary" href="${href('receivedRequests')}">Review urgent request</a>`;
  return shell('dashboard', `<section class="page">
    ${pageHead('dashboard', action)}
    ${card(`<div class="command-strip">
      <div><span class="caption">Next best action</span><h2>Decide on Maya before the frontend blocker costs the pitch window.</h2><p class="lede">Accepting closes the highest-impact role gap; shortlisting keeps the slot warm while you request API-contract confirmation.</p></div>
      <div class="actions"><a class="btn primary" href="${href('requestDetails')}">Open decision room</a><a class="btn" href="${href('findBuddy')}">Find backup</a></div>
    </div>`, 'priority-card')}
    <div class="grid four">
      ${card(`${badge(`${liveProfile.score}% complete`, liveProfile.score >= 80 ? 'ok' : 'warn')}<h3>Profile trust</h3><p class="caption">${liveProfile.next}</p>${(liveProfile.blockers || []).map(([title, copy]) => `<div class="mini-warning"><strong>${title}</strong><span>${copy}</span></div>`).join('')}<a class="btn" href="${href('proof')}">Fix trust gaps</a>`)}
      ${card(`${badge(`${live.unreadNotifications || 0} unread alerts`, 'warn')}<h3>Unread decisions</h3><p class="caption">Requests and alerts that affect active blockers.</p>${liveRequests.slice(0, 3).map(([label, count, copy]) => `<div class="mini-row"><strong>${count} ${label}</strong><span>${copy}</span></div>`).join('')}<a class="btn primary" href="${href('receivedRequests')}">Review pipeline</a>`)}
      ${card(`${badge('Operational readiness', 'warn')}<h3>Team readiness</h3>${meter(liveTeamOps.readiness?.[0]?.[1] || 0, `${liveTeamOps.readiness?.[0]?.[1] || 0}% ready`)}${(liveTeamOps.readiness || []).slice(0, 2).map(([label, value, reason]) => `<div class="mini-row"><strong>${label}: ${value}%</strong><span>${reason}</span></div>`).join('')}<a class="btn" href="${href('teamDashboard')}">Unblock team</a>`)}
      ${card(`${badge('Live pulse', 'info')}<h3>Sprint urgency</h3><p class="caption">${liveTeamOps.nextAction || teamOperations.countdown}.</p>${liveActivity.slice(0, 3).map((text, index) => `<div class="mini-row"><strong>${index + 1} - Activity</strong><span>${text}</span></div>`).join('')}<a class="btn" href="${href('activity')}">View pulse</a>`)}
    </div>
    <div class="grid two">
      <section class="stack">${sectionTitle('Next best actions')}${nextActions()}</section>
      <section class="stack">${sectionTitle('Notification priority')}${notificationList()}</section>
    </div>
    <div class="grid two">
      <section class="stack">${sectionTitle('Suggested builders')}${livePeople.slice(0, 2).map(p => builderCard(p, 'dense')).join('')}</section>
      <section class="stack">${sectionTitle('Active recruiting teams')}${liveTeams.slice(0, 2).map(t => teamCard(t, 'dense')).join('')}</section>
    </div>
  </section>`);
}

function sectionTitle(title) {
  return `<div class="section-head"><h3>${title}</h3></div>`;
}

function nextActions() {
  return card(`<div class="table-list">
    <div class="list-row"><span><strong>Review Maya's request</strong><br><span class="caption">Frontend role fit is high; acceptance raises readiness by 16 points.</span></span>${badge('Now', 'warn')}</div>
    <div class="list-row"><span><strong>Request API-contract confirmation</strong><br><span class="caption">Reduces the biggest risk before accepting frontend ownership.</span></span>${badge('Safety', 'info')}</div>
    <div class="list-row"><span><strong>Shortlist Arjun as ML fallback</strong><br><span class="caption">Protects demo credibility if forecast scope stays narrow.</span></span>${badge('Backup', 'ok')}</div>
  </div>`);
}

function notificationList() {
  return card(`<div class="table-list">${notificationPriority.map(([level, text, action]) => `<div class="list-row"><span><strong>${text}</strong><br><span class="caption">${action}</span></span>${badge(level, level === 'Critical' ? 'warn' : level === 'High' ? 'info' : 'ok')}</div>`).join('')}</div>`);
}

export function discoveryPage(type, results = false) {
  const key = type === 'team' ? (results ? 'teamResults' : 'findTeam') : (results ? 'userResults' : 'findBuddy');
  const items = filteredItems(type);
  return shell(key, `<section class="page">
    ${pageHead(key)}
    ${card(`<div class="role-first-bar">
      <div><span class="caption">Current team need</span><h3>${state.roleNeed}</h3><p class="caption">Ranking favors missing-role coverage, execution confidence, confirmed availability, and recent activity.</p></div>
      <div class="role-options" role="group" aria-label="Role need">${['Frontend Engineer', 'ML Builder', 'Backend Engineer', 'Product Designer', 'Pitch Lead'].map(role => `<button class="pill filter ${state.roleNeed === role ? 'active' : ''}" type="button" data-role-need="${role}" aria-pressed="${state.roleNeed === role}">${role}</button>`).join('')}</div>
    </div>`)}
    ${discoveryControls(type)}
    <div class="results-meta">${badge(`${items.length} decision-ranked matches`, 'info')}<span>Sorted by ${state.sort.replace('-', ' ')} for ${state.roleNeed}</span></div>
    <div class="grid three results-grid">${items.map(item => type === 'team' ? teamCard(item) : builderCard(item)).join('') || emptyMatches(type)}</div>
  </section>`);
}

function discoveryControls(type) {
  const filters = [
    ['verified', 'Verified proof'],
    ['available', 'Available now'],
    ['highMatch', 'High match'],
    ['proof', 'Recent proof'],
    [type === 'team' ? 'missingRole' : 'response', type === 'team' ? 'Missing my role' : 'Fast response']
  ];
  return `
    <section class="searchbar" aria-label="Discovery controls">
      <label class="sr-only" for="search">Search discovery</label>
      <input class="input" id="search" data-search value="${state.query}" placeholder="Search role, stack, hackathon, proof, timezone, or availability">
      <div class="filter-row" role="group" aria-label="Filters">
        ${filters.map(([id, label]) => `<button class="pill filter ${state.filters.has(id) ? 'active' : ''}" type="button" data-filter="${id}" aria-pressed="${state.filters.has(id)}">${label}</button>`).join('')}
      </div>
      <div class="sort-row">
        <label for="sort">Sort</label>
        <select class="select compact-select" id="sort" data-sort>
          ${[
            ['bestFit', 'Safest right now'],
            ['compatibility', 'Best compatibility'],
            ['verified', 'Verified first'],
            ['availability', 'Availability confidence'],
            ['urgency', 'Role urgency'],
            ['newest', 'Recent activity']
          ].map(([value, label]) => `<option value="${value}" ${state.sort === value ? 'selected' : ''}>${label}</option>`).join('')}
        </select>
        <a class="btn primary" href="${href(type === 'team' ? 'teamResults' : 'userResults')}">Apply search</a>
      </div>
    </section>
  `;
}

function filteredItems(type) {
  const live = window.HB_DATA || {};
  const source = type === 'team' ? (live.teams || teams) : (live.people || people);
  const query = state.query.toLowerCase().trim();
  let items = source.filter(item => {
    const haystack = JSON.stringify(item).toLowerCase();
    const queryMatch = !query || haystack.includes(query);
    const filterMatch = [...state.filters].every(filter => item.filters?.includes(filter));
    return queryMatch && filterMatch;
  });
  items = [...items].sort((a, b) => {
    if (state.sort === 'bestFit') return decisionRank(b, type) - decisionRank(a, type);
    if (state.sort === 'verified') return Number(b.verified) - Number(a.verified) || b.score - a.score;
    if (state.sort === 'availability') return confidenceRank(b.availabilityConfidence) - confidenceRank(a.availabilityConfidence);
    if (state.sort === 'urgency') return urgencyRank(b.urgency) - urgencyRank(a.urgency);
    if (state.sort === 'newest') return activeRank(b) - activeRank(a);
    return b.score - a.score;
  });
  return items;
}

function decisionRank(item, type) {
  const roleMatch = type === 'team'
    ? Number(item.openRoles?.includes(state.roleNeed)) * 28
    : Number(item.role === state.roleNeed) * 28;
  const trust = item.trustScore || item.score;
  const confidence = item.decision?.executionConfidence || item.readiness || 60;
  return roleMatch + trust * .35 + confidence * .3 + urgencyRank(item.urgency || '') * 8 + activeRank(item) * 5;
}

function confidenceRank(value = '') {
  return { High: 3, Medium: 2, Low: 1 }[value] || 0;
}

function urgencyRank(value = '') {
  if (value.includes('6h') || value.includes('1 slot') || value.includes('today')) return 3;
  if (value.includes('open') || value.includes('needed')) return 2;
  return 1;
}

function activeRank(item) {
  const text = `${item.active || item.decision?.activeNow || ''}`;
  if (text.includes('11m') || text.includes('17m') || text.includes('24m') || text.includes('today')) return 3;
  if (text.includes('yesterday') || text.includes('1h')) return 2;
  return text ? 1 : 0;
}

function emptyMatches(type) {
  return card(`<h3>No matching ${type === 'team' ? 'teams' : 'builders'} yet</h3><p class="caption">Remove one filter, broaden stack terms, or complete one more proof field to improve match quality.</p><div class="actions"><button class="btn primary" type="button" data-clear-filters>Clear filters</button><a class="btn" href="${href(type === 'team' ? 'createTeam' : 'editProfile')}">${type === 'team' ? 'Create team' : 'Improve profile'}</a></div>`);
}

export function detailPage(type) {
  const item = type === 'team' ? teams[0] : people[0];
  const key = type === 'team' ? 'teamDetails' : 'userProfile';
  const primary = type === 'team' ? ['Request slot', 'joinTeam'] : ['Invite builder', 'collabRequest'];
  return shell(key, `<section class="page">
    ${pageHead(key, `<a class="btn primary" href="${href(primary[1])}">${primary[0]}</a>`)}
    <div class="profile-layout">
      <aside class="card sticky-panel"><div class="card-body">
        <div class="person-row"><div class="avatar">${initials(item.name)}</div><div><h3>${item.name}</h3><p class="caption">${item.role || item.mission}</p></div></div>
        ${trustSummary(item)}
        <div class="stats">
          <div class="stat"><b>${item.score}%</b><span>Explainable match</span></div>
          <div class="stat"><b>${item.proofCount || item.openRoles.length}</b><span>${type === 'team' ? 'Open roles' : 'Proof items'}</span></div>
        </div>
        ${type === 'team' ? meter(item.readiness, `${item.readiness}% team ready`) : ''}
        <div class="actions"><a class="btn primary" href="${href(primary[1])}">${primary[0]}</a><a class="btn" href="${href(type === 'team' ? 'savedTeams' : 'savedUsers')}">Save</a></div>
      </div></aside>
      <section class="stack">
        <div class="card"><div class="tabs" role="tablist" aria-label="Trust profile sections">
          ${['Trust evidence', 'Compatibility', 'Proof', 'Activity'].map((tab, index) => `<button class="tab ${index === 0 ? 'active' : ''}" role="tab" aria-selected="${index === 0}" type="button">${tab}</button>`).join('')}
        </div><div class="card-body">
          <h3>Why this match is credible</h3>
          ${type === 'team' ? reasonStack(item.decisionReasons) : reasonStack(item.decisionReasons)}
          ${tags(type === 'team' ? item.openRoles : item.skills)}
        </div></div>
        ${card(`<h3>Trust standard applied</h3><p class="caption">Hackathon Buddy weights proof only when it reduces a concrete collaboration risk.</p>${reasonStack(trustStandards)}`)}
        ${card(`<h3>Compatibility breakdown</h3>${compatibilityRows(item.compatibility)}`)}
        ${type === 'team' ? teamEvidence(item) : proofEvidence(item)}
      </section>
    </div>
  </section>`);
}

function proofEvidence(person) {
  return card(`<h3>Proof-of-work preview</h3><div class="table-list">${person.projects.map(([name, role, stack, recency]) => `<div class="list-row"><span><strong>${name}</strong><br><span class="caption">${role} - ${stack}</span></span>${badge(recency, recency.includes('days') ? 'ok' : 'info')}</div>`).join('')}</div>`);
}

function teamEvidence(team) {
  return card(`<h3>Role urgency and readiness</h3><div class="table-list">${team.openRoles.map(role => `<div class="list-row"><span><strong>${role}</strong><br><span class="caption">Needed for ${team.deadline.toLowerCase()}</span></span>${badge(team.urgency, 'warn')}</div>`).join('')}</div>`);
}

export function requestListPage(key) {
  const received = key !== 'sentRequests';
  return shell(key, `<section class="page">
    ${pageHead(key)}
    <div class="grid two">${requests.map(req => requestCard(req, received)).join('')}</div>
  </section>`);
}

function requestCard(req, received) {
  const person = people.find(p => p.id === req.personId);
  const team = teams.find(t => t.id === req.teamId);
  return card(`
    <div class="scan-top"><div class="person-row"><div class="avatar">${initials(person.name)}</div><div><strong>${person.name}</strong><p class="caption">${req.roleFit}</p></div></div>${badge(req.urgency, 'warn')}</div>
    ${meter(req.executionConfidence, `${req.executionConfidence}% execution confidence for ${team.name}`)}
    <p class="caption">${req.teamImpact}</p>
    ${decisionGrid([
      ['Proof', `${person.proofCount} verified items`],
      ['Commitment', req.sprintCommitment],
      ['Timezone', req.timezoneCompatibility],
      ['Risk count', `${req.risks.length} known risks`]
    ], true)}
    <div class="actions"><a class="btn primary" href="${href('requestDetails')}">${received ? 'Open decision room' : 'Track request'}</a>${received ? '<button class="btn" type="button" data-request-action="Shortlist" data-request-id="' + req.id + '">Shortlist</button><button class="btn danger" type="button" data-request-action="Decline" data-request-id="' + req.id + '">Decline</button>' : ''}</div>
  `);
}

export function requestDetailsPage() {
  const req = requests[0];
  const person = people.find(p => p.id === req.personId);
  const team = teams.find(t => t.id === req.teamId);
  return shell('requestDetails', `<section class="page">
    ${pageHead('requestDetails', actionRail(['Accept with role', 'Shortlist', 'Ask question', 'Request proof', 'Schedule quick sync', 'Save for review', 'Decline'], req.id))}
    <div class="profile-layout">
      <aside class="card sticky-panel"><div class="card-body">
        <div class="person-row"><div class="avatar">${initials(person.name)}</div><div><h3>${person.name}</h3><p class="caption">${person.role}</p></div></div>
        ${trustSummary(person)}
        ${meter(req.executionConfidence, `${req.executionConfidence}% execution confidence`)}
        <p class="caption">${req.message}</p>
        ${riskList(req.risks)}
      </div></aside>
      <section class="stack">
        ${card(`<h3>Decision summary</h3><div class="table-list">
          <div class="list-row"><span><strong>Role fit</strong><br><span class="caption">${req.roleFit}</span></span>${badge('High', 'ok')}</div>
          <div class="list-row"><span><strong>Team impact</strong><br><span class="caption">${req.teamImpact}</span></span>${badge('+16 readiness', 'ok')}</div>
          <div class="list-row"><span><strong>Deadline fit</strong><br><span class="caption">${team.deadline}; ${person.availability}</span></span>${badge('Confirmed', 'ok')}</div>
        </div>${reasonStack(req.decisionChecks)}`)}
        ${card(`<h3>Compressed hiring screen</h3>${decisionGrid([
          ['Missing role coverage', req.roleFit],
          ['Sprint commitment', req.sprintCommitment],
          ['Timezone compatibility', req.timezoneCompatibility],
          ['Communication expectation', req.communication],
          ['Project relevance', person.decision.stackOverlap],
          ['Completion history', person.decision.reliabilitySource]
        ])}`)}
        ${card(`<h3>Compatibility reasoning</h3>${compatibilityRows(person.compatibility)}`)}
        ${proofEvidence(person)}
        ${card(`<h3>Goals, risks, and safe next actions</h3><div class="grid two"><div><h4>Contribution goals</h4>${evidenceList(req.goals)}</div><div><h4>Known risks</h4>${evidenceList(req.risks)}</div></div>${actionRail(req.intermediateActions, req.id)}`)}
      </section>
    </div>
  </section>`);
}

export function formPage(key, danger = false) {
  const forms = {
    joinTeam: joinTeamFields(),
    collabRequest: inviteFields(),
    createTeam: createTeamFields(),
    editProfile: editProfileFields(),
    password: passwordFields(),
    privacy: privacyFields(),
    deleteAccount: dangerFields('delete account'),
    removeMember: dangerFields('remove member'),
    transferLeadership: dangerFields('transfer leadership')
  };
  return shell(key, `<section class="page">
    ${pageHead(key)}
    <section class="card"><div class="card-body"><form class="form" data-demo-form>${(forms[key] || createTeamFields()).join('')}${formActions(danger ? 'Confirm impact-aware action' : 'Save and continue', danger ? 'settings' : 'dashboard', danger)}</form></div></section>
  </section>`);
}

function joinTeamFields() {
  return [
    field({ id: 'role', label: 'Role gap you fill', options: ['Frontend Engineer', 'ML Builder', 'Backend Engineer', 'Pitch Lead'] }),
    field({ id: 'proof', label: 'Most relevant proof link', placeholder: 'Project that proves you can own this role' }),
    field({ id: 'availability', label: 'Sprint availability commitment', options: ['Full weekend', 'Tonight + final day', 'Async overnight support'] }),
    field({ id: 'timezone', label: 'Timezone and live overlap', placeholder: 'UTC-5, can pair 6 PM-1 AM' }),
    field({ id: 'commitment', label: 'Commitment level', options: ['Own missing role end-to-end', 'Own a narrow module', 'Backup support only'] }),
    field({ id: 'impact', label: 'How you improve team readiness', type: 'textarea', placeholder: 'Explain what blocker you remove and what you will ship.' })
  ];
}

function inviteFields() {
  return [
    field({ id: 'teamNeed', label: 'Team need', placeholder: 'Frontend polish before demo' }),
    field({ id: 'whyFit', label: 'Why this builder fits', type: 'textarea', placeholder: 'Mention stack overlap, role gap, proof, and availability.' }),
    field({ id: 'commitment', label: 'Requested commitment', options: ['Own role end-to-end', 'Pair for focused block', 'Review and unblock', 'Final demo polish'] }),
    field({ id: 'deadline', label: 'Hackathon timing', placeholder: 'Demo in 36h, team lock tonight' })
  ];
}

function createTeamFields() {
  return [
    field({ id: 'mission', label: 'Hackathon mission', placeholder: 'Climate API sprint' }),
    field({ id: 'deadline', label: 'Deadline or countdown', placeholder: 'Demo in 48h' }),
    field({ id: 'roles', label: 'Missing roles', placeholder: 'Frontend Engineer, ML Builder' }),
    field({ id: 'stage', label: 'Sprint stage', options: ['Idea validation', 'Prototype build', 'Demo polish', 'Pitch prep'] }),
    field({ id: 'teamSize', label: 'Preferred team size', options: ['2-3 focused builders', '4-5 cross-functional team', 'Only one missing role'] }),
    field({ id: 'proofReq', label: 'Proof expectation', options: ['Verified project required', 'Recent demo preferred', 'Open to unverified builders'] }),
    field({ id: 'cadence', label: 'Collaboration cadence', options: ['Fast async updates', 'Scheduled pairing blocks', 'Daily standup', 'Final-day sprint'] })
  ];
}

function editProfileFields() {
  return [
    field({ id: 'role', label: 'Primary role', placeholder: 'Frontend Engineer' }),
    field({ id: 'availability', label: 'Availability confidence', options: ['High', 'Medium', 'Low'] }),
    field({ id: 'timezone', label: 'Timezone overlap', placeholder: 'UTC-5, 5h overlap with India/EU' }),
    field({ id: 'proof', label: 'Latest proof update', placeholder: 'Shipped responsive prototype 12 days ago' }),
    field({ id: 'goals', label: 'Hackathon goals', type: 'textarea', placeholder: 'What role, team style, and deadline pressure fit you best?' })
  ];
}

function passwordFields() {
  return [
    field({ id: 'current', label: 'Current password', type: 'password' }),
    field({ id: 'new', label: 'New password', type: 'password' }),
    field({ id: 'confirm', label: 'Confirm new password', type: 'password' })
  ];
}

function privacyFields() {
  return [
    field({ id: 'discovery', label: 'Discovery visibility', options: ['Visible to verified teams', 'Visible to everyone', 'Hidden from search'] }),
    field({ id: 'proof', label: 'Proof sharing', options: ['Show previews publicly', 'Show after request', 'Show only after acceptance'] }),
    field({ id: 'resume', label: 'Resume access', options: ['Only accepted teams', 'Requesters with verified proof', 'Hidden'] }),
    field({ id: 'requests', label: 'Who can request collaboration', options: ['Verified teams only', 'Any builder', 'Saved teams only'] })
  ];
}

function dangerFields(action) {
  return [
    field({ id: 'impact', label: `Reason to ${action}`, type: 'textarea', placeholder: 'Document impact on team continuity and access.' }),
    field({ id: 'confirm', label: 'Type CONFIRM', placeholder: 'CONFIRM' })
  ];
}

export function teamPage(key) {
  const team = teams[0];
  return shell(key, `<section class="page">
    ${pageHead(key)}
    ${card(`<div class="command-strip">
      <div><span class="caption">${teamOperations.stage} - ${teamOperations.countdown}</span><h2>${team.name} is blocked by frontend ownership.</h2><p class="lede">The team can finish only if role gaps become owners, blockers become tasks, and request decisions happen before the pitch asset window.</p></div>
      <div class="actions"><a class="btn primary" href="${href('receivedRequests')}">Resolve blocker</a><a class="btn" href="${href('findBuddy')}">Find backup</a></div>
    </div>`, 'priority-card')}
    <div class="grid three">
      ${card(`${badge(team.urgency, 'warn')}<h3>${team.name}</h3><p class="caption">${team.mission}</p>${meter(team.readiness, `${team.readiness}% ready - ${teamOperations.blockers.length} active blockers`)}`)}
      ${card(`<h3>Readiness breakdown</h3>${teamOperations.readiness.map(([label, value, reason]) => `${meter(value, `${label}: ${value}%`)}<p class="caption">${reason}</p>`).join('')}`)}
      ${card(`${badge(team.deadline, 'info')}<h3>Collaboration contract</h3>${evidenceList(teamOperations.expectations)}<a class="btn" href="${href('teamChat')}">Open sprint chat</a>`)}
    </div>
    <div class="grid two">
      ${card(`<h3>Blockers and owners</h3><div class="table-list">${teamOperations.blockers.map(([title, status, copy]) => `<div class="list-row"><span><strong>${title}</strong><br><span class="caption">${copy}</span></span>${badge(status, status === 'Blocked' ? 'warn' : 'info')}</div>`).join('')}</div>`)}
      ${card(`<h3>Pending tasks</h3><div class="table-list">${teamOperations.tasks.map(([task, owner, due, impact]) => `<div class="list-row"><span><strong>${task}</strong><br><span class="caption">${owner} - ${impact}</span></span>${badge(due, due.includes('7') || due.includes('8') ? 'warn' : 'info')}</div>`).join('')}</div>`)}
    </div>
    <div class="grid two">
      ${card(`<h3>Invite pipeline</h3><div class="table-list">${teamOperations.invitePipeline.map(([name, status, role, confidence]) => `<div class="list-row"><span><strong>${name}</strong><br><span class="caption">${role} - ${status}</span></span>${badge(confidence, confidence.includes('High') ? 'ok' : confidence.includes('risk') ? 'warn' : 'info')}</div>`).join('')}</div>`)}
      ${card(`<h3>Recruiting momentum</h3><div class="timeline">${sprintPulse.map(([time, text, type]) => `<div class="event"><i></i><div><strong>${time} - ${type}</strong><p class="caption">${text}</p></div></div>`).join('')}</div>`)}
    </div>
  </section>`);
}

export function chatPage() {
  return shell('teamChat', `<section class="page">
    ${pageHead('teamChat')}
    <div class="profile-layout">
      <section class="card"><div class="card-body">
        <div class="table-list">${[
          ['Maya', 'I can own responsive UI and screenshots after API contract lands.', 'Frontend'],
          ['Arjun', 'I will ship the model endpoint with fallback data by midnight.', 'ML'],
          ['Nora', 'Pitch narrative is ready. Need final product screenshots by 8 PM.', 'Pitch'],
          ['You', 'Reviewing Maya request now. Frontend gap may close tonight.', 'Lead']
        ].map(([name, msg, tag]) => `<div class="list-row"><span><strong>${name}</strong><br><span class="caption">${msg}</span></span>${badge(tag, 'info')}</div>`).join('')}</div>
        <form class="form" data-demo-form>${field({ id: 'message', label: 'Sprint update', placeholder: 'Share blocker, decision, or shipped update', required: false })}<button class="btn primary" type="submit" data-next="${href('teamChat')}">Send update</button></form>
      </div></section>
      <aside class="card sticky-panel"><div class="card-body"><h3>Team context</h3>${meter(72, '72% ready')}<div class="tags">${badge('Frontend urgent', 'warn')}${badge('Demo 10 PM', 'info')}${badge('4 active', 'ok')}</div><a class="btn" href="${href('teamMembers')}">Members</a></div></aside>
    </div>
  </section>`);
}

export function settingsPage() {
  return shell('settings', `<section class="page">
    ${pageHead('settings')}
    <div class="profile-layout">
      <aside class="card sticky-panel"><div class="card-body"><h3>Account controls</h3><nav class="settings-nav">
        <a href="${href('editProfile')}">Profile trust</a>
        <a href="${href('privacy')}">Privacy and proof sharing</a>
        <a href="${href('password')}">Password</a>
        <a class="danger-link" href="${href('deleteAccount')}">Delete account</a>
      </nav></div></aside>
      <section class="grid two">
        ${card(`<h3>Profile trust</h3><p class="caption">Role, proof, availability, timezone, and collaboration style.</p><a class="btn" href="${href('editProfile')}">Update</a>`)}
        ${card(`<h3>Privacy</h3><p class="caption">Control resume access, proof previews, search visibility, and request permissions.</p><a class="btn" href="${href('privacy')}">Manage</a>`)}
        ${card(`<h3>Security</h3><p class="caption">Password and account access.</p><a class="btn" href="${href('password')}">Change password</a>`)}
        ${card(`<h3>Danger zone</h3><p class="caption">Deletion removes profile, proof visibility, saved teams, and request history.</p><a class="btn danger" href="${href('deleteAccount')}">Review deletion</a>`)}
      </section>
    </div>
  </section>`);
}

export function simplePage(key) {
  return shell(key, `<section class="page">
    ${pageHead(key)}
    <div class="grid three">${[
      ['Proof evidence', 'Show role contribution, source, stack, and recency.'],
      ['Compatibility context', 'Connect profile evidence to current team need.'],
      ['Next action', 'Move toward request, invite, or team readiness.']
    ].map(([title, copy]) => card(`<h3>${title}</h3><p class="caption">${copy}</p><a class="btn" href="${href('dashboard')}">Command center</a>`)).join('')}</div>
  </section>`);
}

export function networkPage() {
  return shell('network', `<section class="page">${pageHead('network')}<div class="grid three">${people.map(p => builderCard(p)).join('')}</div></section>`);
}

export function activityPage(key) {
  return shell(key, `<section class="page">${pageHead(key)}<div class="timeline">${activity.map((item, index) => `<div class="event"><i></i>${card(`<strong>${item}</strong><p class="caption">${index + 1}h ago - includes trust and team formation context.</p>`)}</div>`).join('')}</div></section>`);
}

export function savedPage(type) {
  return shell(type === 'teams' ? 'savedTeams' : 'savedUsers', `<section class="page">${pageHead(type === 'teams' ? 'savedTeams' : 'savedUsers')}<div class="grid three">${(type === 'teams' ? teams.map(t => teamCard(t)) : people.map(p => builderCard(p))).join('')}</div></section>`);
}

export function systemPage(key) {
  const states = {
    notFound: ['Page not found', 'Return to discovery or review active team needs.', 'Find builders'],
    loading: ['Building matches', 'Checking role gaps, proof recency, availability, and response reliability.', 'Open dashboard'],
    error: ['Action needs retry', 'Your request was not lost. Retry or continue from the command center.', 'Retry discovery'],
    success: ['Request sent', 'The invite includes role need, proof context, availability, and team deadline.', 'Track request'],
    empty: ['No strong matches yet', 'Broaden filters, add proof recency, or create a team so builders can find you.', 'Clear filters'],
    maintenance: ['Brief maintenance', 'Team formation, requests, and proof matching are being tuned.', 'Open dashboard']
  }[key];
  return `<div class="auth-wrap"><section class="card auth-card"><div class="card-body">
    <a class="brand" href="${href('landing')}"><img src="../assets/brand-mark.svg" alt=""><span>Hackathon Buddy</span></a>
    <h1>${states[0]}</h1><p class="lede">${states[1]}</p>
    <div class="actions"><a class="btn primary" href="${href('dashboard')}">${states[2]}</a><a class="btn" href="${href('findTeam')}">Find teams</a></div>
  </div></section></div>`;
}
