/* ==========================================================================
   BROKERA — role-based dashboard
   The SRS calls for one account to hold multiple roles with a client-side
   role switcher (nav only — backend authorization is still evaluated per
   actual assigned role, per BR-16). This page switches which panel is
   shown; it doesn't re-authenticate.

   Field names used, per the API Field Naming Standard doc:
     GET /api/goods/my-listings        -> seller's own goods
     GET /api/claims?brokerId={id}     -> broker's claims
     GET /api/deals?userId={id}        -> deals involving a user (buyer or broker)
     GET /api/notifications/{userId}   -> { notificationId, message, isRead, ... }
     PUT /api/notifications/{id}       -> marks one as read

   NOTE: there's no /api/reports or admin-summary endpoint in the naming
   standard yet, so the Admin panel below is built from sample counts —
   flag with the backend teammate once platform-wide report endpoints
   (FR-ADMIN-04) are defined.
   ========================================================================== */

const money4 = (n) => 'TZS ' + Number(n).toLocaleString('en-US');

async function fetchJson4(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('failed');
    return await res.json();
  } catch (err) {
    return fallback;
  }
}

const SAMPLE = {
  buyerDeals: [
    { dealId: 71, good: { title: 'Solar panel kit, 200W' }, status: 'NEGOTIATION', updated: '2 hours ago' },
    { dealId: 68, good: { title: 'Double-door fridge' }, status: 'PAYMENT_PENDING', updated: '1 day ago' }
  ],
  brokerClaims: [
    { claimId: 501, good: { title: 'Solar panel kit, 200W' }, expiresAt: '2026-09-19T09:00:00Z' },
    { claimId: 502, good: { title: 'Toyota Hilux, 2014' }, expiresAt: '2026-09-16T09:00:00Z' }
  ],
  brokerDeals: [
    { dealId: 61, good: { title: 'Rice mill, 1 ton/hr' }, status: 'COMPLETED', commission: 280000 }
  ],
  sellerListings: [
    { goodId: 301, title: 'Hand-woven basket set', status: 'AVAILABLE' },
    { goodId: 302, title: 'Rice mill, 1 ton/hr', status: 'CLAIMED' },
    { goodId: 303, title: 'Office desk set (4)', status: 'SOLD' }
  ],
  notificationsByRole: {
    buyer: [
      { notificationId: 11, message: 'Your broker sent a counter-offer on "Solar panel kit, 200W".', isRead: false, createdAt: '2026-09-14T08:00:00Z' },
      { notificationId: 12, message: 'Payment instructions are ready for "Double-door fridge".', isRead: true, createdAt: '2026-09-13T09:00:00Z' }
    ],
    broker: [
      { notificationId: 21, message: 'A buyer sent an offer on "Solar panel kit, 200W".', isRead: false, createdAt: '2026-09-14T08:00:00Z' },
      { notificationId: 22, message: 'Claim on "Office desk set (4)" expires in 1 day.', isRead: true, createdAt: '2026-09-12T09:00:00Z' }
    ],
    seller: [
      { notificationId: 31, message: 'Your listing "Rice mill, 1 ton/hr" was claimed by a broker.', isRead: false, createdAt: '2026-09-14T10:00:00Z' },
      { notificationId: 32, message: 'Your broker is reviewing a buyer offer.', isRead: true, createdAt: '2026-09-13T09:00:00Z' }
    ]
  },
  adminStats: { totalUsers: 214, activeListings: 58, openDisputes: 2, commissionThisMonth: 1840000 }
};

function relTime(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return 'moments ago';
  if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  const days = Math.floor(hours / 24);
  return days + (days === 1 ? ' day ago' : ' days ago');
}

