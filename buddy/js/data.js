export const routes = {
  landing: 'index.html',
  login: 'pages/login.html',
  signup: 'pages/signup.html',
  forgot: 'pages/forgot-password.html',
  verify: 'pages/email-verification.html',
  basic: 'pages/onboarding-basic.html',
  skills: 'pages/onboarding-skills.html',
  proof: 'pages/onboarding-proof.html',
  resume: 'pages/onboarding-resume.html',
  complete: 'pages/onboarding-complete.html',
  dashboard: 'pages/dashboard.html',
  notifications: 'pages/notifications.html',
  activity: 'pages/activity.html',
  network: 'pages/network.html',
  findTeam: 'pages/find-team.html',
  teamResults: 'pages/team-results.html',
  teamDetails: 'pages/team-details.html',
  joinTeam: 'pages/join-team-request.html',
  findBuddy: 'pages/find-buddy.html',
  userResults: 'pages/user-results.html',
  userProfile: 'pages/user-profile.html',
  collabRequest: 'pages/collaboration-request.html',
  editProfile: 'pages/edit-profile.html',
  portfolio: 'pages/portfolio.html',
  resumePreview: 'pages/resume-preview.html',
  sentRequests: 'pages/sent-requests.html',
  receivedRequests: 'pages/received-requests.html',
  requestDetails: 'pages/request-details.html',
  createTeam: 'pages/create-team.html',
  teamDashboard: 'pages/team-dashboard.html',
  teamMembers: 'pages/team-members.html',
  teamSettings: 'pages/team-settings.html',
  removeMember: 'pages/remove-member.html',
  transferLeadership: 'pages/transfer-leadership.html',
  teamChat: 'pages/team-chat.html',
  savedTeams: 'pages/saved-teams.html',
  savedUsers: 'pages/saved-users.html',
  settings: 'pages/settings.html',
  password: 'pages/change-password.html',
  privacy: 'pages/privacy-settings.html',
  deleteAccount: 'pages/delete-account.html',
  notFound: 'pages/404.html',
  loading: 'pages/loading.html',
  error: 'pages/error.html',
  success: 'pages/success.html',
  empty: 'pages/empty.html',
  maintenance: 'pages/maintenance.html'
};

