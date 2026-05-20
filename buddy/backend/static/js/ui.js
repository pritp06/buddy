import { nav, pageTitles, routes } from './data.js';

export const state = {
  filters: new Set(),
  sort: 'bestFit',
  query: '',
  roleNeed: localStorage.getItem('hb-role-need') || 'Frontend Engineer',
  requestStatus: JSON.parse(localStorage.getItem('hb-request-status') || '{}')
};

export function inPages() {
  return location.pathname.includes('/pages/');
}

export function href(key) {
  if (window.HB_DATA?.routes?.[key]) return window.HB_DATA.routes[key];
  const target = routes[key] || routes.dashboard;
  if (target === 'index.html') return inPages() ? '../index.html' : 'index.html';
  return inPages() ? target.replace('pages/', '') : target;
}

export function asset(path) {
  if (location.pathname !== '/' && !inPages() && path.startsWith('assets/')) return `/static/${path}`;
  return inPages() ? `../${path}` : path;
}

export function initials(name) {
  return name.split(' ').map(part => part[0]).join('').slice(0, 2);
}

export function titleFor(page) {
  return pageTitles[page] || ['Hackathon Buddy', 'Build trusted hackathon teams faster.'];
}

export function pageHead(key, action = '') {
  const [title, desc] = titleFor(key);
  return `
    <div class="page-head">
      <div>
        <h1>${title}</h1>
        <p class="lede">${desc}</p>
      </div>
      ${action}
    </div>
  `;
}

export function shell(page, content) {
  const active = activeNav(page);
  return `
    <div class="app-shell">
      <aside class="sidebar" aria-label="Primary navigation">
        <a class="brand" href="${href('dashboard')}"><img src="${asset('assets/brand-mark.svg')}" alt=""><span>Hackathon Buddy<small>Team formation OS</small></span></a>
        <nav class="nav">${nav.map(([key, label, icon]) => navLink(key, label, icon, active)).join('')}</nav>
        <div class="nav-cta">
          <a class="btn primary" href="${href('createTeam')}">Create team</a>
          <a class="btn" href="${href('collabRequest')}">Invite builder</a>
        </div>
      </aside>
      <main class="main" id="main">
        <header class="topbar">
          <a class="brand mobile-only" href="${href('dashboard')}"><img src="${asset('assets/brand-mark.svg')}" alt=""><span>HB</span></a>
          <div class="desktop-only"><strong>${titleFor(page)[0]}</strong></div>
          <div class="actions compact">
            <a class="icon-btn" aria-label="Notifications" title="Notifications" href="${href('notifications')}">!</a>
            <button class="icon-btn" aria-label="Toggle theme" title="Toggle theme" data-theme>T</button>
          </div>
        </header>
        ${content}
      </main>
    </div>
    <nav class="mobile-nav" aria-label="Mobile navigation">${nav.map(([key, label, icon]) => mobileNavLink(key, label, icon, active)).join('')}</nav>
  `;
}

function activeNav(page) {
  if (nav.some(([key]) => key === page)) return page;
  if (page.includes('team')) return 'teamDashboard';
  if (page.includes('request')) return 'receivedRequests';
  if (page.includes('user') || page.includes('buddy')) return 'findBuddy';
  return 'dashboard';
}

function navLink(key, label, icon, active) {
  return `<a class="${active === key ? 'active' : ''}" href="${href(key)}" ${active === key ? 'aria-current="page"' : ''}><span class="nav-icon">${icon}</span><span>${label}</span></a>`;
}

function mobileNavLink(key, label, icon, active) {
  return `<a class="${active === key ? 'active' : ''}" href="${href(key)}" ${active === key ? 'aria-current="page"' : ''}><span class="nav-icon">${icon}</span><span>${label}</span></a>`;
}

export function card(content, className = '') {
  return `<article class="card ${className}"><div class="card-body">${content}</div></article>`;
}

export function badge(text, tone = '') {
  return `<span class="badge ${tone}">${text}</span>`;
}

export function tags(items) {
  return `<div class="tags">${items.map(item => `<span class="pill">${item}</span>`).join('')}</div>`;
}

export function meter(value, label = '') {
  return `<div class="meter-wrap">${label ? `<div class="meta">${label}</div>` : ''}<div class="meter" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><span style="width:${value}%"></span></div></div>`;
}

export function evidenceList(items, limit = items.length) {
  return `<ul class="evidence-list">${items.slice(0, limit).map(item => `<li>${item}</li>`).join('')}</ul>`;
}

export function compatibilityRows(rows) {
  return `<div class="breakdown">${rows.map(([label, level, reason]) => `
    <div class="breakdown-row">
      <div><strong>${label}</strong><span>${reason}</span></div>
      ${badge(level, level === 'High' || level === 'Strong' ? 'ok' : level === 'Low' ? 'warn' : 'info')}
    </div>
  `).join('')}</div>`;
}

