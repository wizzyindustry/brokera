/* ==========================================================================
   BROKERA — buyer flow: browse pool, listing detail, make an offer
   Field names follow the API Field Naming Standard doc exactly:
    GET  /api/goods        -> buyer-safe { goodId, title, description, price,
                  categoryId, claimedByBrokerId,
                                  location, status }
     GET  /api/goods/{id}   -> same shape, single object
     GET  /api/categories   -> { categoryId, name, description, status }
     POST /api/offers       -> request { goodId, buyerId, offerAmount },
                                response adds { offerId, status, createdAt }
   ========================================================================== */

const money = (amount) =>
  'TZS ' + Number(amount).toLocaleString('en-US');

/* Sample data used only if the API isn't reachable yet (e.g. previewing
   this page as a static file, or the backend isn't running). Every field
   name matches the real API response so swapping in live data is a no-op. */
const SAMPLE_CATEGORIES = [
  { categoryId: 1, name: 'Electronics' },
  { categoryId: 2, name: 'Appliances' },
  { categoryId: 3, name: 'Fashion & clothing' },
  { categoryId: 4, name: 'Vehicles' },
  { categoryId: 5, name: 'Property' },
  { categoryId: 6, name: 'Agriculture' },
  { categoryId: 7, name: 'Other' }
];