export const pageTitles = {
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

export const nav = [
  ['dashboard', 'Home', 'D'],
  ['findBuddy', 'Builders', 'B'],
  ['findTeam', 'Teams', 'T'],
  ['receivedRequests', 'Requests', 'R'],
  ['teamDashboard', 'Team', 'M']
];

export const people = [
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
  },
  {
    id: 'nora',
    name: 'Nora Smith',
    role: 'Product Designer',
    skills: ['Figma', 'UX Research', 'Brand', 'Pitch'],
    score: 86,
    verified: true,
    availability: 'Available now',
    availabilityConfidence: 'Medium',
    timezone: 'UTC+0, 6h overlap',
    response: 'Usually responds in 1h',
    active: 'Active today',
    history: '5 hackathons, 3 demo awards',
    proofCount: 5,
    filters: ['verified', 'available', 'proof', 'highMatch', 'response'],
    evidence: [
      'Verified through Figma prototype and demo recordings',
      'Complements engineering-heavy teams',
      'Pitch and product narrative experience',
      'Recent design system project shipped 6 days ago'
    ],
    compatibility: [
      ['Role fit', 'High', 'Covers UX, story, and demo clarity'],
      ['Stack overlap', 'Medium', 'Works closely with React teams'],
      ['Availability', 'Medium', 'Confirmed launch day and final polish block'],
      ['Collaboration style', 'Strong', 'Fast critique and decision framing']
    ],
    projects: [
      ['Fintech onboarding prototype', 'Product design', 'Figma', 'Shipped 6 days ago'],
      ['Healthcare triage pitch', 'Story lead', 'Slides, UX', 'Shipped 1 month ago'],
      ['Developer tool brand kit', 'Visual systems', 'Figma', 'Updated 3 weeks ago']
    ],
    goals: 'Turns rough ideas into understandable demos and strong judging narratives.'
  },
  {
    id: 'leo',
    name: 'Leo Park',
    role: 'Backend Engineer',
    skills: ['Node', 'Postgres', 'Auth', 'Queues'],
    score: 82,
    verified: false,
    availability: 'Needs fintech team',
    availabilityConfidence: 'Medium',
    timezone: 'UTC-8, 3h overlap',
    response: 'Usually responds same day',
    active: 'Active 4 days ago',
    history: '3 hackathons',
    proofCount: 2,
    filters: ['proof'],
    evidence: [
      'GitHub linked; teammate reference pending',
      'Backend role fit for auth and data modeling',
      'Two projects show production-like API structure',
      'Availability needs confirmation before request'
    ],
    compatibility: [
      ['Role fit', 'High', 'Useful if backend ownership is missing'],
      ['Stack overlap', 'Medium', 'Node API experience fits JS teams'],
      ['Availability', 'Medium', 'Interested but not fully confirmed'],
      ['Collaboration style', 'Moderate', 'Prefers documented handoff points']
    ],
    projects: [
      ['Auth starter API', 'Backend owner', 'Node, Postgres', 'Updated 1 month ago'],
      ['Queue dashboard', 'API design', 'Node, Redis', 'Shipped 3 months ago']
    ],
    goals: 'Builds reliable API foundations for teams that need backend confidence.'
  },
  {
    id: 'sam',
    name: 'Sam Rivera',
    role: 'Full Stack Engineer',
    skills: ['JS', 'Firebase', 'DevOps', 'Next.js'],
    score: 78,
    verified: true,
    availability: 'Remote only',
    availabilityConfidence: 'Medium',
    timezone: 'UTC-6, 5h overlap',
    response: 'Usually responds in 3h',
    active: 'Active yesterday',
    history: '7 hackathons',
    proofCount: 6,
    filters: ['verified', 'proof', 'response'],
    evidence: [
      'Verified GitHub and hosted deployments',
      'Full-stack fallback for small teams',
      'Remote-only constraint needs team alignment',
      'Strong deployment history during demos'
    ],
    compatibility: [
      ['Role fit', 'Medium', 'Best for teams needing flexible execution'],
      ['Stack overlap', 'Medium', 'JS and Firebase overlap'],
      ['Availability', 'Medium', 'Remote-only but responsive'],
      ['Collaboration style', 'Strong', 'Good at unblocking deployment issues']
    ],
    projects: [
      ['Demo deployment kit', 'DevOps owner', 'Vercel, Firebase', 'Updated 8 days ago'],
      ['Study workspace', 'Full stack', 'Next.js, Firebase', 'Shipped 2 months ago']
    ],
    goals: 'Helps teams get from prototype to deployed demo.'
  },
  {
    id: 'iris',
    name: 'Iris Novak',
    role: 'Pitch Lead',
    skills: ['Storytelling', 'Market', 'Decks', 'Demo Script'],
    score: 74,
    verified: false,
    availability: 'Open',
    availabilityConfidence: 'Low',
    timezone: 'UTC+1, 4h overlap',
    response: 'Usually responds same day',
    active: 'Active 5 days ago',
    history: '2 hackathons',
    proofCount: 1,
    filters: [],
    evidence: [
      'Pitch deck proof linked; verification pending',
      'Useful for teams with weak narrative',
      'Availability not fully confirmed',
      'Best fit after product direction is stable'
    ],
    compatibility: [
      ['Role fit', 'Medium', 'Useful for final presentation phase'],
      ['Stack overlap', 'Low', 'Non-technical complement'],
      ['Availability', 'Low', 'Needs confirmation'],
      ['Collaboration style', 'Medium', 'Best with clear product brief']
    ],
    projects: [
      ['Civic data pitch', 'Pitch owner', 'Slides', 'Shipped 2 months ago']
    ],
    goals: 'Makes technical projects easier for judges to understand.'
  }
];

