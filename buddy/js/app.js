import { state } from './ui.js';
import {
  activityPage,
  authPage,
  chatPage,
  dashboardPage,
  detailPage,
  discoveryPage,
  formPage,
  landingPage,
  networkPage,
  onboardingPage,
  requestDetailsPage,
  requestListPage,
  savedPage,
  settingsPage,
  simplePage,
  systemPage,
  teamPage
} from './pages.js';

const systemPages = ['notFound', 'loading', 'error', 'success', 'empty', 'maintenance'];
const authPages = ['login', 'signup', 'forgot', 'verify'];
const onboardingPages = ['basic', 'skills', 'proof', 'resume', 'complete'];

function setTheme(theme) {
  document.documentElement.classList.toggle('light', theme === 'light');
  localStorage.setItem('hb-theme', theme);
}

function render() {
  const page = document.body.dataset.page || 'landing';
  let html = '';
  if (page === 'landing') html = landingPage();
  else if (authPages.includes(page)) html = authPage(page);
  else if (onboardingPages.includes(page)) html = onboardingPage(page);
  else if (page === 'dashboard') html = dashboardPage();
  else if (page === 'findTeam') html = discoveryPage('team');
  else if (page === 'teamResults') html = discoveryPage('team', true);
  else if (page === 'findBuddy') html = discoveryPage('person');
  else if (page === 'userResults') html = discoveryPage('person', true);
  else if (page === 'teamDetails') html = detailPage('team');
  else if (page === 'userProfile') html = detailPage('person');
  else if (page === 'requestDetails') html = requestDetailsPage();
  else if (['sentRequests', 'receivedRequests'].includes(page)) html = requestListPage(page);
  else if (['joinTeam', 'collabRequest', 'createTeam', 'editProfile', 'password', 'privacy'].includes(page)) html = formPage(page);
  else if (['deleteAccount', 'removeMember', 'transferLeadership'].includes(page)) html = formPage(page, true);
  else if (['teamDashboard', 'teamMembers', 'teamSettings'].includes(page)) html = teamPage(page);
  else if (page === 'teamChat') html = chatPage();
  else if (page === 'settings') html = settingsPage();
  else if (page === 'network') html = networkPage();
  else if (page === 'activity' || page === 'notifications') html = activityPage(page);
  else if (page === 'savedTeams') html = savedPage('teams');
  else if (page === 'savedUsers') html = savedPage('users');
  else if (systemPages.includes(page)) html = systemPage(page);
  else html = simplePage(page);

  let root = document.getElementById('app');
  if (!root) {
    root = document.createElement('div');
    root.id = 'app';
    document.body.append(root);
  }
  root.innerHTML = html;
  bind();
}

function bind() {
  document.querySelectorAll('[data-theme]').forEach(button => {
    button.addEventListener('click', () => setTheme(document.documentElement.classList.contains('light') ? 'dark' : 'light'));
  });

  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      if (document.body.dataset.csrf) {
        if (!validateForm(form)) {
          event.preventDefault();
          return;
        }
        form.method = 'post';
        form.action = form.action || location.pathname;
        if (!form.querySelector('input[name="csrfmiddlewaretoken"]')) {
          const csrf = document.createElement('input');
          csrf.type = 'hidden';
          csrf.name = 'csrfmiddlewaretoken';
          csrf.value = document.body.dataset.csrf;
          form.append(csrf);
        }
        return;
      }
      event.preventDefault();
      if (!validateForm(form)) return;
      const next = event.submitter?.dataset?.next || 'pages/dashboard.html';
      location.href = next;
    });
  });

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      if (state.filters.has(filter)) state.filters.delete(filter);
      else state.filters.add(filter);
      render();
    });
  });

  const search = document.querySelector('[data-search]');
  if (search) {
    search.addEventListener('input', event => {
      state.query = event.target.value;
      render();
    });
  }

  const sort = document.querySelector('[data-sort]');
  if (sort) {
    sort.addEventListener('change', event => {
      state.sort = event.target.value;
      render();
    });
  }

  document.querySelectorAll('[data-clear-filters]').forEach(button => {
    button.addEventListener('click', () => {
      state.filters.clear();
      state.query = '';
      render();
    });
  });

  document.querySelectorAll('[data-role-need]').forEach(button => {
    button.addEventListener('click', () => {
      state.roleNeed = button.dataset.roleNeed;
      localStorage.setItem('hb-role-need', state.roleNeed);
      render();
    });
  });

  document.querySelectorAll('[data-request-action]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.requestId || 'request';
      const action = button.dataset.requestAction;
      state.requestStatus[id] = action;
      localStorage.setItem('hb-request-status', JSON.stringify(state.requestStatus));
      button.textContent = `${action} saved`;
      button.setAttribute('aria-live', 'polite');
      button.classList.add('saved');
    });
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('input, textarea, select').forEach(control => {
    const error = document.getElementById(`${control.id}-error`);
    const empty = control.hasAttribute('required') && !control.value.trim();
    control.setAttribute('aria-invalid', empty ? 'true' : 'false');
    if (error) error.textContent = empty ? 'This signal is required for reliable matching.' : '';
    if (empty) valid = false;
  });
  if (!valid) form.querySelector('[aria-invalid="true"]')?.focus();
  return valid;
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme(localStorage.getItem('hb-theme') || 'dark');
  render();
});
