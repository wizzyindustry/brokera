/* ==========================================================================
   BROKERA — broker flow: claim goods from the pool, manage active claims
   Field names follow the API Field Naming Standard doc exactly:
     GET  /api/goods                 -> unclaimed pool, same shape as buyer flow
     POST /api/claims                -> request { goodId, brokerId, durationHours? }
                                         response adds { claimId, claimedAt,
                                         expiresAt, status }
     GET  /api/claims?brokerId={id}  -> list of claim objects (as above)
     PUT  /api/claims/{id}           -> request { reason }, releases a claim
   ========================================================================== */

const money2 = (amount) => 'TZS ' + Number(amount).toLocaleString('en-US');

function currentBrokerId() {
  return sessionStorage.getItem('userId');
}

async function fetchJson2(url, options, fallback) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Request failed');
    return await res.json();
  } catch (err) {
    return fallback;
  }
}

/* Sample data — used only when the API isn't reachable yet, so the page
   still renders sensibly while previewing as static files. */
const SAMPLE_POOL = [
  { goodId: 201, title: 'Maize milling machine', description: 'Diesel-powered, serviced last month.', price: 4200000, categoryId: 6, location: 'Iringa', status: 'AVAILABLE' },
  { goodId: 202, title: 'Container house, 20ft', description: 'Insulated, ready for delivery.', price: 9800000, categoryId: 5, location: 'Morogoro', status: 'AVAILABLE' },
  { goodId: 203, title: 'Motorbike, Bajaj Boxer', description: '2021 model, low mileage.', price: 2650000, categoryId: 4, location: 'Dar es Salaam', status: 'AVAILABLE' }
];

const SAMPLE_CLAIMS = [
  { claimId: 501, goodId: 102, brokerId: 9001, status: 'ACTIVE', claimedAt: '2026-09-11T09:00:00Z', expiresAt: '2026-09-16T09:00:00Z', good: { title: 'Solar panel kit, 200W', price: 610000 } },
  { claimId: 502, goodId: 103, brokerId: 9001, status: 'ACTIVE', claimedAt: '2026-09-13T09:00:00Z', expiresAt: '2026-09-14T09:00:00Z', good: { title: 'Toyota Hilux, 2014', price: 38500000 } }
];

function timeRemaining(expiresAtIso) {
  const diffMs = new Date(expiresAtIso).getTime() - Date.now();
  if (diffMs <= 0) return 'Expired';
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(hours / 24);
  if (days >= 1) return days + (days === 1 ? ' day left' : ' days left');
  return hours + (hours === 1 ? ' hour left' : ' hours left');
}

/* ---------- Broker pool: claim a listing ---------- */

const brokerGrid = document.getElementById('broker-goods-grid');
if (brokerGrid) {
  async function init() {
    const goods = await fetchJson2('/api/goods', undefined, SAMPLE_POOL);

    if (!goods.length) {
      brokerGrid.innerHTML = '<div class="empty-state">Nothing in the pool right now — check back soon.</div>';
      return;
    }

    brokerGrid.innerHTML = goods.map((good) => `
      <div class="good-card" style="cursor:default;">
        <div class="good-card-media">Photo</div>
        <div class="good-card-body">
          <h3>${good.title}</h3>
          <div class="good-card-foot">
            <span class="good-card-price">${money2(good.price)}</span>
          </div>
          <p class="good-card-loc">${good.location}</p>
          <div class="good-card-claim">
            <button type="button" class="btn btn-primary" data-good-id="${good.goodId}">Claim this listing</button>
          </div>
        </div>
      </div>
    `).join('');

    brokerGrid.querySelectorAll('button[data-good-id]').forEach((button) => {
      button.addEventListener('click', async () => {
        const brokerId = currentBrokerId();
        if (!brokerId) {
          alert('Log in as a verified broker to claim listings.');
          return;
        }

        button.disabled = true;
        button.textContent = 'Claiming…';

        const data = await fetchJson2('/api/claims', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goodId: Number(button.dataset.goodId), brokerId: Number(brokerId) })
        }, { status: 'ACTIVE' });

        if (data.status === 'ACTIVE' || data.claimId) {
          button.textContent = 'Claimed';
          button.disabled = true;
        } else {
          button.textContent = 'Already claimed';
          button.disabled = true;
        }
      });
    });
  }

  init();
}

/* ---------- My claims: view + release ---------- */

const claimsList = document.getElementById('claims-list');
if (claimsList) {
  async function renderClaims() {
    const brokerId = currentBrokerId();
    const claims = await fetchJson2(
      brokerId ? '/api/claims?brokerId=' + brokerId : null,
      undefined,
      SAMPLE_CLAIMS
    );

    if (!claims.length) {
      claimsList.innerHTML = '<div class="empty-state">You don\u2019t have any active claims. Head to the pool to claim a listing.</div>';
      return;
    }

    claimsList.innerHTML = claims.map((claim) => `
      <div class="claim-row" data-claim-id="${claim.claimId}">
        <span class="tag ${claim.status === 'EXPIRED' ? 'tag-expired' : 'tag-claimed'}">${claim.status === 'EXPIRED' ? 'Expired' : 'Active'}</span>
        <div class="claim-item">
          <h3>${claim.good ? claim.good.title : 'Good #' + claim.goodId}</h3>
          <p>${claim.good ? money2(claim.good.price) : ''}</p>
        </div>
        <div class="claim-timer">
          <strong>${timeRemaining(claim.expiresAt)}</strong>
          until hold expires
        </div>
        <div class="claim-actions">
          <button type="button" data-release="${claim.claimId}" ${claim.status === 'EXPIRED' ? 'disabled' : ''}>Release claim</button>
        </div>
      </div>
    `).join('');

    claimsList.querySelectorAll('button[data-release]').forEach((button) => {
      button.addEventListener('click', async () => {
        const reason = prompt('Reason for releasing this claim early (optional):') || '';
        button.disabled = true;
        button.textContent = 'Releasing…';

        await fetchJson2('/api/claims/' + button.dataset.release, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason })
        }, {});

        renderClaims();
      });
    });
  }

  renderClaims();
}
