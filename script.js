
// ── STATE ──
let currentRole = 'allocator';
let charts = {};
const today = new Date();
const dateStr = today.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

// ── CATALOG FILTER STATE ──
let activeFilters = {
  search: '',
  assetClass: '',
  strategy: '',
  stage: '',
  income: '',
  liquidity: '',
  risk: '',
  geography: '',
  currency: '',
  vintage: ''
};
let activeSort = 'latest';

// ── USER HOLDINGS DATASET ──
const userPositions = {
  allocator: [
    {
      name: 'European Buyout Fund IV',
      assetClass: 'Private Equity',
      strategy: 'Buyout',
      geography: 'Europe',
      currency: 'EUR',
      liquidity: 'Locked',
      risk: 'Growth',
      riskClass: 'Core',
      income: 'Accumulating',
      committed: 15000000,
      value: 11200000,
      ownership: '4.5%',
      irr: 14.8,
      moic: '1.47x',
      coc: '8.2%',
      duration: '6yr rem.',
      status: 'Active'
    },
    {
      name: 'Global Macro Abs. Return',
      assetClass: 'Hedge Funds',
      strategy: 'Global Macro',
      geography: 'Global',
      currency: 'EUR',
      liquidity: 'Quarterly',
      risk: 'Growth',
      riskClass: 'Core',
      income: 'Distributing',
      committed: 12000000,
      value: 14800000,
      ownership: '—',
      irr: 12.1,
      moic: '1.23x',
      coc: '6.8%',
      duration: 'Open-ended',
      status: 'Active'
    },
    {
      name: 'Alpine Credit Opps III',
      assetClass: 'Private Debt',
      strategy: 'Direct Lending',
      geography: 'Europe',
      currency: 'EUR',
      liquidity: 'Monthly',
      risk: 'Conservative',
      riskClass: 'Conservative',
      income: 'Distributing',
      committed: 10000000,
      value: 6800000,
      ownership: '—',
      irr: 8.5,
      moic: '—',
      coc: 'SOFR+650',
      duration: '3yr rem.',
      status: 'Deploying'
    },
    {
      name: 'Infrastructure Income II',
      assetClass: 'Infrastructure',
      strategy: 'Infrastructure',
      geography: 'Europe',
      currency: 'EUR',
      liquidity: 'Locked',
      risk: 'Conservative',
      riskClass: 'Conservative',
      income: 'Distributing',
      committed: 5000000,
      value: 2300000,
      ownership: '1.2%',
      irr: 11.4,
      moic: '—',
      coc: '7.2%',
      duration: '9yr rem.',
      status: 'Active'
    }
  ],
  investor: [
    {
      name: 'Meridian PE Fund V',
      assetClass: 'Private Equity',
      strategy: 'Buyout',
      geography: 'Europe',
      currency: 'EUR',
      liquidity: 'Locked',
      risk: 'Opportunistic',
      riskClass: 'Opportunistic',
      income: 'Accumulating',
      committed: 5000000,
      value: 4200000,
      ownership: '2.1%',
      irr: 18.4,
      moic: '1.38x',
      coc: '—',
      duration: '5yr rem.',
      status: 'Active'
    },
    {
      name: 'Alpine Credit III',
      assetClass: 'Private Debt',
      strategy: 'Direct Lending',
      geography: 'Europe',
      currency: 'EUR',
      liquidity: 'Monthly',
      risk: 'Conservative',
      riskClass: 'Conservative',
      income: 'Distributing',
      committed: 3500000,
      value: 3800000,
      ownership: '—',
      irr: 7.5,
      moic: '—',
      coc: 'SOFR+650',
      duration: '3yr rem.',
      status: 'Active'
    }
  ],
  provider: []
};

// ── OPPORTUNITIES CATALOGUE DATASET ──
const catalogDeals = [
  {
    title: 'European Mid-Market Buyout Fund IV',
    sponsor: 'Northern Arc Capital Partners',
    domicile: 'Luxembourg',
    assetClass: 'Private Equity',
    strategy: 'Buyout',
    stage: 'Mature',
    income: 'Accumulating',
    liquidity: 'Locked',
    risk: 'Growth',
    geography: 'Europe',
    currency: 'EUR',
    vintage: 2025,
    minCommitment: '€5M',
    minCommitmentValue: 5000000,
    targetReturn: '22% IRR',
    targetReturnValue: 22,
    riskScore: 7,
    aum: '€800M',
    aumValue: 800000000,
    closing: 'Q2 2025',
    progress: 67,
    addedDate: '2025-01-14',
    status: 'Open',
    tagBg: 'var(--gold)'
  },
  {
    title: 'Global Macro Absolute Return Strategy',
    sponsor: 'Ashford Capital Management',
    domicile: 'Cayman Islands',
    assetClass: 'Hedge Funds',
    strategy: 'Global Macro',
    stage: 'Mature',
    income: 'Distributing',
    liquidity: 'Quarterly',
    risk: 'Moderate',
    geography: 'Global',
    currency: 'USD',
    vintage: 2024,
    minCommitment: '$10M',
    minCommitmentValue: 10000000,
    targetReturn: '12% IRR',
    targetReturnValue: 12,
    riskScore: 5,
    aum: '$2.1B',
    aumValue: 2100000000,
    closing: 'Open-ended',
    progress: null,
    addedDate: '2024-12-15',
    status: 'Open',
    tagBg: '#6a8a9e'
  },
  {
    title: 'Alpine Credit Opportunities III',
    sponsor: 'Meridian Credit Partners',
    domicile: 'Ireland',
    assetClass: 'Private Debt',
    strategy: 'Direct Lending',
    stage: 'Mature',
    income: 'Distributing',
    liquidity: 'Monthly',
    risk: 'Conservative',
    geography: 'Europe',
    currency: 'EUR',
    vintage: 2024,
    minCommitment: '€2M',
    minCommitmentValue: 2000000,
    targetReturn: '8.5% Yield',
    targetReturnValue: 8.5,
    riskScore: 3,
    aum: '€500M',
    aumValue: 500000000,
    closing: 'Q3 2025',
    progress: null,
    addedDate: '2024-11-20',
    status: 'Under Review',
    tagBg: '#7a9a6a'
  },
  {
    title: 'Infrastructure Income Fund II',
    sponsor: 'Corsair Asset Management',
    domicile: 'Jersey',
    assetClass: 'Infrastructure',
    strategy: 'Infrastructure',
    stage: 'Mature',
    income: 'Distributing',
    liquidity: 'Locked',
    risk: 'Conservative',
    geography: 'Europe',
    currency: 'EUR',
    vintage: 2024,
    minCommitment: '€10M',
    minCommitmentValue: 10000000,
    targetReturn: '14% IRR',
    targetReturnValue: 14,
    riskScore: 4,
    aum: '€1.2B',
    aumValue: 1200000000,
    closing: 'Q4 2025',
    progress: 42,
    addedDate: '2024-10-05',
    status: 'Open',
    tagBg: '#8a7a9e'
  },
  {
    title: 'US Silicon Valley Venture Fund IX',
    sponsor: 'Fjord Capital Partners',
    domicile: 'United States',
    assetClass: 'Private Equity',
    strategy: 'Venture Capital',
    stage: 'Series A',
    income: 'Accumulating',
    liquidity: 'Locked',
    risk: 'Aggressive',
    geography: 'North America',
    currency: 'USD',
    vintage: 2025,
    minCommitment: '$5M',
    minCommitmentValue: 5000000,
    targetReturn: '28% IRR',
    targetReturnValue: 28,
    riskScore: 9,
    aum: '$400M',
    aumValue: 400000000,
    closing: 'Q3 2025',
    progress: 80,
    addedDate: '2025-01-20',
    status: 'Open',
    tagBg: 'var(--gold)'
  },
  {
    title: 'Logistics & Industrial Real Estate Trust',
    sponsor: 'Equus Real Estate Advisors',
    domicile: 'United Kingdom',
    assetClass: 'Real Estate',
    strategy: 'Logistics',
    stage: 'Mature',
    income: 'Distributing',
    liquidity: 'Quarterly',
    risk: 'Moderate',
    geography: 'Asia-Pacific',
    currency: 'GBP',
    vintage: 2023,
    minCommitment: '£3M',
    minCommitmentValue: 3000000,
    targetReturn: '10% Yield',
    targetReturnValue: 10,
    riskScore: 5,
    aum: '£600M',
    aumValue: 600000000,
    closing: 'Open-ended',
    progress: 50,
    addedDate: '2023-08-15',
    status: 'Open',
    tagBg: '#9a7a48'
  },
  {
    title: 'Alternative Relative Value Hedge Fund',
    sponsor: 'Aethelred Capital Management',
    domicile: 'United Kingdom',
    assetClass: 'Hedge Funds',
    strategy: 'Relative Value',
    stage: 'Mature',
    income: 'Accumulating',
    liquidity: 'Weekly',
    risk: 'Growth',
    geography: 'Global',
    currency: 'USD',
    vintage: 2024,
    minCommitment: '$2M',
    minCommitmentValue: 2000000,
    targetReturn: '11% IRR',
    targetReturnValue: 11,
    riskScore: 6,
    aum: '$850M',
    aumValue: 850000000,
    closing: 'Open-ended',
    progress: null,
    addedDate: '2024-05-10',
    status: 'Open',
    tagBg: '#6a8a9e'
  },
  {
    title: 'Emerging Markets Sovereign Bond Fund',
    sponsor: 'Luminance Asset Management',
    domicile: 'Brazil',
    assetClass: 'Fixed Income',
    strategy: 'Fixed Income',
    stage: 'Mature',
    income: 'Distributing',
    liquidity: 'Daily',
    risk: 'Moderate',
    geography: 'Latin America',
    currency: 'BRL',
    vintage: 2023,
    minCommitment: 'R$5M',
    minCommitmentValue: 1000000,
    targetReturn: '7.5% Yield',
    targetReturnValue: 7.5,
    riskScore: 4,
    aum: 'R$1.5B',
    aumValue: 300000000,
    closing: 'Open-ended',
    progress: null,
    addedDate: '2023-03-01',
    status: 'Open',
    tagBg: 'var(--silver)'
  }
];