export const teams = [
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
  },
  {
    id: 'civicstack',
    name: 'CivicStack',
    mission: 'Govtech workflow builder',
    skills: ['Designer', 'Backend', 'Postgres'],
    score: 88,
    verified: true,
    members: '2/4 members',
    urgency: 'Designer needed today',
    deadline: 'Submission in 36h',
    readiness: 64,
    openRoles: ['Product Designer', 'Backend Engineer'],
    filters: ['verified', 'available', 'missingRole', 'urgent'],
    evidence: [
      'Team lead verified through previous finalist project',
      'Clear civic workflow problem statement',
      'Needs UX mapping before build accelerates',
      'Async collaboration already started'
    ],
    compatibility: [
      ['Missing role fit', 'High', 'Designer/backend roles are explicit'],
      ['Stack overlap', 'Medium', 'Postgres and workflow UI'],
      ['Availability', 'Medium', 'Needs immediate response'],
      ['Team readiness', 'Medium', 'Problem strong, prototype early']
    ]
  },
  {
    id: 'medsignal',
    name: 'MedSignal',
    mission: 'Healthcare triage prototype',
    skills: ['Mobile', 'Pitch', 'Data'],
    score: 84,
    verified: true,
    members: '4/5 members',
    urgency: '1 slot left',
    deadline: 'Demo in 18h',
    readiness: 82,
    openRoles: ['Pitch Lead'],
    filters: ['verified', 'available', 'missingRole', 'urgent'],
    evidence: [
      'Verified clinical mentor note',
      'One remaining pitch/story role',
      'Prototype partially working',
      'High deadline pressure'
    ],
    compatibility: [
      ['Missing role fit', 'Medium', 'Best for story or mobile support'],
      ['Stack overlap', 'Medium', 'Data and mobile prototype'],
      ['Availability', 'High', 'Final push window is active'],
      ['Team readiness', 'High', 'Nearly complete team']
    ]
  },
  {
    id: 'chainproof',
    name: 'ChainProof',
    mission: 'Credential verification',
    skills: ['Smart Contracts', 'UX'],
    score: 80,
    verified: false,
    members: '3/4 members',
    urgency: 'UX gap open',
    deadline: 'Demo in 3 days',
    readiness: 58,
    openRoles: ['UX Designer'],
    filters: ['missingRole'],
    evidence: [
      'Project repo linked, team verification incomplete',
      'Needs UX clarity for credential flow',
      'Smart contract proof exists',
      'Member availability partially confirmed'
    ],
    compatibility: [
      ['Missing role fit', 'Medium', 'UX role needed'],
      ['Stack overlap', 'Low', 'Web3-specific stack'],
      ['Availability', 'Medium', 'Deadline allows onboarding'],
      ['Team readiness', 'Medium', 'Technical proof ahead of product clarity']
    ]
  }
];

export const requests = [
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
  },
  {
    id: 'req-arjun',
    personId: 'arjun',
    teamId: 'carbonloop',
    status: 'High fit',
    urgency: 'Useful if ML scope remains',
    message: 'I can prototype the forecast endpoint and keep it simple enough for demo reliability.',
    roleFit: 'Covers the ML Builder gap',
    teamImpact: 'Adds model credibility but depends on data scope remaining small.',
    goals: ['Own forecast endpoint', 'Document API contract', 'Prepare fallback demo data'],
    risks: ['Timezone overlap needs planning']
  }
];

export const deadlines = [
  ['HackMIT Sprint', 'Registration closes in 9h', 'Profile ready'],
  ['Climate Build', 'Demo in 2 days', 'CarbonLoop needs 2 roles'],
  ['Civic Tech Jam', 'Team lock in 18h', '3 verified teams recruiting']
];

export const activity = [
  'Maya requested to join CarbonLoop with frontend proof attached',
  'CarbonLoop marked Frontend as urgent',
  'Your profile reached 82% completion',
  'CivicStack saved your builder profile',
  'Arjun updated API proof 9 days ago'
];

export const trustStandards = [
  ['Source verified', 'GitHub ownership, live demo, teammate reference, or organizer note is attached.'],
  ['Role proven', 'The proof states what the builder personally owned, not only what the team shipped.'],
  ['Recent enough', 'Recent work is weighted higher because hackathon execution speed decays quickly.'],
  ['Schedule confirmed', 'Availability is treated as a commitment window, not a general preference.'],
  ['Reliability visible', 'Response speed and completion history affect whether a request is safe.']
];