const dashMain = document.getElementById('dash-main-content');
if (dashMain) {
  const userId = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName') || 'BROKERA member';
  const savedRole = sessionStorage.getItem('userRole') || 'buyer';
  let userRoles = ['buyer'];
  try { userRoles = JSON.parse(sessionStorage.getItem('userRoles') || '["buyer"]'); } catch (err) { /* use buyer fallback */ }
  const tabs = document.querySelectorAll('.role-tabs button');
  let notifications = [];

  async function loadNotifications() {
    const fallback = SAMPLE.notificationsByRole[savedRole] || [];
    notifications = userId
      ? await fetchJson4('/api/notifications/' + userId, fallback)
      : fallback;
  }

  function notifPanelHtml() {
    if (!notifications.length) {
      return '<div class="empty-panel">No notifications yet.</div>';
    }
    return '<div class="notif-list">' + notifications.slice(0, 6).map((n) => `
      <div class="notif-item ${n.isRead ? 'read' : ''}" data-notif-id="${n.notificationId}">
        <span class="notif-dot"></span>
        <div>
          <div>${n.message}</div>
          <div class="notif-time">${n.createdAt ? relTime(n.createdAt) : ''}</div>
        </div>
      </div>
    `).join('') + '</div>';
  }

  function bindNotifClicks() {
    dashMain.querySelectorAll('.notif-item[data-notif-id]').forEach((item) => {
      item.addEventListener('click', async () => {
        if (item.classList.contains('read')) return;
        item.classList.add('read');
        await fetchJson4('/api/notifications/' + item.dataset.notifId + '?_method=PUT', {});
      });
    });
  }

  function spotlightHtml(role) {
    const content = {
      buyer: ['Private buying, made simple', 'Discover goods, send offers, and keep every conversation inside the broker channel.', 'Buyer workspace'],
      broker: ['Your trust is your advantage', 'Verified brokers get first access to new claims and a clear view of every active negotiation.', 'Broker workspace'],
      seller: ['Your goods, professionally handled', 'Stay informed on offers and handovers while your private identity remains protected.', 'Seller workspace'],
      admin: ['Platform control centre', 'Monitor activity, disputes, and marketplace health from one secure overview.', 'Admin workspace']
    }[role];
    return `<section class="dash-spotlight"><div class="dash-spotlight-copy"><span class="dash-spotlight-kicker">${content[2]}</span><h2>${content[0]}</h2><p>${content[1]}</p></div><div class="dash-spotlight-visual"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85" alt="BROKERA marketplace collaboration"></div><span class="dash-spotlight-badge">Private by design</span></section>`;
  }

  function renderBuyer() {
    const deals = SAMPLE.buyerDeals;
    dashMain.innerHTML = `
      <div class="dash-head">
        <div><h1>Welcome back, ${userName}</h1><p>Your offers and deals stay private from sellers.</p></div>
        <a href="pool.html" class="btn btn-primary">Browse the pool</a>
      </div>
      ${spotlightHtml('buyer')}
      <div class="stat-grid">
        <div class="stat-card"><div class="num">${deals.length}</div><div class="label">Active deals</div></div>
        <div class="stat-card"><div class="num">1</div><div class="label">Offers awaiting response</div></div>
        <div class="stat-card"><div class="num">3</div><div class="label">Completed purchases</div></div>
        <div class="stat-card"><div class="num">${notifications.filter(n => !n.isRead).length}</div><div class="label">Unread notifications</div></div>
      </div>
      <div class="dash-columns">
        <div class="panel">
          <div class="panel-head"><h2>My deals</h2><a href="pool.html">Browse more</a></div>
          ${deals.map((d) => `
            <div class="activity-row">
              <span class="tag tag-claimed">${d.status.replace('_', ' ')}</span>
              <div><div class="title">${d.good.title}</div></div>
              <div class="right">${d.updated}</div>
            </div>
          `).join('')}
        </div>
        <div class="panel">
          <div class="panel-head"><h2>Notifications</h2></div>
          ${notifPanelHtml()}
        </div>
      </div>
    `;
    bindNotifClicks();
  }

  function renderBroker() {
    const claims = SAMPLE.brokerClaims;
    const deals = SAMPLE.brokerDeals;
    dashMain.innerHTML = `
      <div class="dash-head">
        <div><h1>Broker desk</h1><p>Your claims and closed deals.</p></div>
        <a href="broker-pool.html" class="btn btn-primary">Available pool</a>
      </div>
      ${spotlightHtml('broker')}
      <section class="panel broker-pool-preview" aria-label="Available Pool preview">
        <div class="panel-head"><h2>Available Pool</h2><span class="board-live">Updated moments ago</span></div>
        <div class="board-row"><span class="tag tag-available">Available</span><span class="board-item">40 bags of maize<span>Mbeya · Agriculture</span></span><span class="board-meta">TZS 3,200,000</span></div>
        <div class="board-row"><span class="tag tag-available">Available</span><span class="board-item">Solar panel kit, 200W<span>Dodoma · Electronics</span></span><span class="board-meta">TZS 610,000</span></div>
        <div class="board-row"><span class="tag tag-available">Available</span><span class="board-item">Toyota Hilux, 2014<span>Dar es Salaam · Vehicles</span></span><span class="board-meta">TZS 38,500,000</span></div>
      </section>
      <div class="verification-strip"><span class="verification-icon">&#10003;</span><div><strong>NIDA verification status</strong><small>Verified broker identity stays private from buyers and sellers.</small></div><span class="tag tag-available">Verified</span></div>
      <div class="stat-grid">
        <div class="stat-card"><div class="num">${claims.length}</div><div class="label">Active claims</div></div>
        <div class="stat-card"><div class="num">1</div><div class="label">Expiring within 2 days</div></div>
        <div class="stat-card"><div class="num">${deals.length}</div><div class="label">Deals completed</div></div>
        <div class="stat-card"><div class="num">${money4(deals.reduce((s, d) => s + (d.commission || 0), 0))}</div><div class="label">Commission earned</div></div>
      </div>
      <div class="dash-columns">
        <div class="panel">
          <div class="panel-head"><h2>Active claims</h2><a href="claims.html">Manage all</a></div>
          ${claims.map((c) => `
            <div class="activity-row">
              <span class="tag tag-claimed">Claimed</span>
              <div><div class="title">${c.good.title}</div></div>
              <div class="right">${timeRemainingShort(c.expiresAt)}</div>
            </div>
          `).join('')}
        </div>
        <div class="panel">
          <div class="panel-head"><h2>Notifications</h2></div>
          ${notifPanelHtml()}
        </div>
      </div>
    `;
    bindNotifClicks();
  }

  function timeRemainingShort(iso) {
    const diffMs = new Date(iso).getTime() - Date.now();
    if (diffMs <= 0) return 'Expired';
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(hours / 24);
    return days >= 1 ? days + 'd left' : hours + 'h left';
  }

  function renderSeller() {
    const listings = SAMPLE.sellerListings;
    dashMain.innerHTML = `
      <div class="dash-head">
        <div><h1>Seller overview</h1><p>Your listings, at a glance.</p></div>
        <a href="post-listing.html" class="btn btn-primary">Post a listing</a>
      </div>
      ${spotlightHtml('seller')}
      <div class="stat-grid">
        <div class="stat-card"><div class="num">${listings.filter(l => l.status === 'AVAILABLE').length}</div><div class="label">Available</div></div>
        <div class="stat-card"><div class="num">${listings.filter(l => l.status === 'CLAIMED').length}</div><div class="label">Claimed</div></div>
        <div class="stat-card"><div class="num">${listings.filter(l => l.status === 'SOLD').length}</div><div class="label">Sold</div></div>
        <div class="stat-card"><div class="num">${listings.length}</div><div class="label">Total listings</div></div>
      </div>
      <div class="dash-columns">
        <div class="panel">
          <div class="panel-head"><h2>My listings</h2><a href="my-listings.html">Manage all</a></div>
          ${listings.map((l) => {
            const tagClass = l.status === 'SOLD' ? 'tag-sold' : l.status === 'CLAIMED' ? 'tag-claimed' : 'tag-available';
            return `
              <div class="activity-row">
                <span class="tag ${tagClass}">${l.status.charAt(0) + l.status.slice(1).toLowerCase()}</span>
                <div><div class="title">${l.title}</div></div>
                <div class="right"></div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="panel">
          <div class="panel-head"><h2>Notifications</h2></div>
          ${notifPanelHtml()}
        </div>
      </div>
    `;
    bindNotifClicks();
  }

  function renderAdmin() {
    const s = SAMPLE.adminStats;
    dashMain.innerHTML = `
      <div class="dash-head">
        <div><h1>Platform overview</h1><p>Sample figures — wire up once report endpoints exist (see README).</p></div>
      </div>
      ${spotlightHtml('admin')}
      <div class="stat-grid">
        <div class="stat-card"><div class="num">${s.totalUsers}</div><div class="label">Registered users</div></div>
        <div class="stat-card"><div class="num">${s.activeListings}</div><div class="label">Active listings</div></div>
        <div class="stat-card"><div class="num">${s.openDisputes}</div><div class="label">Open disputes</div></div>
        <div class="stat-card"><div class="num">${money4(s.commissionThisMonth)}</div><div class="label">Commission this month</div></div>
      </div>
      <div class="dash-columns">
        <div class="panel">
          <div class="panel-head"><h2>Quick actions</h2></div>
          <div class="activity-row"><span></span><div><div class="title">Manage categories</div><div class="meta">Add, edit, or retire categories</div></div><div class="right"></div></div>
          <div class="activity-row"><span></span><div><div class="title">Commission rules</div><div class="meta">Category rates &amp; bounds</div></div><div class="right"></div></div>
          <div class="activity-row"><span></span><div><div class="title">Disputes queue</div><div class="meta">${s.openDisputes} open</div></div><div class="right"></div></div>
          <div class="activity-row"><span></span><div><div class="title">Audit log</div><div class="meta">Filterable system events</div></div><div class="right"></div></div>
        </div>
        <div class="panel">
          <div class="panel-head"><h2>Notifications</h2></div>
          ${notifPanelHtml()}
        </div>
      </div>
    `;
    bindNotifClicks();
  }

  const renderers = { buyer: renderBuyer, broker: renderBroker, seller: renderSeller, admin: renderAdmin };

  function activate(role) {
    tabs.forEach((t) => t.classList.toggle('active', t.dataset.role === role));
    renderers[role]();
  }

  tabs.forEach((tab) => {
    tab.hidden = !userRoles.includes(tab.dataset.role);
    tab.addEventListener('click', () => activate(tab.dataset.role));
  });

  loadNotifications().then(() => activate(renderers[savedRole] ? savedRole : 'buyer'));
}