// ── ROLE CONFIG ──
const roles = {
  allocator: {
    name: 'Alexandra Vandenberg', org: 'Vandenberg Family Office',
    badge: 'Capital Allocator', initial: 'V',
    welcome: 'Welcome back, Alexandra',
    subtitle: 'Your capital allocation overview · 2 January 2025',
    kpis: [
      { label:'Net Asset Value', value:'€42.8M', sub:'+2.1% MTD', cls:'pos' },
      { label:'Opportunities Open', value:'7', sub:'Matching mandate', cls:'' },
      { label:'Dry Powder', value:'€11.6M', sub:'Available to deploy', cls:'' },
      { label:'Active Partners (GPs)', value:'12', sub:'On platform', cls:'' },
    ],
    portfolio: { committed:'€50M', deployed:'€38.4M', value:'€42.8M', tvpi:'1.24x' },
  },
  provider: {
    name: 'James Thornton', org: 'Northern Arc Capital Partners',
    badge: 'Deal Provider — GP', initial: 'N',
    welcome: 'Welcome back, James',
    subtitle: 'Your distribution pipeline and LP engagement',
    kpis: [
      { label:'Active Mandates', value:'3', sub:'Under distribution', cls:'' },
      { label:'Soft Circle Total', value:'€340M', sub:'Across all funds', cls:'' },
      { label:'LP Engagements', value:'28', sub:'Active conversations', cls:'' },
      { label:'Qualified LPs', value:'42', sub:'Platform allocators', cls:'' },
    ],
    portfolio: { committed:'N/A', deployed:'—', value:'See mandates', tvpi:'—' },
  },
  investor: {
    name: 'Lord H. St. Clair-Morris', org: 'Independent Co-Investor',
    badge: 'Professional Co-Investor', initial: 'S',
    welcome: 'Welcome back',
    subtitle: 'Your co-investment portfolio and opportunities',
    kpis: [
      { label:'Committed Capital', value:'€8.5M', sub:'2 positions', cls:'' },
      { label:'Open Co-Invests', value:'4', sub:'Available to you', cls:'' },
      { label:'Unrealised Gain', value:'+18.4%', sub:'Blended estimate', cls:'pos' },
      { label:'Distributions Received', value:'€0.6M', sub:'To date', cls:'' },
    ],
    portfolio: { committed:'€8.5M', deployed:'€6.2M', value:'€9.8M', tvpi:'1.18x' },
  }
};

const portfolioRows = {
  allocator: [
    ['European Buyout Fund IV','Private Equity','€15.0M','€11.2M','4.5%','14.8%','1.47x','8.2%','6yr rem.','Core','Active'],
    ['Global Macro Abs. Return','Hedge Fund','€12.0M','€14.8M','—','12.1%','1.23x','6.8%','Open-ended','Core','Active'],
    ['Alpine Credit Opps III','Private Credit','€10.0M','€6.8M','—','SOFR+650','—','SOFR+650','3yr rem.','Conservative','Deploying'],
    ['Infrastructure Income II','Alternatives','€5.0M','€2.3M','1.2%','11.4%','—','7.2%','9yr rem.','Conservative','Active'],
  ],
  investor: [
    ['Meridian PE Fund V','PE — Co-Invest','€5.0M','€4.2M','2.1%','18.4%','1.38x','—','5yr rem.','Opportunistic','Active'],
    ['Alpine Credit III','Credit — Co-Invest','€3.5M','€3.8M','—','SOFR+650','—','SOFR+650','3yr rem.','Conservative','Active'],
  ],
  provider: []
};