export const profileCompletion = {
  score: 82,
  blockers: [
    ['Proof recency missing', 'Add one project shipped in the last 30 days to raise match confidence.'],
    ['Timezone overlap incomplete', 'Teams cannot safely plan handoffs without overlap windows.']
  ],
  next: 'Add recent proof before sending high-value requests'
};

export const sprintPulse = [
  ['Now', 'Maya request can close the frontend blocker', 'Decision'],
  ['18m ago', 'CarbonLoop changed frontend role to urgent', 'Team'],
  ['42m ago', 'Arjun uploaded Flask endpoint proof', 'Proof'],
  ['1h ago', 'CivicStack opened backend slot', 'Discovery'],
  ['2h ago', '3 verified builders became available this weekend', 'Market']
];

export const requestPipeline = [
  ['Needs decision', 2, 'Maya and Arjun can close active blockers'],
  ['Shortlisted', 3, 'Awaiting quick-sync confirmation'],
  ['Proof requested', 1, 'Backend proof pending from Leo'],
  ['Accepted', 2, 'Members assigned to sprint roles']
];

export const teamOperations = {
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

export const notificationPriority = [
  ['Critical', 'Maya can close frontend blocker before 8 PM', 'Open decision room'],
  ['High', 'CarbonLoop readiness dropped because screenshots are blocked', 'Review team'],
  ['Medium', 'Nora asked for final UI screenshot timing', 'Open chat'],
  ['Low', 'CivicStack saved your profile', 'View network']
];

export const onboardingGuidance = {
  basic: 'Teams use this to check whether you fit the missing role and sprint schedule.',
  skills: 'Stack confidence tells teams whether you can own work or need pairing.',
  proof: 'Proof is weighted only when role, source, recency, and ownership are clear.',
  resume: 'History and response speed reduce the risk of accepting an unreliable teammate.',
  complete: 'Visibility controls decide who can evaluate your proof before sending requests.'
};

const decisionProfiles = {
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
  },
  arjun: {
    verificationSource: 'GitHub commits + hosted API demo + winning team page',
    proofMethod: 'Endpoint demo checked against public repo and readme setup',
    contributionRole: 'Owned model endpoint, fallback data, and API documentation',
    projectOwnership: 'Primary owner on ML/API layer in 3 projects',
    stackOverlap: 'Python and Flask complement CarbonLoop API plan',
    scheduleOverlap: 'Overnight async handoff, 4h live overlap with US evening team',
    collaborationFit: 'Strong with small specs and narrow ML scope',
    reliabilitySource: '4 hackathons, 1 winner, 75% completion rate',
    completionRate: '75%',
    activeNow: 'Active 11m ago',
    executionConfidence: 86,
    decisionSummary: 'High-value ML add if scope remains demo-safe.',
    riskFlags: ['Timezone requires written handoff', 'ML scope must stay narrow'],
    commitment: 'Can own forecast endpoint and fallback data'
  },
  nora: {
    verificationSource: 'Figma prototype + demo recording + finalist pitch deck',
    proofMethod: 'Design file and shipped demo screenshots reviewed together',
    contributionRole: 'Owned user flow, pitch story, and final demo polish',
    projectOwnership: 'Primary design owner on 4 proof projects',
    stackOverlap: 'Design systems and pitch work complement engineering-heavy teams',
    scheduleOverlap: 'Final polish block confirmed; full weekend not guaranteed',
    collaborationFit: 'Best for fast critique, demo story, and judge-facing clarity',
    reliabilitySource: '5 hackathons, 3 demo awards, 83% completion rate',
    completionRate: '83%',
    activeNow: 'Active 17m ago',
    executionConfidence: 84,
    decisionSummary: 'Strong add when product clarity or pitch risk is the blocker.',
    riskFlags: ['Availability is strongest near final polish', 'Requires stable product direction'],
    commitment: 'Can own pitch story and UI critique'
  },
  leo: {
    verificationSource: 'GitHub repo linked; teammate reference not complete',
    proofMethod: 'Repo structure reviewed, deployment proof missing',
    contributionRole: 'Backend API and auth schema owner',
    projectOwnership: 'Primary backend owner on 1 verified project',
    stackOverlap: 'Node and Postgres useful for backend-heavy teams',
    scheduleOverlap: 'Same-day response, live window not confirmed',
    collaborationFit: 'Works best with documented tickets and handoff points',
    reliabilitySource: '3 hackathons, completion rate not verified',
    completionRate: 'Unverified',
    activeNow: 'Active 4d ago',
    executionConfidence: 68,
    decisionSummary: 'Potential backend add, but request proof before accepting.',
    riskFlags: ['Availability unclear', 'Reference pending', 'Deployment proof missing'],
    commitment: 'Can own API if scope is documented'
  },
  sam: {
    verificationSource: 'GitHub + deployment history verified',
    proofMethod: 'Live deployments checked against repository ownership',
    contributionRole: 'Full-stack implementation and deployment owner',
    projectOwnership: 'Primary owner on deployment workflow projects',
    stackOverlap: 'JS, Firebase, and Next.js help small teams ship demo quickly',
    scheduleOverlap: 'Remote-only, 5h overlap, responsive async handoff',
    collaborationFit: 'Strong at late-stage deployment and unblock work',
    reliabilitySource: '7 hackathons, 78% completion rate',
    completionRate: '78%',
    activeNow: 'Active 1h ago',
    executionConfidence: 79,
    decisionSummary: 'Useful flexible builder when deployment risk is high.',
    riskFlags: ['Remote only', 'Less specialized for frontend-only gap'],
    commitment: 'Can own deploy path and full-stack fixes'
  },
  iris: {
    verificationSource: 'Pitch deck linked; team reference missing',
    proofMethod: 'Deck proof reviewed, live delivery proof pending',
    contributionRole: 'Pitch story and market framing',
    projectOwnership: 'Pitch owner on one proof project',
    stackOverlap: 'Non-technical complement for judge-facing narrative',
    scheduleOverlap: 'Open, but commitment window not confirmed',
    collaborationFit: 'Best after team has a stable product direction',
    reliabilitySource: '2 hackathons, completion rate not verified',
    completionRate: 'Unverified',
    activeNow: 'Active 5d ago',
    executionConfidence: 61,
    decisionSummary: 'Use only after verifying availability and pitch delivery proof.',
    riskFlags: ['Availability low confidence', 'Limited proof depth'],
    commitment: 'Can help with pitch if scope is defined'
  }
};

