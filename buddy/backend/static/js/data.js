// Check for data injected by Django
const HB_DATA = window.HB_DATA || {};

export const routes = HB_DATA.routes || {
  landing: '/',
  login: '/accounts/login/',
  signup: '/accounts/signup/',
  forgot: '/accounts/password-reset/',
  verify: '/accounts/verify/',
  basic: '/onboarding/basic/',
  skills: '/onboarding/skills/',
  proof: '/onboarding/proof/',
  resume: '/onboarding/resume/',
  complete: '/onboarding/complete/',
  dashboard: '/dashboard/',
  notifications: '/notifications/',
  activity: '/activity/',
  network: '/network/',
  findTeam: '/discovery/teams/',
  teamResults: '/discovery/teams/results/',
  teamDetails: '/discovery/teams/details/',
  joinTeam: '/requests/join/',
  findBuddy: '/discovery/builders/',
  userResults: '/discovery/builders/results/',
  userProfile: '/users/profile/',
  collabRequest: '/requests/invite/',
  editProfile: '/users/edit/',
  portfolio: '/users/portfolio/',
  resumePreview: '/users/resume/',
  sentRequests: '/requests/sent/',
  receivedRequests: '/requests/received/',
  requestDetails: '/requests/details/',
  createTeam: '/teams/create/',
  teamDashboard: '/teams/dashboard/',
  teamMembers: '/teams/members/',
  teamSettings: '/teams/settings/',
  removeMember: '/teams/remove/',
  transferLeadership: '/teams/transfer/',
  teamChat: '/chat/',
  savedTeams: '/saved/teams/',
  savedUsers: '/saved/users/',
  settings: '/users/settings/',
  password: '/accounts/password-change/',
  privacy: '/users/privacy/',
  deleteAccount: '/accounts/delete/',
  notFound: '/page/404/',
  loading: '/page/loading/',
  error: '/page/error/',
  success: '/page/success/',
  empty: '/page/empty/',
  maintenance: '/page/maintenance/'
};

export const pageTitles = HB_DATA.pageTitles || {
  dashboard: ['Command center', 'Requests, role gaps, team readiness, and next actions for forming a hackathon team fast.'],
  notifications: ['Notifications', 'Team formation signals, request movement, and proof updates that need attention.'],
  activity: ['Activity feed', 'Live-looking collaboration momentum from teammates, teams, and requests.'],
  network: ['Trusted network', 'Builders you can invite quickly because their proof, reliability, and fit are already known.'],
  findTeam: ['Find a team', 'Search active teams by role urgency, proof requirements, hackathon timing, and compatibility.'],
  teamResults: ['Team search results', 'Compare recruiting teams by missing roles, readiness, urgency, and trust evidence.'],
  teamDetails: ['Team details', 'Evaluate mission, role gaps, member proof, sprint readiness, and join fit.'],
  joinTeam: ['Join team request', 'Explain the missing role you fill, your proof, sprint availability, and collaboration fit.'],
  findBuddy: ['Find a buddy', 'Search verified builders by role, stack, proof, timezone, availability, and compatibility.'],
  userResults: ['Builder search results', 'Fast-scan builder cards with explainable match evidence.'],
  userProfile: ['Builder trust profile', 'Proof, compatibility, availability, and collaboration evidence for a safe request decision.'],
  collabRequest: ['Invite builder', 'Send a focused invite with role need, sprint context, and why the builder fits.'],
  editProfile: ['Edit profile', 'Keep role fit, availability, proof, and collaboration preferences current.'],
  portfolio: ['Proof workspace', 'Contribution-focused project evidence for team formation decisions.'],
  resumePreview: ['Resume preview', 'Concise resume evidence that supports credibility without becoming a portfolio site.'],
  sentRequests: ['Sent requests', 'Track request status, urgency, and follow-up actions.'],
  receivedRequests: ['Received requests', 'Review role fit, compatibility, proof, availability, and team impact before deciding.'],
  requestDetails: ['Request decision room', 'A decision-grade view of fit, proof, availability, and expected team impact.'],
  createTeam: ['Create team', 'Define mission, hackathon deadline, missing roles, proof expectations, and sprint cadence.'],
  teamDashboard: ['Team dashboard', 'Readiness, missing roles, member reliability, blockers, and sprint momentum.'],
  teamMembers: ['Team members', 'Role ownership, availability confidence, proof, and collaboration coverage.'],
  teamSettings: ['Team settings', 'Manage recruiting visibility, role requirements, proof standards, and request controls.'],
  removeMember: ['Remove member', 'Review impact before removing a teammate from the sprint workspace.'],
  transferLeadership: ['Transfer leadership', 'Move ownership with role continuity and confirmation.'],
  teamChat: ['Team chat', 'Sprint-focused collaboration with role context and blockers visible.'],
  savedTeams: ['Saved teams', 'Teams you are comparing by role need, deadline, and compatibility.'],
  savedUsers: ['Saved builders', 'Builders ready for targeted invites when a role gap opens.'],
  settings: ['Settings', 'Profile trust, privacy, notifications, security, and account controls.'],
  password: ['Change password', 'Update credentials with clear security feedback.'],
  privacy: ['Privacy settings', 'Control discovery visibility, proof sharing, resume access, and request permissions.'],
  deleteAccount: ['Delete account', 'Permanent deletion with clear consequences and confirmation.']
};