const dashDeals = {
  allocator: [
    { tag:'Private Equity', tagBg:'var(--gold)', title:'European Buyout Fund IV', sub:'Northern Arc Capital · Luxembourg', meta:[['Target','€800M'],['Min.','€5M'],['IRR','22%'],['Close','Q2 2025']], status:'active', statusText:'Open', progress:67 },
    { tag:'Hedge Fund', tagBg:'#6a8a9e', title:'Global Macro Strategy', sub:'Ashford Capital · Cayman', meta:[['AUM','$2.1B'],['Min.','$10M'],['Strategy','L/S'],['Liquidity','Quarterly']], status:'active', statusText:'Open', progress:null },
    { tag:'Private Credit', tagBg:'#7a9a6a', title:'Alpine Credit Opps III', sub:'Meridian Credit · Ireland', meta:[['Target','€500M'],['Yield','SOFR+650'],['Min.','€2M'],['Duration','3–5yr']], status:'review', statusText:'Under Review', progress:null },
  ],
  provider: [
    { tag:'Private Equity', tagBg:'var(--gold)', title:'Meridian PE Fund V', sub:'Your origination · Active distribution', meta:[['Target','€600M'],['Soft Circle','€210M'],['LPs','14'],['Close','Q3 2025']], status:'active', statusText:'Your Deal', progress:35 },
    { tag:'Direct Lending', tagBg:'#7a9a6a', title:'Corsair Credit Special Sits I', sub:'IC Review pending · 9 LPs engaged', meta:[['Target','€300M'],['Soft Circle','€85M'],['LPs','9'],['Stage','IC Review']], status:'review', statusText:'IC Review', progress:null },
  ],
  investor: [
    { tag:'PE Co-Invest', tagBg:'var(--gold)', title:'Meridian PE Fund V', sub:'Your position · Co-investor tranche', meta:[['Committed','€5M'],['IRR','18.4%'],['MOIC','1.38x'],['Rem.','5yr']], status:'active', statusText:'Open', progress:null },
    { tag:'Credit Co-Invest', tagBg:'#7a9a6a', title:'Alpine Credit III', sub:'Co-investor tranche · Semi-annual gate', meta:[['Committed','€3.5M'],['Yield','SOFR+650'],['NAV','€3.8M'],['Rem.','3yr']], status:'active', statusText:'Open', progress:null },
  ]
};

// ── PAGE SWITCHING ──
function showPage(id) {
  const el = document.getElementById(id);
  if (el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    window.scrollTo(0, 0);
  }
}

var registerRole = 'allocator';

// ── TOPBAR UPGRADE INTERACTIONS ──
function toggleNotifDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('notif-dropdown');
  if (dropdown) dropdown.classList.toggle('active');
}

function markAllNotificationsRead(event) {
  if (event) event.stopPropagation();
  const dropdownItems = document.querySelectorAll('.notif-dropdown-item');
  dropdownItems.forEach(item => item.classList.remove('unread'));
  const badge = document.getElementById('topbar-notif-badge');
  if (badge) badge.style.display = 'none';
}

function handleNotifClick(tabName) {
  const dropdown = document.getElementById('notif-dropdown');
  if (dropdown) dropdown.classList.remove('active');
  setTab(tabName);
}

function handleTopbarSearch(event) {
  const query = event.target.value.trim();
  if (event.key === 'Enter') {
    setTab('deals');
    const catalogSearchInput = document.getElementById('catalog-search');
    if (catalogSearchInput) {
      catalogSearchInput.value = query;
      activeFilters.search = query;
      renderCatalog();
    }
  }
}

function toggleProfileDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('profile-dropdown');
  if (dropdown) dropdown.classList.toggle('active');
  
  // Close notification dropdown if open
  const notifDropdown = document.getElementById('notif-dropdown');
  if (notifDropdown) notifDropdown.classList.remove('active');
}

function closeProfileDropdown() {
  const dropdown = document.getElementById('profile-dropdown');
  if (dropdown) dropdown.classList.remove('active');
}

function handleLogout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

window.toggleProfileDropdown = toggleProfileDropdown;
window.closeProfileDropdown = closeProfileDropdown;
window.handleLogout = handleLogout;

function showLogin(role) {
  window.location.href = 'login.html?role=' + role;
}

// User account list initializer
function initUserAccounts() {
  if (!localStorage.getItem('hubUsers')) {
    const defaultUsers = [
      { email: 'allocator@hub.com', name: 'Sarah Jenkins', password: 'password', role: 'allocator', status: 'Approved', org: 'Jenkins Multi-Family Office' },
      { email: 'provider@hub.com', name: 'Marcus Vance', password: 'password', role: 'provider', status: 'Approved', org: 'Vance Private Equity GP' },
      { email: 'investor@hub.com', name: 'Elena Rostova', password: 'password', role: 'investor', status: 'Approved', org: 'Rostova Holdings' },
      { email: 'admin@hub.com', name: 'Compliance Admin', password: 'admin', role: 'admin', status: 'Approved', org: 'GIH Compliance Committee' }
    ];
    localStorage.setItem('hubUsers', JSON.stringify(defaultUsers));
  }
}

// Show/Hide Containers
function showRegister() {
  document.getElementById('login-form-container').style.display = 'none';
  document.getElementById('register-form-container').style.display = 'block';
  document.getElementById('status-form-container').style.display = 'none';
  document.getElementById('admin-form-container').style.display = 'none';
}

function showLoginSection() {
  document.getElementById('login-form-container').style.display = 'block';
  document.getElementById('register-form-container').style.display = 'none';
  document.getElementById('status-form-container').style.display = 'none';
  document.getElementById('admin-form-container').style.display = 'none';
}