people.forEach(person => {
  person.decision = decisionProfiles[person.id];
  person.trustScore = Math.round((person.score * 0.45) + (person.decision.executionConfidence * 0.35) + ((person.verified ? 100 : 55) * 0.2));
  person.decisionReasons = [
    ['Verification source', person.decision.verificationSource],
    ['Proof method', person.decision.proofMethod],
    ['Contribution role', person.decision.contributionRole],
    ['Schedule overlap', person.decision.scheduleOverlap],
    ['Reliability source', person.decision.reliabilitySource]
  ];
});

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

requests.forEach(req => {
  const person = people.find(p => p.id === req.personId);
  const team = teams.find(t => t.id === req.teamId);
  req.executionConfidence = person.decision.executionConfidence;
  req.sprintCommitment = person.decision.commitment;
  req.communication = person.decision.collaborationFit;
  req.timezoneCompatibility = person.decision.scheduleOverlap;
  req.proofPreview = person.projects.slice(0, 2);
  req.decisionChecks = [
    ['Missing role coverage', req.roleFit],
    ['Execution confidence', `${req.executionConfidence}% based on proof ownership and completion history`],
    ['Sprint commitment', req.sprintCommitment],
    ['Team impact preview', req.teamImpact],
    ['Compatibility to current team', team.compatibility[0][2]]
  ];
  req.intermediateActions = ['Shortlist', 'Ask question', 'Request proof', 'Schedule quick sync', 'Save for review'];
});