export const nav = HB_DATA.nav || [
  ['dashboard', 'Home', 'D'],
  ['findBuddy', 'Builders', 'B'],
  ['findTeam', 'Teams', 'T'],
  ['receivedRequests', 'Requests', 'R'],
  ['teamDashboard', 'Team', 'M']
];

export const people = HB_DATA.people || [
  {
    id: 'maya',
    name: 'Maya Chen',
    role: 'Frontend Engineer',
    skills: ['React', 'WebGL', 'UI Systems', 'Tailwind'],
    score: 94,
    verified: true,
    availability: 'Weekend sprint confirmed',
    availabilityConfidence: 'High',
    timezone: 'UTC-5, 5h overlap',
    response: 'Usually responds in 2h',
    active: 'Active 2 days ago',
    history: '6 hackathons, 2 finalist teams',
    proofCount: 3,
    filters: ['verified', 'available', 'proof', 'highMatch', 'response'],
    evidence: [
      'Verified through GitHub, project demo, and teammate reference',
      'Frontend Stack Match: React + design systems',
      'Weekend availability matches your sprint window',
      '3 recent projects, newest shipped 12 days ago'
    ],
    compatibility: [
      ['Role fit', 'High', 'Fills the open frontend ownership gap'],
      ['Stack overlap', 'High', 'React, UI systems, API integration'],
      ['Availability', 'High', 'Confirmed Sat-Sun sprint block'],
      ['Collaboration style', 'Strong', 'Async updates plus fast design review cycles']
    ],
    projects: [
      ['Realtime voting app', 'Frontend lead', 'React, WebSocket', 'Shipped 12 days ago'],
      ['Sponsor analytics demo', 'UI systems', 'React, Charts', 'Shipped 1 month ago'],
      ['Hackathon auth starter', 'Design implementation', 'React, Firebase', 'Updated 3 weeks ago']
    ],
    goals: 'Owns interface polish, responsive flows, and demo-ready product surfaces.'
  },
  {
    id: 'arjun',
    name: 'Arjun Mehta',
    role: 'ML Builder',
    skills: ['Python', 'RAG', 'APIs', 'Flask'],
    score: 89,
    verified: true,
    availability: 'Open to 48h sprint',
    availabilityConfidence: 'High',
    timezone: 'UTC+5:30, 4h overlap',
    response: 'Usually responds in 4h',
    active: 'Active today',
    history: '4 hackathons, 1 winner',
    proofCount: 4,
    filters: ['verified', 'available', 'proof', 'highMatch', 'response'],
    evidence: [
      'Verified GitHub contributions and hosted demos',
      'Shared Tech Stack: Flask + API integrations',
      'ML prototype history in time-boxed sprints',
      'Availability confirmed for the full hackathon window'
    ],
    compatibility: [
      ['Role fit', 'High', 'Covers model endpoint and retrieval prototype'],
      ['Stack overlap', 'Medium', 'Python APIs complement React frontend'],
      ['Availability', 'High', 'Can cover overnight async handoffs'],
      ['Collaboration style', 'Strong', 'Prefers small specs and quick checkpoints']
    ],
    projects: [
      ['RAG support bot', 'ML/API owner', 'Python, Flask', 'Shipped 9 days ago'],
      ['Resume parser', 'Model integration', 'Python, OCR', 'Updated 2 weeks ago'],
      ['Carbon forecast demo', 'Data pipeline', 'Pandas, APIs', 'Shipped 2 months ago']
    ],
    goals: 'Builds pragmatic ML prototypes that can be demoed quickly.'
  }
];

export const teams = HB_DATA.teams || [
  {
    id: 'carbonloop',
    name: 'CarbonLoop',
    mission: 'Climate API sprint',
    skills: ['Frontend', 'ML', 'APIs'],
    score: 91,
    verified: true,
    members: '3/5 members',
    urgency: 'Need frontend in 6h',
    deadline: 'Demo in 2 days',
    readiness: 72,
    openRoles: ['Frontend Engineer', 'ML Builder'],
    filters: ['verified', 'available', 'missingRole', 'highMatch', 'urgent'],
    evidence: [
      'Verified team lead and shipped demo history',
      '2 open roles with clear ownership',
      'React frontend and Flask API planned',
      'Daily standup cadence already active'
    ],
    compatibility: [
      ['Missing role fit', 'High', 'Your frontend skills fill a blocker'],
      ['Stack overlap', 'High', 'React + Flask sprint plan'],
      ['Availability', 'High', 'Weekend sprint confirmed'],
      ['Team readiness', 'Medium', 'Core idea ready, UI and ML gap remain']
    ]
  }
];