function selectRegisterRole(role) {
  registerRole = role;
  document.querySelectorAll('#register-role-selector .role-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('reg-role-' + role);
  if (btn) btn.classList.add('active');
}

function selectRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-selector:not(#register-role-selector) .role-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('role-btn-' + role);
  if (btn) btn.classList.add('active');
}

// Perform Login
function doLogin() {
  const emailInput = document.getElementById('login-email').value.trim();
  const passwordInput = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  
  if (errorEl) errorEl.style.display = 'none';
  
  if (!emailInput || !passwordInput) {
    if (errorEl) {
      errorEl.textContent = 'Please enter your email and access code.';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  initUserAccounts();
  const users = JSON.parse(localStorage.getItem('hubUsers'));
  const user = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase() && u.password === passwordInput);
  
  if (!user) {
    if (errorEl) {
      errorEl.textContent = 'Invalid credentials. Please select the correct category or contact administration.';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  // Enforce correct category selector mismatch unless it is admin
  if (user.role !== 'admin' && user.role !== currentRole) {
    if (errorEl) {
      errorEl.textContent = 'User role mismatch. Please select the correct category.';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  if (user.status === 'Pending') {
    document.getElementById('status-user-name').textContent = user.name;
    document.getElementById('status-user-email').textContent = user.email;
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('status-form-container').style.display = 'block';
    return;
  }
  
  if (user.role === 'admin') {
    showAdminPanel();
    return;
  }
  
  // Successful Login
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'platform.html';
}

// Perform Registration
function submitRegistration() {
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const org = document.getElementById('register-org').value.trim();
  const password = document.getElementById('register-password').value;
  const errorEl = document.getElementById('register-error');
  
  if (errorEl) errorEl.style.display = 'none';
  
  if (!name || !email || !org || !password) {
    if (errorEl) {
      errorEl.textContent = 'All fields are required.';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  initUserAccounts();
  const users = JSON.parse(localStorage.getItem('hubUsers'));
  
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    if (errorEl) {
      errorEl.textContent = 'An account with this email already exists.';
      errorEl.style.display = 'block';
    }
    return;
  }
  
  const newUser = {
    name: name,
    email: email,
    org: org,
    password: password,
    role: registerRole,
    status: 'Pending'
  };
  
  users.push(newUser);
  localStorage.setItem('hubUsers', JSON.stringify(users));
  
  // Show Pending Screen directly
  document.getElementById('status-user-name').textContent = name;
  document.getElementById('status-user-email').textContent = email;
  document.getElementById('register-form-container').style.display = 'none';
  document.getElementById('status-form-container').style.display = 'block';
  
  // Clear inputs
  document.getElementById('register-name').value = '';
  document.getElementById('register-email').value = '';
  document.getElementById('register-org').value = '';
  document.getElementById('register-password').value = '';
}

// Admin Panel functions
function showAdminPanel() {
  document.getElementById('login-form-container').style.display = 'none';
  document.getElementById('admin-form-container').style.display = 'block';
  renderAdminUsers();
}

function renderAdminUsers() {
  initUserAccounts();
  const users = JSON.parse(localStorage.getItem('hubUsers'));
  const listEl = document.getElementById('admin-users-list');
  if (!listEl) return;
  
  const pendingUsers = users.filter(u => u.status === 'Pending');
  
  if (pendingUsers.length === 0) {
    listEl.innerHTML = '<div style="color:var(--silver);text-align:center;font-size:12px;padding:20px 0;">No pending registration requests found.</div>';
    return;
  }
  
  listEl.innerHTML = pendingUsers.map(u => `
    <div style="border-bottom:1px solid rgba(201,169,110,0.1);padding:10px 0;display:flex;justify-content:space-between;align-items:center;">
      <div style="text-align:left;">
        <div style="font-weight:500;color:var(--cream);font-size:13px;">${u.name}</div>
        <div style="color:var(--silver);font-size:11px;">${u.email} · ${u.org}</div>
        <div style="color:var(--gold);font-size:10px;text-transform:uppercase;margin-top:2px;">Requested: ${u.role === 'allocator'?'Capital Allocator':u.role === 'provider'?'Deal Provider':'Co-Investor'}</div>
      </div>
      <div style="display:flex;gap:8px;">
        <button onclick="approveUser('${u.email}')" style="background:var(--green);color:white;border:none;border-radius:2px;padding:4px 8px;font-size:10px;cursor:pointer;">Approve</button>
        <button onclick="rejectUser('${u.email}')" style="background:var(--red);color:white;border:none;border-radius:2px;padding:4px 8px;font-size:10px;cursor:pointer;">Reject</button>
      </div>
    </div>
  `).join('');
}

function approveUser(email) {
  let users = JSON.parse(localStorage.getItem('hubUsers'));
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    user.status = 'Approved';
    localStorage.setItem('hubUsers', JSON.stringify(users));
    
    const noticeEl = document.getElementById('admin-notice');
    if (noticeEl) {
      noticeEl.textContent = `Successfully approved ${user.name} (${user.email})`;
      noticeEl.style.display = 'block';
      setTimeout(() => { noticeEl.style.display = 'none'; }, 3000);
    }
    renderAdminUsers();
  }
}

function rejectUser(email) {
  let users = JSON.parse(localStorage.getItem('hubUsers'));
  users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
  localStorage.setItem('hubUsers', JSON.stringify(users));
  
  const noticeEl = document.getElementById('admin-notice');
  if (noticeEl) {
    noticeEl.textContent = `Successfully rejected/removed user.`;
    noticeEl.style.display = 'block';
    setTimeout(() => { noticeEl.style.display = 'none'; }, 3000);
  }
  renderAdminUsers();
}

// ── CONFIGURE DASHBOARD ──
function configureDashboard(role) {
  const cfg = roles[role];
  if (!cfg) return;

  const avatar = document.getElementById('user-avatar');
  if (avatar) avatar.textContent = cfg.initial;

  const topbarAvatar = document.getElementById('topbar-avatar');
  if (topbarAvatar) topbarAvatar.textContent = cfg.initial;

  const name = document.getElementById('user-name');
  if (name) name.textContent = cfg.name;

  const badge = document.getElementById('user-role-badge');
  if (badge) badge.textContent = cfg.badge;

  const topbarProfileName = document.getElementById('topbar-profile-name');
  if (topbarProfileName) topbarProfileName.textContent = cfg.name;

  const profileDropdownName = document.getElementById('profile-dropdown-name');
  if (profileDropdownName) profileDropdownName.textContent = cfg.name;

  const profileDropdownRole = document.getElementById('profile-dropdown-role');
  if (profileDropdownRole) profileDropdownRole.textContent = cfg.badge;

  const welcome = document.getElementById('dash-welcome-eyebrow');
  if (welcome) welcome.textContent = cfg.welcome;

  const sub = document.getElementById('dash-welcome-sub');
  if (sub) sub.textContent = cfg.subtitle;

  // KPIs
  const kpiRow = document.getElementById('kpi-row');
  if (kpiRow) {
    kpiRow.innerHTML = cfg.kpis.map(k => `
      <div class="kpi-card">
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-sub ${k.cls}">${k.sub}</div>
      </div>
    `).join('');
  }

  // Portfolio
  if (cfg.portfolio) {
    const portCommitted = document.getElementById('port-committed');
    if (portCommitted) portCommitted.textContent = cfg.portfolio.committed;

    const portDeployed = document.getElementById('port-deployed');
    if (portDeployed) portDeployed.textContent = cfg.portfolio.deployed;

    const portValue = document.getElementById('port-value');
    if (portValue) portValue.textContent = cfg.portfolio.value;

    const portTvpi = document.getElementById('port-tvpi');
    if (portTvpi) portTvpi.textContent = cfg.portfolio.tvpi;
  }

  // Portfolio table
  const tbody = document.getElementById('portfolio-table-body');
  if (tbody) {
    const positions = userPositions[role] || [];
    if (positions.length) {
      tbody.innerHTML = positions.map(p => `
        <tr>
          <td>${p.name}</td>
          <td>${p.strategy}</td>
          <td>${p.currency} ${(p.committed / 1000000).toFixed(1)}M</td>
          <td>${p.currency} ${(p.value / 1000000).toFixed(1)}M</td>
          <td>${p.ownership || '—'}</td>
          <td style="color:var(--green);">${p.irr}%</td>
          <td style="color:var(--gold);">${p.moic || '—'}</td>
          <td>${p.coc || '—'}</td>
          <td>${p.duration}</td>
          <td><span class="m-tag m-tag-${p.riskClass==='Core'?'gold':p.riskClass==='Conservative'?'green':'blue'}">${p.riskClass || p.risk}</span></td>
          <td><span style="color:var(--green);font-size:9px;letter-spacing:0.15em;">${p.status}</span></td>
        </tr>
      `).join('');
    } else {
      tbody.innerHTML = '<tr><td colspan="11" style="color:var(--silver);text-align:center;padding:32px;">No active holdings recorded</td></tr>';
    }
  }

  // Reset portfolio view to list
  setPortfolioView('list');

  // Dash deals
  const dealsGrid = document.getElementById('dash-deals');
  if (dealsGrid) {
    const dd = dashDeals[role] || [];
    dealsGrid.innerHTML = dd.map(d => {
      const statusClass = d.status === 'active' ? 'status-active' : 'status-review';
      const statusTextClass = d.status === 'active' ? 'status-active-text' : 'status-review-text';
      const prog = d.progress !== null ? `
        <div class="progress-bar-wrap" style="margin-top:20px;"><div class="progress-bar-fill" style="width:${d.progress}%;"></div></div>
        <div class="progress-label"><span>${d.progress}% allocated</span><span></span></div>` : '';
      return `
        <div class="deal-card">
          <div class="deal-card-status"><span class="status-dot ${statusClass}"></span><span class="${statusTextClass}">${d.statusText}</span></div>
          <div class="deal-card-tag" style="background:${d.tagBg};">${d.tag}</div>
          <div class="deal-card-title">${d.title}</div>
          <div class="deal-card-sub">${d.sub}</div>
          <div class="deal-card-divider"></div>
          <div class="deal-card-meta">
            ${d.meta.map(m => `<div><div class="deal-meta-label">${m[0]}</div><div class="deal-meta-value">${m[1]}</div></div>`).join('')}
          </div>
          ${prog}
        </div>`;
    }).join('');
  }

  // Provider origination nav
  const origItem = document.getElementById('nav-origination-item');
  if (origItem) {
    origItem.style.display = role === 'provider' ? 'block' : 'none';
  }

  // Settings
  const sessionUser = sessionStorage.getItem('currentUser');
  let displayName = cfg.name;
  let displayOrg = cfg.org;
  let displayEmail = 'member@institution.com';

  if (sessionUser) {
    const userObj = JSON.parse(sessionUser);
    if (userObj.name) displayName = userObj.name;
    if (userObj.org) displayOrg = userObj.org;
    if (userObj.email) displayEmail = userObj.email;
  }

  const settingsName = document.getElementById('settings-name-input');
  if (settingsName) settingsName.value = displayName;

  const settingsOrg = document.getElementById('settings-org-input');
  if (settingsOrg) settingsOrg.value = displayOrg;

  const settingsEmail = document.getElementById('settings-email-input');
  if (settingsEmail) settingsEmail.value = displayEmail;

  const settingsCategory = document.getElementById('settings-category-input');
  if (settingsCategory) settingsCategory.value = cfg.badge;
}

// ── TAB SWITCHING ──
function setTab(tabId) {
  const targetTab = document.getElementById('tab-' + tabId);
  if (!targetTab) return;

  // Update URL hash without reloading the page
  if (window.location.hash.substring(1) !== tabId) {
    window.location.hash = tabId;
  }

  // Avoid redundant execution if already active
  if (targetTab.classList.contains('active')) {
    const button = Array.from(document.querySelectorAll('.sidebar-nav button')).find(
      b => b.getAttribute('onclick') === `setTab('${tabId}')`
    );
    if (!button || button.classList.contains('active')) {
      return;
    }
  }

  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav button, .sidebar-nav a').forEach(b => b.classList.remove('active'));
  
  targetTab.classList.add('active');

  const topbarPage = document.getElementById('topbar-page');
  if (topbarPage) {
    topbarPage.textContent = tabId.charAt(0).toUpperCase() + tabId.slice(1);
  }

  document.querySelectorAll('.sidebar-nav button').forEach(b => {
    if (b.getAttribute('onclick') === `setTab('${tabId}')`) b.classList.add('active');
  });

  // Init charts lazily when tab first shown
  setTimeout(() => initTabCharts(tabId), 50);
}

// ── CHART CONFIG ──
if (typeof Chart !== 'undefined') {
  Chart.defaults.color = '#8a8a8a';
  Chart.defaults.borderColor = 'rgba(201,169,110,0.08)';
  Chart.defaults.font.family = "'Montserrat', sans-serif";
  Chart.defaults.font.size = 10;
}

const GOLD = '#c9a96e';
const GOLD_L = '#e0c898';
const GREEN = '#4a9a6a';
const RED = '#c06060';
const BLUE = '#6a8a9e';
const PURPLE = '#8a7a9e';
const SILVER = '#8a8a8a';

function destroyChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

function initTabCharts(tabId) {
  if (typeof Chart === 'undefined') return;

  if (tabId === 'analytics') {
    // Attribution by class
    destroyChart('chart-attribution-class');
    const c1 = document.getElementById('chart-attribution-class');
    if (c1) charts['chart-attribution-class'] = new Chart(c1, {
      type: 'bar',
      data: { labels: ['Private Equity','Hedge Funds','Private Credit','Infrastructure'],
        datasets: [{ label: 'Return Contribution', data: [5.9, 2.1, 2.8, 0.6], backgroundColor: [GOLD, BLUE, GREEN, PURPLE], borderWidth: 0 }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { ticks: { callback: v => v + '%' } } } }
    });

    // Attribution by geo
    destroyChart('chart-attribution-geo');
    const c2 = document.getElementById('chart-attribution-geo');
    if (c2) charts['chart-attribution-geo'] = new Chart(c2, {
      type: 'doughnut',
      data: { labels: ['Europe','Americas','Asia-Pac','Global'],
        datasets: [{ data: [52, 28, 12, 8], backgroundColor: [GOLD, BLUE, GREEN, PURPLE], borderWidth: 0 }] },
      options: { responsive: true, cutout: '60%', plugins: { legend: { position: 'right' } } }
    });

    // Performance over time
    destroyChart('chart-perf-time');
    const c3 = document.getElementById('chart-perf-time');
    if (c3) {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      charts['chart-perf-time'] = new Chart(c3, {
        type: 'line',
        data: { labels: months, datasets: [
          { label: 'Portfolio', data: [100,102.1,104.8,103.2,106.4,109.1,107.8,111.2,113.4,115.8,117.2,120.4], borderColor: GOLD, backgroundColor: 'rgba(201,169,110,0.05)', tension: 0.4, fill: true, pointRadius: 0 },
          { label: 'Benchmark', data: [100,101.4,102.8,101.8,103.9,105.2,104.1,106.8,108.2,109.8,110.4,112.1], borderColor: SILVER, borderDash: [4,4], backgroundColor: 'transparent', tension: 0.4, fill: false, pointRadius: 0 }
        ]},
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { ticks: { callback: v => v.toFixed(0) } } } }
      });
    }
  }

  if (tabId === 'liquidity') {
    destroyChart('chart-liquidity');
    const c = document.getElementById('chart-liquidity');
    if (c) {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      charts['chart-liquidity'] = new Chart(c, {
        type: 'bar',
        data: { labels: months, datasets: [
          { label: 'Inflows', data: [1.4,0.8,2.2,0.6,1.8,3.1,0.4,1.2,1.6,0.9,2.4,1.8], backgroundColor: 'rgba(74,154,106,0.6)', borderWidth: 0 },
          { label: 'Outflows (Capital Calls)', data: [-2.1,-0.5,-1.2,-0.8,-1.4,-0.3,-2.2,-0.6,-1.1,-0.4,-1.8,-0.9], backgroundColor: 'rgba(192,96,96,0.6)', borderWidth: 0 }
        ]},
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { x: { grid: { display: false } }, y: { ticks: { callback: v => '€' + Math.abs(v) + 'M' } } } }
      });
    }
  }

  if (tabId === 'allocation') {
    destroyChart('chart-alloc-class');
    const c1 = document.getElementById('chart-alloc-class');
    if (c1) charts['chart-alloc-class'] = new Chart(c1, {
      type: 'bar',
      data: {
        labels: ['Private Equity','Hedge Funds','Private Credit','Infrastructure'],
        datasets: [
          { label: 'Actual', data: [42, 28, 18, 12], backgroundColor: GOLD, borderWidth: 0 },
          { label: 'Target', data: [40, 30, 20, 10], backgroundColor: 'rgba(201,169,110,0.2)', borderWidth: 0 }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { x: { grid: { display: false } }, y: { ticks: { callback: v => v + '%' } } } }
    });

    destroyChart('chart-alloc-geo');
    const c2 = document.getElementById('chart-alloc-geo');
    if (c2) charts['chart-alloc-geo'] = new Chart(c2, {
      type: 'doughnut',
      data: { labels: ['Western Europe','North America','UK','Asia-Pacific','Other'],
        datasets: [{ data: [48, 24, 14, 10, 4], backgroundColor: [GOLD, BLUE, GREEN, PURPLE, SILVER], borderWidth: 0 }] },
      options: { responsive: true, cutout: '60%', plugins: { legend: { position: 'right' } } }
    });
  }

  if (tabId === 'income') {
    destroyChart('chart-income-monthly');
    const c = document.getElementById('chart-income-monthly');
    if (c) {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      charts['chart-income-monthly'] = new Chart(c, {
        type: 'bar',
        data: { labels: months.slice(0, 6), datasets: [
          { label: 'Interest / Coupons', data: [82, 76, 92, 68, 88, 96], backgroundColor: GREEN, borderWidth: 0 },
          { label: 'Distributions', data: [24, 0, 48, 0, 24, 60], backgroundColor: GOLD, borderWidth: 0 },
          { label: 'Other Income', data: [12, 8, 14, 8, 12, 14], backgroundColor: BLUE, borderWidth: 0 }
        ]},
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { x: { grid: { display: false } }, stacked: true, y: { stacked: true, ticks: { callback: v => '€' + v + 'K' } } } }
      });
    }
  }

  if (tabId === 'fees') {
    destroyChart('chart-fees-comparison');
    const c = document.getElementById('chart-fees-comparison');
    if (c) {
      const quarters = ['Q1 2024','Q2 2024','Q3 2024','Q4 2024'];
      charts['chart-fees-comparison'] = new Chart(c, {
        type: 'line',
        data: { labels: quarters, datasets: [
          { label: 'Gross Return', data: [2.8, 3.1, 2.6, 2.9], borderColor: GOLD_L, backgroundColor: 'rgba(224,200,152,0.07)', tension: 0.4, fill: true, pointRadius: 4 },
          { label: 'Net Return', data: [2.1, 2.4, 1.9, 2.3], borderColor: GREEN, backgroundColor: 'rgba(74,154,106,0.07)', tension: 0.4, fill: true, pointRadius: 4 },
          { label: 'Fee Drag', data: [0.7, 0.7, 0.7, 0.6], borderColor: RED, borderDash: [4,4], backgroundColor: 'transparent', tension: 0.4, fill: false, pointRadius: 3 }
        ]},
        options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { ticks: { callback: v => v + '%' } } } }
      });
    }
  }
}

function initCharts() {
  initTabCharts('dashboard');
}

// ── CATALOG FILTERS & SORTERS CODE ──
const strategiesByAssetClass = {
  'Hedge Funds': ['Long/Short Equity', 'Global Macro', 'Event Driven', 'Relative Value', 'Quantitative', 'Multi-Strategy'],
  'Private Equity': ['Venture Capital', 'Growth Equity', 'Buyout', 'Secondaries', 'Co-Investments', 'Special Situations'],
  'Private Debt': ['Direct Lending', 'Mezzanine', 'Distressed', 'Asset-Backed Lending', 'Real Estate Debt'],
  'Real Estate': ['Residential', 'Logistics', 'Hospitality', 'Office', 'Mixed Use']
};

function updateStrategyDropdown() {
  const assetClassSelect = document.getElementById('filter-asset-class');
  const strategySelect = document.getElementById('filter-strategy');
  if (!assetClassSelect || !strategySelect) return;

  const selectedClass = assetClassSelect.value;
  strategySelect.innerHTML = '<option value="">All Strategies</option>';
  
  if (selectedClass && strategiesByAssetClass[selectedClass]) {
    strategiesByAssetClass[selectedClass].forEach(strategy => {
      const opt = document.createElement('option');
      opt.value = strategy;
      opt.textContent = strategy;
      strategySelect.appendChild(opt);
    });
  } else if (!selectedClass) {
    Object.keys(strategiesByAssetClass).forEach(key => {
      strategiesByAssetClass[key].forEach(strategy => {
        const opt = document.createElement('option');
        opt.value = strategy;
        opt.textContent = strategy;
        strategySelect.appendChild(opt);
      });
    });
  }
}

function updateVintageDropdown() {
  const vintageSelect = document.getElementById('filter-vintage');
  if (!vintageSelect) return;

  const vintages = [...new Set(catalogDeals.map(d => d.vintage))].sort((a,b) => b-a);
  vintageSelect.innerHTML = '<option value="">All Vintages</option>';
  
  vintages.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    vintageSelect.appendChild(opt);
  });
}