// Buyer-facing data intentionally contains no seller identity or contact fields.
const SAMPLE_GOODS = [
  { goodId: 101, title: '40 bags of maize', description: 'Fresh harvest, dry-stored, ready for pickup or delivery within the region.', price: 3200000, categoryId: 6, location: 'Mbeya', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85' },
  { goodId: 102, title: 'Solar panel kit, 200W', description: 'Complete kit with charge controller and mounting brackets, barely used.', price: 610000, categoryId: 1, location: 'Dodoma', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=900&q=85' },
  { goodId: 103, title: 'Toyota Hilux, 2014', description: 'Single cab, diesel, well maintained with full service history.', price: 38500000, categoryId: 4, location: 'Dar es Salaam', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85' },
  { goodId: 104, title: 'Double-door fridge', description: 'Energy-efficient, 2 years old, minor cosmetic wear.', price: 950000, categoryId: 2, location: 'Arusha', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85' },
  { goodId: 105, title: '3-bedroom plot, Chalinze', description: 'Fenced plot with title deed in progress, water access on site.', price: 21000000, categoryId: 5, location: 'Chalinze', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=85' },
  { goodId: 106, title: 'Tailored kitenge set', description: 'Custom-made, size M, worn once.', price: 85000, categoryId: 3, location: 'Mwanza', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85' },
  { goodId: 107, title: 'Business laptop, 16GB RAM', description: 'Fast, reliable laptop suited for study, design, and office work.', price: 1450000, categoryId: 1, location: 'Dar es Salaam', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85' },
  { goodId: 108, title: 'Automatic wristwatch', description: 'Classic stainless steel watch with presentation box.', price: 280000, categoryId: 7, location: 'Dodoma', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85' },
  { goodId: 109, title: 'Leather office chair', description: 'Comfortable adjustable chair for a home or professional office.', price: 420000, categoryId: 7, location: 'Arusha', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85' },
  { goodId: 110, title: 'Running shoes, new', description: 'Lightweight trainers, size 42, unworn and boxed.', price: 180000, categoryId: 3, location: 'Mwanza', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85' },
  { goodId: 111, title: 'Android smartphone', description: 'Dual-SIM smartphone with a sharp camera and long battery life.', price: 720000, categoryId: 1, location: 'Morogoro', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85' },
  { goodId: 112, title: 'Coffee shop equipment set', description: 'Compact starter set for a small cafe or campus business.', price: 1850000, categoryId: 2, location: 'Morogoro', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { goodId: 113, title: 'USB study lamp', description: 'Compact LED desk lamp with adjustable brightness for late study sessions.', price: 45000, categoryId: 1, location: 'Dodoma', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85' },
  { goodId: 114, title: 'Canvas backpack', description: 'Durable everyday backpack for books, laptop, and campus essentials.', price: 95000, categoryId: 3, location: 'Dar es Salaam', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' },
  { goodId: 115, title: 'Bluetooth speaker', description: 'Portable wireless speaker with clear sound and all-day battery.', price: 120000, categoryId: 1, location: 'Mwanza', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85' },
  { goodId: 116, title: 'Kitchen starter set', description: 'Useful cookware bundle for a new room, apartment, or student house.', price: 165000, categoryId: 2, location: 'Arusha', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85' },
  { goodId: 117, title: 'Study desk', description: 'Compact wooden desk with space for a laptop and books.', price: 230000, categoryId: 7, location: 'Morogoro', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=85' },
  { goodId: 118, title: 'Campus bicycle', description: 'Well-maintained commuter bicycle for short trips around town.', price: 295000, categoryId: 4, location: 'Dodoma', status: 'AVAILABLE', claimedByBrokerId: null, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85' }
];

async function fetchJson(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Request failed');
    return await res.json();
  } catch (err) {
    return fallback;
  }
}

/* ---------- Browse page ---------- */

const goodsGrid = document.getElementById('goods-grid');
if (goodsGrid) {
  let allGoods = [];
  let categoryById = {};

  const searchInput = document.getElementById('pool-search');
  const categorySelect = document.getElementById('pool-category');
  const sortSelect = document.getElementById('pool-sort');
  const countEl = document.getElementById('pool-count');

  function render() {
    const query = (searchInput.value || '').toLowerCase().trim();
    const categoryId = categorySelect.value;

    let filtered = allGoods.filter((good) => {
      const matchesQuery = !query || good.title.toLowerCase().includes(query);
      const matchesCategory = !categoryId || String(good.categoryId) === categoryId;
      return matchesQuery && matchesCategory;
    });

    if (sortSelect.value === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortSelect.value === 'price-desc') filtered.sort((a, b) => b.price - a.price);

    countEl.textContent = filtered.length + (filtered.length === 1 ? ' listing' : ' listings');

    if (filtered.length === 0) {
      goodsGrid.innerHTML = '<div class="empty-state">No listings match that search. Try a different keyword or category.</div>';
      return;
    }

    goodsGrid.innerHTML = filtered.map((good) => `
      <a class="good-card" href="listing.html?goodId=${good.goodId}">
        <div class="good-card-media">Photo</div>
        <div class="good-card-body">
          <p class="good-card-cat">${categoryById[good.categoryId] || 'Uncategorized'}</p>
          <h3>${good.title}</h3>
          <div class="good-card-foot">
            <span class="good-card-price">${money(good.price)}</span>
            ${good.price <= 300000 ? '<span class="good-card-deal">Budget pick</span>' : ''}
          </div>
          <p class="good-card-loc">${good.location}</p>
        </div>
      </a>
    `).join('');
  }

  async function init() {
    const [categories, goods] = await Promise.all([
      fetchJson('/api/categories', SAMPLE_CATEGORIES),
      fetchJson('/api/goods', SAMPLE_GOODS)
    ]);

    categoryById = Object.fromEntries(categories.map((c) => [c.categoryId, c.name]));
    categorySelect.innerHTML = '<option value="">All categories</option>' +
      categories.map((c) => `<option value="${c.categoryId}">${c.name}</option>`).join('');

    allGoods = goods;
    render();
  }

  searchInput.addEventListener('input', render);
  categorySelect.addEventListener('change', render);
  sortSelect.addEventListener('change', render);

  init();
}

/* ---------- Listing detail page ---------- */

const detailRoot = document.getElementById('listing-detail');
if (detailRoot) {
  const goodId = new URLSearchParams(window.location.search).get('goodId');

  async function init() {
    const [categories, good] = await Promise.all([
      fetchJson('/api/categories', SAMPLE_CATEGORIES),
      goodId
        ? fetchJson('/api/goods/' + goodId, SAMPLE_GOODS.find((g) => String(g.goodId) === goodId))
        : Promise.resolve(SAMPLE_GOODS[0])
    ]);

    if (!good) {
      detailRoot.innerHTML = '<div class="empty-state">This listing isn\u2019t available any more.</div>';
      return;
    }

    const categoryById = Object.fromEntries(categories.map((c) => [c.categoryId, c.name]));
    const isClaimed = good.status === 'CLAIMED' || !!good.claimedByBrokerId;
    const sampleGood = SAMPLE_GOODS.find((item) => String(item.goodId) === String(good.goodId));
    const productImage = good.image || sampleGood?.image;

    document.title = good.title + ' — BROKERA';
    document.getElementById('detail-cat').textContent = categoryById[good.categoryId] || 'Uncategorized';
    document.getElementById('detail-title').textContent = good.title;
    document.getElementById('detail-price').textContent = money(good.price);
    document.getElementById('detail-loc').textContent = good.location;
    document.getElementById('detail-desc-text').textContent = good.description || 'No description provided.';

    const galleryMain = document.getElementById('detail-gallery-main');
    const galleryImages = document.querySelectorAll('[data-gallery-image]');
    if (productImage) {
      galleryMain.innerHTML = `<img src="${productImage}" alt="${good.title}">`;
      galleryImages.forEach((button) => {
        button.innerHTML = `<img src="${productImage}" alt="">`;
        button.addEventListener('click', () => {
          galleryMain.innerHTML = `<img src="${productImage}" alt="${good.title}">`;
        });
      });
    } else {
      galleryMain.textContent = 'Photo coming soon';
    }

    const statusEl = document.getElementById('detail-status');
    if (isClaimed) {
      statusEl.innerHTML = '<span class="tag tag-claimed">Claimed</span> A broker is already handling this listing — offers still go through them.';
    } else {
      statusEl.innerHTML = '<span class="tag tag-available">Available</span> Not yet claimed by a broker.';
    }

    document.getElementById('offer-good-id').value = good.goodId;

    const offerForm = document.getElementById('offer-form');
    const offerBanner = document.getElementById('offer-banner');

    offerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      offerBanner.className = 'form-banner';

      const buyerId = sessionStorage.getItem('userId');
      if (!buyerId) {
        offerBanner.textContent = 'Log in to make an offer on this listing.';
        offerBanner.className = 'form-banner show error';
        return;
      }

      const offerAmount = offerForm.elements['offerAmount'].value;
      const submitBtn = offerForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const response = await fetch('/api/offers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            goodId: Number(good.goodId),
            buyerId: Number(buyerId),
            offerAmount: Number(offerAmount)
          })
        });
        const data = await response.json();

        if (!response.ok) {
          offerBanner.textContent = data.message || 'Couldn\u2019t send that offer. Try again.';
          offerBanner.className = 'form-banner show error';
        } else {
          offerBanner.textContent = 'Offer sent — the broker handling this listing will respond soon.';
          offerBanner.className = 'form-banner show success';
          offerForm.reset();
          document.getElementById('offer-good-id').value = good.goodId;
        }
      } catch (err) {
        offerBanner.textContent = 'Couldn\u2019t reach BROKERA. Check your connection and try again.';
        offerBanner.className = 'form-banner show error';
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send offer';
    });
  }

  init();
}