export const requests = HB_DATA.requests || [
  {
    id: 'req-maya',
    personId: 'maya',
    teamId: 'carbonloop',
    status: 'Needs review',
    urgency: 'Decision needed before 8 PM',
    message: 'I can own the frontend flow, responsive polish, and demo screenshots. I have React proof from recent sprint projects and can commit both weekend days.',
    roleFit: 'Fills the open Frontend Engineer role',
    teamImpact: 'Raises CarbonLoop readiness from 72% to 88% by closing the UI ownership gap.',
    goals: ['Own landing-to-demo user flow', 'Build responsive product screens', 'Prepare final screenshots for pitch'],
    risks: ['Needs API contract by tonight', 'Can only pair live after 6 PM UTC-5']
  }
];

export const deadlines = HB_DATA.deadlines || [
  ['HackMIT Sprint', 'Registration closes in 9h', 'Profile ready'],
  ['Climate Build', 'Demo in 2 days', 'CarbonLoop needs 2 roles'],
  ['Civic Tech Jam', 'Team lock in 18h', '3 verified teams recruiting']
];

export const activity = HB_DATA.activity || [
  'Maya requested to join CarbonLoop with frontend proof attached',
  'CarbonLoop marked Frontend as urgent',
  'Your profile reached 82% completion',
  'CivicStack saved your builder profile',
  'Arjun updated API proof 9 days ago'
];

export const trustStandards = HB_DATA.trustStandards || [
  ['Source verified', 'GitHub ownership, live demo, teammate reference, or organizer note is attached.'],
  ['Role proven', 'The proof states what the builder personally owned, not only what the team shipped.'],
  ['Recent enough', 'Recent work is weighted higher because hackathon execution speed decays quickly.'],
  ['Schedule confirmed', 'Availability is treated as a commitment window, not a general preference.'],
  ['Reliability visible', 'Response speed and completion history affect whether a request is safe.']
];

export const profileCompletion = HB_DATA.profileCompletion || {
  score: 82,
  blockers: [
    ['Proof recency missing', 'Add one project shipped in the last 30 days to raise match confidence.'],
    ['Timezone overlap incomplete', 'Teams cannot safely plan handoffs without overlap windows.']
  ],
  next: 'Add recent proof before sending high-value requests'
};

export const sprintPulse = HB_DATA.sprintPulse || [
  ['Now', 'Maya request can close the frontend blocker', 'Decision'],
  ['18m ago', 'CarbonLoop changed frontend role to urgent', 'Team'],
  ['42m ago', 'Arjun uploaded Flask endpoint proof', 'Proof'],
  ['1h ago', 'CivicStack opened backend slot', 'Discovery'],
  ['2h ago', '3 verified builders became available this weekend', 'Market']
];

export const requestPipeline = HB_DATA.requestPipeline || [
  ['Needs decision', 2, 'Maya and Arjun can close active blockers'],
  ['Shortlisted', 3, 'Awaiting quick-sync confirmation'],
  ['Proof requested', 1, 'Backend proof pending from Leo'],
  ['Accepted', 2, 'Members assigned to sprint roles']
];

export const teamOperations = HB_DATA.teamOperations || {
  stage: 'Build sprint',
  countdown: '41h to demo',
  blockers: [
    ['Frontend ownership', 'Blocked', 'No one owns responsive demo flow until Maya is accepted.'],
    ['ML fallback data', 'At risk', 'Arjun can cover if scope stays narrow.'],
    ['Pitch screenshots', 'Waiting', 'Needs final UI by 8 PM.']
  ],
  readiness: [
    ['Role coverage', 60, '2 of 5 roles are still open'],
    ['Proof confidence', 78, 'Lead and backend proof verified; ML proof pending'],
    ['Availability coverage', 72, 'Weekend coverage strong, timezone handoff needs planning'],
    ['Execution plan', 68, 'Demo path exists but frontend blocker slows pitch assets']
  ],
  tasks: [
    ['Define API contract', 'You', 'Due 7 PM', 'Blocks frontend and ML parallel work'],
    ['Accept or shortlist frontend', 'Team lead', 'Due 8 PM', 'Raises readiness by 16 points'],
    ['Prepare fallback dataset', 'Arjun', 'Due midnight', 'Protects demo reliability'],
    ['Capture product screenshots', 'Nora', 'Due tomorrow 10 AM', 'Needed for final pitch']
  ],
  invitePipeline: [
    ['Maya Chen', 'Decision room open', 'Frontend', 'High confidence'],
    ['Arjun Mehta', 'Shortlist suggested', 'ML', 'Scope risk'],
    ['Leo Park', 'Request proof', 'Backend', 'Availability unclear']
  ],
  expectations: [
    'Async update every 3 hours during build sprint',
    'Each owner posts blocker before switching tasks',
    'Demo-critical work gets proof or screenshot by handoff'
  ]
};