export function decisionGrid(rows, compact = false) {
  return `<div class="decision-grid ${compact ? 'compact-decision-grid' : ''}">${rows.map(([label, value]) => `
    <div class="decision-cell">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join('')}</div>`;
}

export function reasonStack(rows, limit = rows.length) {
  return `<div class="reason-stack">${rows.slice(0, limit).map(([label, value]) => `
    <div class="reason-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join('')}</div>`;
}

export function riskList(items) {
  return `<div class="risk-list">${items.map(item => `<span>${item}</span>`).join('')}</div>`;
}

export function actionRail(actions, id = '') {
  return `<div class="action-rail" role="group" aria-label="Decision actions">
    ${actions.map(action => `<button class="btn ${action === 'Decline' ? 'danger' : action === 'Accept with role' ? 'primary' : ''}" type="button" data-request-action="${action}" ${id ? `data-request-id="${id}"` : ''}>${action}</button>`).join('')}
  </div>`;
}

export function builderCard(person, mode = 'standard') {
  const proof = `${person.proofCount} verified projects`;
  const compact = mode === 'dense';
  return card(`
    <div class="scan-top">
      <div class="person-row">
        <div class="avatar" aria-hidden="true">${initials(person.name)}</div>
        <div>
          <strong>${person.name}</strong>
          <p class="caption">${person.role}</p>
        </div>
      </div>
      ${badge(`${person.trustScore}% trust`, person.trustScore >= 84 ? 'ok' : person.trustScore >= 72 ? 'info' : 'warn')}
    </div>
    ${tags(person.skills.slice(0, 4))}
    ${meter(person.score, `${person.score}% match - ${person.decision.decisionSummary}`)}
    ${decisionGrid([
      ['Proof', proof],
      ['Active', person.decision.activeNow],
      ['Schedule', person.availability],
      ['Completion', person.decision.completionRate]
    ], compact)}
    ${compact ? `<p class="caption">${person.decision.stackOverlap}</p>` : reasonStack(person.decisionReasons, 4)}
    ${compact ? '' : riskList(person.decision.riskFlags)}
    <div class="actions">
      <a class="btn primary" href="${href('collabRequest')}">Invite</a>
      <a class="btn" href="${href('userProfile')}">Review proof</a>
    </div>
  `, 'scan-card');
}

export function teamCard(team, mode = 'standard') {
  const compact = mode === 'dense';
  return card(`
    <div class="scan-top">
      <div class="person-row">
        <div class="avatar" aria-hidden="true">${initials(team.name)}</div>
        <div>
          <strong>${team.name}</strong>
          <p class="caption">${team.mission}</p>
        </div>
      </div>
      ${badge(team.urgency, team.urgency.includes('1 slot') || team.urgency.includes('6h') ? 'warn' : 'info')}
    </div>
    ${tags(team.skills)}
    ${meter(team.score, `${team.score}% fit - ${team.members} - ${team.openRoles[0]} blocks progress`)}
    ${decisionGrid([
      ['Deadline', team.deadline],
      ['Role gaps', team.openRoles.join(', ')],
      ['Readiness', `${team.readiness}% ready`],
      ['Recruiting', team.urgency]
    ], compact)}
    ${compact ? '' : reasonStack(team.decisionReasons)}
    <div class="actions">
      <a class="btn primary" href="${href('joinTeam')}">Request slot</a>
      <a class="btn" href="${href('teamDetails')}">Review team</a>
    </div>
  `, 'scan-card');
}

export function field({ id, label, type = 'text', placeholder = '', required = true, options = null }) {
  if (options) {
    return `
      <div class="field">
        <label for="${id}">${label}</label>
        <select class="select" id="${id}" name="${id}" ${required ? 'required' : ''} aria-describedby="${id}-error">
          <option value="">Choose...</option>
          ${options.map(option => `<option>${option}</option>`).join('')}
        </select>
        <span class="field-error" id="${id}-error" aria-live="polite"></span>
      </div>
    `;
  }
  const tag = type === 'textarea'
    ? `<textarea id="${id}" name="${id}" rows="4" ${required ? 'required' : ''} placeholder="${placeholder}" aria-describedby="${id}-error"></textarea>`
    : `<input class="input" id="${id}" name="${id}" type="${type}" ${required ? 'required' : ''} placeholder="${placeholder}" aria-describedby="${id}-error">`;
  return `<div class="field"><label for="${id}">${label}</label>${tag}<span class="field-error" id="${id}-error" aria-live="polite"></span></div>`;
}

export function trustSummary(entity) {
  const decision = entity.decision;
  return `
    <div class="trust-panel">
      ${badge(entity.verified ? 'Verification evidence available' : 'Verification incomplete', entity.verified ? 'ok' : 'info')}
      ${entity.proofCount ? badge(`${entity.proofCount} proof items`, 'info') : ''}
      ${entity.availabilityConfidence ? badge(`${entity.availabilityConfidence} availability confidence`, entity.availabilityConfidence === 'High' ? 'ok' : 'warn') : ''}
      ${entity.response ? badge(entity.response, 'info') : ''}
    </div>
    ${decision ? reasonStack([
      ['Verified by', decision.verificationSource],
      ['Proof checked by', decision.proofMethod],
      ['Reliability source', decision.reliabilitySource]
    ], 3) : ''}
  `;
}

export function formActions(primary = 'Save and continue', next = 'dashboard', danger = false) {
  return `<div class="actions"><button class="btn ${danger ? 'danger' : 'primary'}" type="submit" data-next="${href(next)}">${primary}</button><a class="btn" href="${href('dashboard')}">Cancel</a></div>`;
}