function renderCatalog() {
  const container = document.getElementById('catalog-deals-grid');
  if (!container) return;

  let filtered = catalogDeals.filter(d => {
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      if (!d.title.toLowerCase().includes(q) && !d.sponsor.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (activeFilters.assetClass && d.assetClass !== activeFilters.assetClass) return false;
    if (activeFilters.strategy && d.strategy !== activeFilters.strategy) return false;
    if (activeFilters.stage && d.stage !== activeFilters.stage) return false;
    if (activeFilters.income && d.income !== activeFilters.income) return false;
    if (activeFilters.liquidity && d.liquidity !== activeFilters.liquidity) return false;
    if (activeFilters.risk && d.risk !== activeFilters.risk) return false;
    if (activeFilters.geography && d.geography !== activeFilters.geography) return false;
    if (activeFilters.currency && d.currency !== activeFilters.currency) return false;
    if (activeFilters.vintage && d.vintage.toString() !== activeFilters.vintage) return false;

    return true;
  });

  filtered.sort((a, b) => {
    if (activeSort === 'latest') {
      return new Date(b.addedDate) - new Date(a.addedDate);
    }
    if (activeSort === 'return') {
      return b.targetReturnValue - a.targetReturnValue;
    }
    if (activeSort === 'risk') {
      return b.riskScore - a.riskScore;
    }
    if (activeSort === 'liquidity') {
      const liqOrder = { 'Daily': 6, 'Weekly': 5, 'Monthly': 4, 'Quarterly': 3, 'Annual': 2, 'Locked': 1 };
      return (liqOrder[b.liquidity] || 0) - (liqOrder[a.liquidity] || 0);
    }
    if (activeSort === 'min_investment') {
      return a.minCommitmentValue - b.minCommitmentValue;
    }
    if (activeSort === 'aum') {
      return b.aumValue - a.aumValue;
    }
    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:64px; color:var(--silver); font-size:13px; letter-spacing:0.05em; background:var(--charcoal);">
      No investment opportunities match the selected criteria.
    </div>`;
  } else {
    container.innerHTML = filtered.map(d => {
      const statusClass = d.status === 'Open' ? 'status-active' : 'status-review';
      const statusTextClass = d.status === 'Open' ? 'status-active-text' : 'status-review-text';
      
      const isYield = d.targetReturn.toLowerCase().includes('yield');
      const label1 = d.assetClass === 'Hedge Funds' ? 'AUM' : 'Target Size';
      const label2 = d.assetClass === 'Hedge Funds' ? 'Min. Investment' : 'Min. Commitment';
      const label3 = isYield ? 'Target Yield' : 'Target Return';
      const label4 = d.assetClass === 'Hedge Funds' ? 'Strategy' : (d.strategy === 'Venture Capital' || d.strategy === 'Growth Equity' ? 'Stage' : 'Term/Closing');
      
      const val1 = d.aum;
      const val2 = d.minCommitment;
      const val3 = d.targetReturn;
      const val4 = d.assetClass === 'Hedge Funds' ? d.strategy : (d.strategy === 'Venture Capital' || d.strategy === 'Growth Equity' ? d.stage : d.closing);

      const prog = d.progress !== null ? `
        <div class="progress-bar-wrap" style="margin-top:20px;">
          <div class="progress-bar-fill" style="width:${d.progress}%;"></div>
        </div>
        <div class="progress-label">
          <span>${d.progress}% allocated</span>
          <span>${d.vintage} Vintage</span>
        </div>` : `<div style="height: 31px; margin-top: 20px; font-size:9px; color:var(--silver); display:flex; align-items:flex-end;"><span>${d.vintage} Vintage · ${d.liquidity} Liquidity</span></div>`;

      return `
        <div class="deal-card">
          <div class="deal-card-status">
            <span class="status-dot ${statusClass}"></span>
            <span class="${statusTextClass}">${d.status}</span>
          </div>
          <div class="deal-card-tag" style="background:${d.tagBg}; color:var(--obsidian);">${d.assetClass}</div>
          <div class="deal-card-title">${d.title}</div>
          <div class="deal-card-sub">${d.sponsor} · ${d.domicile}</div>
          <div class="deal-card-divider"></div>
          <div class="deal-card-meta">
            <div>
              <div class="deal-meta-label">${label1}</div>
              <div class="deal-meta-value">${val1}</div>
            </div>
            <div>
              <div class="deal-meta-label">${label2}</div>
              <div class="deal-meta-value">${val2}</div>
            </div>
            <div>
              <div class="deal-meta-label">${label3}</div>
              <div class="deal-meta-value">${val3}</div>
            </div>
            <div>
              <div class="deal-meta-label">${label4}</div>
              <div class="deal-meta-value">${val4}</div>
            </div>
          </div>
          ${prog}
        </div>`;
    }).join('');
  }

  renderChips();
}

function renderChips() {
  const container = document.getElementById('active-chips-container');
  if (!container) return;

  container.innerHTML = '';
  
  const labelMap = {
    assetClass: 'Asset Class',
    strategy: 'Strategy',
    stage: 'Stage',
    income: 'Income',
    liquidity: 'Liquidity',
    risk: 'Risk',
    geography: 'Geography',
    currency: 'Currency',
    vintage: 'Vintage'
  };

  Object.keys(activeFilters).forEach(key => {
    if (key !== 'search' && activeFilters[key]) {
      const chip = document.createElement('div');
      chip.className = 'filter-chip';
      chip.innerHTML = `<span>${labelMap[key]}: ${activeFilters[key]}</span> <span class="filter-chip-remove">&times;</span>`;
      chip.onclick = () => removeFilter(key);
      container.appendChild(chip);
    }
  });
}

function handleSearchChange() {
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) {
    activeFilters.search = searchInput.value;
    renderCatalog();
  }
}

function handleAssetClassChange() {
  const select = document.getElementById('filter-asset-class');
  if (select) {
    activeFilters.assetClass = select.value;
    activeFilters.strategy = '';
    updateStrategyDropdown();
    renderCatalog();
  }
}

function handleStrategyChange() {
  const select = document.getElementById('filter-strategy');
  if (select) {
    activeFilters.strategy = select.value;
    renderCatalog();
  }
}

function handleAdvancedFilterChange(name) {
  const select = document.getElementById('filter-' + name);
  if (select) {
    activeFilters[name] = select.value;
    renderCatalog();
  }
}

function handleSortChange() {
  const select = document.getElementById('catalog-sort');
  if (select) {
    activeSort = select.value;
    renderCatalog();
  }
}

function removeFilter(name) {
  activeFilters[name] = '';
  const select = document.getElementById('filter-' + name);
  if (select) select.value = '';
  
  if (name === 'assetClass') {
    activeFilters.strategy = '';
    const stratSelect = document.getElementById('filter-strategy');
    if (stratSelect) stratSelect.value = '';
    updateStrategyDropdown();
  }
  
  renderCatalog();
}

// Global exposure wrapper function for testing
window.removeFilter = removeFilter;
window.resetAllFilters = resetAllFilters;
window.toggleAdvancedFilters = toggleAdvancedFilters;
window.handleAdvancedFilterChange = handleAdvancedFilterChange;

function resetAllFilters() {
  Object.keys(activeFilters).forEach(key => {
    activeFilters[key] = '';
    const select = document.getElementById('filter-' + key);
    if (select) select.value = '';
  });
  
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) searchInput.value = '';
  
  updateStrategyDropdown();
  renderCatalog();
}

function toggleAdvancedFilters(show) {
  const drawer = document.getElementById('filters-drawer');
  const overlay = document.getElementById('filters-drawer-overlay');
  
  if (show) {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
  } else {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }
}

// ── PORTFOLIO VIEW CONTROLS & ANALYTICS ──
let portfolioCharts = {};
let currentPortfolioView = 'list';

function setPortfolioView(view) {
  currentPortfolioView = view;
  const listEl = document.getElementById('portfolio-list-view');
  const analyticsEl = document.getElementById('portfolio-analytics-view');
  const listBtn = document.getElementById('port-view-list-btn');
  const analyticsBtn = document.getElementById('port-view-analytics-btn');
  
  if (view === 'list') {
    if (listEl) listEl.style.display = 'block';
    if (analyticsEl) analyticsEl.style.display = 'none';
    if (listBtn) listBtn.classList.add('active');
    if (analyticsBtn) analyticsBtn.classList.remove('active');
  } else {
    if (listEl) listEl.style.display = 'none';
    if (analyticsEl) analyticsEl.style.display = 'block';
    if (listBtn) listBtn.classList.remove('active');
    if (analyticsBtn) analyticsBtn.classList.add('active');
    setTimeout(renderPortfolioAnalytics, 50);
  }
}

window.setPortfolioView = setPortfolioView;

function renderPortfolioAnalytics() {
  const positions = userPositions[currentRole] || [];
  const emptyEl = document.getElementById('portfolio-analytics-empty');
  const chartsGrid = document.getElementById('portfolio-analytics-view');
  
  if (positions.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    if (chartsGrid) {
      chartsGrid.querySelectorAll('.metrics-grid-3, .metrics-grid-4').forEach(el => el.style.display = 'none');
    }
    return;
  }
  
  if (emptyEl) emptyEl.style.display = 'none';
  if (chartsGrid) {
    chartsGrid.querySelectorAll('.metrics-grid-3, .metrics-grid-4').forEach(el => el.style.display = 'grid');
  }

  Object.keys(portfolioCharts).forEach(key => {
    if (portfolioCharts[key]) {
      portfolioCharts[key].destroy();
    }
  });
  portfolioCharts = {};

  const aggregate = (dimension) => {
    const counts = {};
    let total = 0;
    positions.forEach(p => {
      const val = p.committed || 0;
      const key = p[dimension] || 'Other';
      counts[key] = (counts[key] || 0) + val;
      total += val;
    });
    
    const labels = Object.keys(counts);
    const data = labels.map(l => parseFloat(((counts[l] / total) * 100).toFixed(1)));
    return { labels, data };
  };

  const colors = [GOLD, BLUE, GREEN, PURPLE, SILVER, GOLD_L, RED];

  const createDoughnut = (canvasId, dimension) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const { labels, data } = aggregate(dimension);
    portfolioCharts[canvasId] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 8,
              font: { size: 9 },
              color: '#8a8a8a'
            }
          }
        }
      }
    });
  };

  createDoughnut('chart-port-asset-class', 'assetClass');
  createDoughnut('chart-port-strategy', 'strategy');
  createDoughnut('chart-port-geo', 'geography');
  createDoughnut('chart-port-currency', 'currency');
  createDoughnut('chart-port-liquidity', 'liquidity');
  createDoughnut('chart-port-risk', 'risk');
  createDoughnut('chart-port-income', 'income');
}

// ── DOM CONTENT LOADED EVENT FOR INITIALIZATION ──
document.addEventListener('DOMContentLoaded', () => {
  // 1. Set date if element exists
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) dateEl.textContent = dateStr;

  // 2. Identify the active page
  const isPlatformPage = document.getElementById('page-platform') !== null;
  const isLoginPage = document.getElementById('page-login') !== null;

  // 3. Parse query param for role
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');

  if (isPlatformPage) {
    const sessionUser = sessionStorage.getItem('currentUser');
    if (!sessionUser) {
      window.location.href = 'login.html';
      return;
    }
    const user = JSON.parse(sessionUser);
    currentRole = user.role;
    configureDashboard(user.role);

    // Read initial tab from URL hash if present
    const hashTab = window.location.hash.substring(1);
    const initialTab = (hashTab && document.getElementById('tab-' + hashTab)) ? hashTab : 'dashboard';
    setTab(initialTab);

    setTimeout(initCharts, 100);

    // Initialize Catalogue Filters & Vintage Options
    updateStrategyDropdown();
    updateVintageDropdown();
    renderCatalog();

    // Listen for back/forward browser navigation
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash && document.getElementById('tab-' + hash)) {
        setTab(hash);
      }
    });
  } else if (isLoginPage) {
    initUserAccounts();
    const activeRole = roleParam && roles[roleParam] ? roleParam : 'allocator';
    selectRole(activeRole);
  }

  // 4. Platform Tab Buttons setup
  document.querySelectorAll('.ptab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabsGroup = btn.closest('.platform-tabs');
      if (tabsGroup) {
        tabsGroup.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');
    });
  });

  // 5. Entity Tabs setup
  document.querySelectorAll('.entity-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabsGroup = btn.closest('.entity-tabs');
      if (tabsGroup) {
        tabsGroup.querySelectorAll('.entity-tab').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');
    });
  });

  // 6. Period Buttons setup
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const periodGroup = btn.closest('.report-period-nav');
      if (periodGroup) {
        periodGroup.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');
    });
  });

  // 7. Stats Number Count-Up Animation
  const statsElements = document.querySelectorAll('.stat-num');
  if (statsElements.length > 0) {
    const animateValue = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1500;
      const startTime = performance.now();
      const isDecimal = target % 1 !== 0;

      const run = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = progress * (2 - progress); // easeOutQuad
        const current = ease * target;
        
        el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(run);
        } else {
          el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
        }
      };
      requestAnimationFrame(run);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    statsElements.forEach(el => statsObserver.observe(el));
  }

  // Close notification and profile dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    // Notification dropdown
    const dropdown = document.getElementById('notif-dropdown');
    const bell = document.querySelector('.topbar-notif-bell');
    if (dropdown && dropdown.classList.contains('active')) {
      if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    }

    // Profile dropdown
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileBtn = document.querySelector('.topbar-profile');
    if (profileDropdown && profileDropdown.classList.contains('active')) {
      if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
        profileDropdown.classList.remove('active');
      }
    }
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('contact-submit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Processing Submission...</span>';
      }
      
      const payload = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        organization: document.getElementById('contact-org').value || '',
        message: document.getElementById('contact-message').value || '',
        newsletter: document.getElementById('newsletter-optin').checked
      };
      
      fetch('http://localhost:3000/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json().then(data => ({ status: response.status, data })))
      .then(({ status, data }) => {
        if (status === 200 && data.success) {
          const successCard = document.createElement('div');
          successCard.style.cssText = 'background: rgba(201, 169, 110, 0.05); border: 1px solid var(--gold-line); padding: 32px; border-radius: 4px; animation: fadeUp 0.4s ease; max-width: 640px; margin-top: 20px;';
          successCard.innerHTML = `
            <h3 style="color:var(--gold); font-size: 20px; font-family:\'Cormorant Garamond\', serif; text-transform: none; letter-spacing: 0.02em; margin-bottom: 12px; font-weight:400; text-align: left;">Enquiry Submitted Confidentially</h3>
            <p style="color:var(--silver); font-size:13.5px; line-height:1.7; margin-bottom:0; text-align: left;">Thank you for requesting an introduction. Your submission has been securely logged. A member of the GIH Compliance Committee will contact your institution within 24 hours to proceed with suitability credentials review.</p>
          `;
          contactForm.parentNode.replaceChild(successCard, contactForm);
        } else {
          throw new Error(data.message || 'Server error occurred.');
        }
      })
      .catch(error => {
        console.error('Submission failed:', error);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Enquiry</span>';
        }
        alert('Failed to connect to the enquiry service. Details: ' + error.message);
      });
    });
  }

  // 8. Custom Cursor Logic for Landing Page
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = cursor ? cursor.querySelector('.cursor-dot') : null;
  const cursorRing = cursor ? cursor.querySelector('.cursor-ring') : null;

  if (cursor && cursorDot && cursorRing && window.innerWidth > 992) {
    let mouseX = 0;
    let mouseY = 0;
    
    // Dot position (tracks faster)
    let dotX = 0;
    let dotY = 0;
    
    // Ring position (tracks slower for trailing delay animation)
    let ringX = 0;
    let ringY = 0;

    // Ring rotation angle (increments each frame for spinning animation)
    let ringAngle = 0;

    // Show cursor on first mouse movement
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor.style.opacity === '0' || !document.body.classList.contains('landing-cursor-active')) {
        cursor.style.opacity = '1';
        document.body.classList.add('landing-cursor-active');
      }
    });

    // Smooth follow loop using independent LERP variables
    const render = () => {
      // Lerp logic for inner dot (faster follow)
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      
      // Lerp logic for outer ring (slower follow = trailing delay animation)
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;

      // Increment rotation angle (~1.5 deg per frame = full spin in ~4s at 60fps)
      ringAngle += 1.5;
      
      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${ringAngle}deg)`;
      
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Hover state over links and buttons
    const attachHoverEvents = () => {
      const interactiveElements = document.querySelectorAll('a, button, .membership-card, input, textarea, label.form-check');
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverClass);
        el.removeEventListener('mouseleave', removeHoverClass);
        
        el.addEventListener('mouseenter', addHoverClass);
        el.addEventListener('mouseleave', removeHoverClass);
      });
    };

    function addHoverClass() {
      cursor.classList.add('hover');
    }

    function removeHoverClass() {
      cursor.classList.remove('hover');
    }

    attachHoverEvents();

    // Re-attach hover events if DOM dynamic updates occur (like form replacement)
    const observer = new MutationObserver(() => {
      attachHoverEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Handle cursor leaving the screen
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
  }
});

// Toggle mobile navigation overlay
function toggleMobileMenu() {
  const overlay = document.getElementById('nav-mobile-overlay');
  const hamburger = document.getElementById('nav-hamburger');
  if (overlay) overlay.classList.toggle('active');
  if (hamburger) hamburger.classList.toggle('active');
}

window.toggleMobileMenu = toggleMobileMenu;