export const notificationPriority = HB_DATA.notificationPriority || [
  ['Critical', 'Maya can close frontend blocker before 8 PM', 'Open decision room'],
  ['High', 'CarbonLoop readiness dropped because screenshots are blocked', 'Review team'],
  ['Medium', 'Nora asked for final UI screenshot timing', 'Open chat'],
  ['Low', 'CivicStack saved your profile', 'View network']
];

export const onboardingGuidance = HB_DATA.onboardingGuidance || {
  basic: 'Teams use this to check whether you fit the missing role and sprint schedule.',
  skills: 'Stack confidence tells teams whether you can own work or need pairing.',
  proof: 'Proof is weighted only when role, source, recency, and ownership are clear.',
  resume: 'History and response speed reduce the risk of accepting an unreliable teammate.',
  complete: 'Visibility controls decide who can evaluate your proof before sending requests.'
};

const decisionProfiles = HB_DATA.decisionProfiles || {
  maya: {
    verificationSource: 'GitHub repo ownership + live Vercel demo + teammate reference from HackMIT 2025',
    proofMethod: 'Repository commit history matched to live demo and role note',
    contributionRole: 'Owned responsive React UI, screenshot-ready demo flow, and design-system cleanup',
    projectOwnership: 'Primary owner on 2 of 3 proof projects',
    stackOverlap: 'React UI systems match CarbonLoop frontend gap; API handoff experience covers Flask contract',
    scheduleOverlap: 'Sat-Sun confirmed, 6 PM-1 AM UTC-5 live pairing, async updates every 3h',
    collaborationFit: 'Works best with API contract and fast async critique loops',
    reliabilitySource: '6 prior teammate references; 80% previous team completion rate',
    completionRate: '80%',
    activeNow: 'Active 24m ago',
    executionConfidence: 91,
    decisionSummary: 'Safest frontend add because proof, schedule, and role ownership directly match the blocker.',
    riskFlags: ['Needs API contract before starting', 'Live pairing begins after 6 PM UTC-5'],
    commitment: 'Can own frontend from request acceptance through demo screenshots'
  }
};

if (!HB_DATA.people) {
    people.forEach(person => {
      person.decision = decisionProfiles[person.id] || {};
      person.trustScore = Math.round((person.score * 0.45) + ((person.decision.executionConfidence || 60) * 0.35) + ((person.verified ? 100 : 55) * 0.2));
      person.decisionReasons = [
        ['Verification source', person.decision.verificationSource],
        ['Proof method', person.decision.proofMethod],
        ['Contribution role', person.decision.contributionRole],
        ['Schedule overlap', person.decision.scheduleOverlap],
        ['Reliability source', person.decision.reliabilitySource]
      ];
    });
}

if (!HB_DATA.teams) {
    teams.forEach(team => {
      team.readinessBreakdown = teamOperations.readiness;
      team.blockers = teamOperations.blockers;
      team.invitePipeline = teamOperations.invitePipeline;
      team.operations = teamOperations;
      team.decisionReasons = [
        ['Role urgency', team.urgency],
        ['Deadline fit', team.deadline],
        ['Missing role coverage', team.openRoles.join(', ')],
        ['Readiness risk', `${team.readiness}% ready with ${team.openRoles.length} open role gaps`]
      ];
    });
}

if (!HB_DATA.requests) {
    requests.forEach(req => {
      const person = people.find(p => p.id === req.personId) || { decision: {} };
      const team = teams.find(t => t.id === req.teamId) || { compatibility: [['']] };
      req.executionConfidence = person.decision.executionConfidence || 60;
      req.sprintCommitment = person.decision.commitment;
      req.communication = person.decision.collaborationFit;
      req.timezoneCompatibility = person.decision.scheduleOverlap;
      req.proofPreview = (person.projects || []).slice(0, 2);
      req.decisionChecks = [
        ['Missing role coverage', req.roleFit],
        ['Execution confidence', `${req.executionConfidence}% based on proof ownership and completion history`],
        ['Sprint commitment', req.sprintCommitment],
        ['Team impact preview', req.teamImpact],
        ['Compatibility to current team', team.compatibility[0][2]]
      ];
      req.intermediateActions = ['Shortlist', 'Ask question', 'Request proof', 'Schedule quick sync', 'Save for review'];
    });
}
