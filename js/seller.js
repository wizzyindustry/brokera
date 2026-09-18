/* ==========================================================================
   BROKERA — seller flow: post a listing, manage my listings
   Field names follow the API Field Naming Standard doc exactly:
     POST   /api/goods                 -> request { title, description, price,
                                           categoryId, location } — sellerId is
                                           taken from the session automatically
                                           response adds { goodId, status }
     GET    /api/goods/my-listings     -> session required, list of goods
     DELETE /api/goods/{id}            -> withdraws/removes a listing
     POST   /api/good-images           -> request { goodId, imageUrl, isPrimary }
   ========================================================================== */

const money3 = (amount) => 'TZS ' + Number(amount).toLocaleString('en-US');

async function fetchJson3(url, options, fallback) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Request failed');
    return await res.json();
  } catch (err) {
    return fallback;
  }
}

const SELLER_SAMPLE_CATEGORIES = [
  { categoryId: 1, name: 'Electronics' },
  { categoryId: 2, name: 'Appliances' },
  { categoryId: 3, name: 'Fashion & clothing' },
  { categoryId: 4, name: 'Vehicles' },
  { categoryId: 5, name: 'Property' },
  { categoryId: 6, name: 'Agriculture' },
  { categoryId: 7, name: 'Other' }
];

const SAMPLE_MY_LISTINGS = [
  { goodId: 301, title: 'Hand-woven basket set', price: 45000, categoryId: 3, location: 'Zanzibar', status: 'AVAILABLE' },
  { goodId: 302, title: 'Rice mill, 1 ton/hr', price: 5600000, categoryId: 6, location: 'Shinyanga', status: 'CLAIMED' },
  { goodId: 303, title: 'Office desk set (4)', price: 320000, categoryId: 2, location: 'Dodoma', status: 'SOLD' }
];

/* ---------- Post a listing ---------- */

const listingForm = document.getElementById('listing-form');
if (listingForm) {
  const categorySelect = document.getElementById('categoryId');
  const imageList = document.getElementById('image-list');
  const addImageBtn = document.getElementById('add-image-btn');
  const banner = document.getElementById('listing-banner');

  async function loadCategories() {
    const categories = await fetchJson3('/api/categories', undefined, SELLER_SAMPLE_CATEGORIES);
    categorySelect.innerHTML = categories.map((c) => `<option value="${c.categoryId}">${c.name}</option>`).join('');
  }
  loadCategories();

  function addImageRow(isPrimary) {
    const row = document.createElement('div');
    row.className = 'image-row';
    row.innerHTML = `
      <input type="url" name="imageUrl" placeholder="Image URL">
      <label><input type="radio" name="isPrimary" value="1" ${isPrimary ? 'checked' : ''}> Primary</label>
      <button type="button" aria-label="Remove image">&times;</button>
    `;
    row.querySelector('button').addEventListener('click', () => row.remove());
    imageList.appendChild(row);
  }
  addImageRow(true);
  addImageBtn.addEventListener('click', () => addImageRow(false));

  listingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    banner.className = 'form-banner';

    const sellerId = sessionStorage.getItem('userId');
    if (!sellerId) {
      banner.textContent = 'Log in to post a listing.';
      banner.className = 'form-banner show error';
      return;
    }

    const title = listingForm.elements['title'].value.trim();
    const description = listingForm.elements['description'].value.trim();
    const price = listingForm.elements['price'].value;
    const categoryId = listingForm.elements['categoryId'].value;
    const location = listingForm.elements['location'].value.trim();

    if (!title || !price || !location) {
      banner.textContent = 'Fill in the title, price, and location before posting.';
      banner.className = 'form-banner show error';
      return;
    }

    const submitBtn = listingForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting…';

    const good = await fetchJson3('/api/goods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, description, price: Number(price), categoryId: Number(categoryId), location
      })
    }, { goodId: null, status: 'AVAILABLE' });

    // Attach any image URLs the seller entered, now that we have a goodId.
    if (good.goodId) {
      const imageInputs = [...imageList.querySelectorAll('.image-row')];
      for (const row of imageInputs) {
        const url = row.querySelector('input[type="url"]').value.trim();
        if (!url) continue;
        const isPrimary = row.querySelector('input[type="radio"]').checked;
        await fetchJson3('/api/good-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goodId: good.goodId, imageUrl: url, isPrimary })
        }, {});
      }
    }

    banner.textContent = 'Listed! Your good is now in the Available Pool for brokers to claim.';
    banner.className = 'form-banner show success';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Post listing';
    listingForm.reset();
    imageList.innerHTML = '';
    addImageRow(true);
  });
}

/* ---------- My listings ---------- */

const myListingsGrid = document.getElementById('my-listings-grid');
if (myListingsGrid) {
  let categoryById = {};

  async function render() {
    const sellerId = sessionStorage.getItem('userId');
    const [categories, listings] = await Promise.all([
      fetchJson3('/api/categories', undefined, SELLER_SAMPLE_CATEGORIES),
      fetchJson3(
        sellerId ? '/api/goods/my-listings' : null,
        undefined,
        SAMPLE_MY_LISTINGS
      )
    ]);
    categoryById = Object.fromEntries(categories.map((c) => [c.categoryId, c.name]));

    if (!listings.length) {
      myListingsGrid.innerHTML = '<div class="empty-state">You haven\u2019t posted anything yet. <a href="post-listing.html">Post your first listing</a>.</div>';
      return;
    }

    myListingsGrid.innerHTML = listings.map((good) => {
      const tagClass = good.status === 'SOLD' ? 'tag-sold' : good.status === 'CLAIMED' ? 'tag-claimed' : 'tag-available';
      const tagLabel = good.status === 'SOLD' ? 'Sold' : good.status === 'CLAIMED' ? 'Claimed' : 'Available';
      const canWithdraw = good.status === 'AVAILABLE';
      return `
        <div class="good-card" style="cursor:default;">
          <div class="good-card-media">Photo</div>
          <div class="good-card-body">
            <p class="good-card-cat">${categoryById[good.categoryId] || 'Uncategorized'}</p>
            <h3>${good.title}</h3>
            <div class="good-card-foot">
              <span class="good-card-price">${money3(good.price)}</span>
            </div>
            <p class="good-card-loc">${good.location}</p>
            <div class="good-card-status"><span class="tag ${tagClass}">${tagLabel}</span></div>
            <div class="good-card-actions">
              <button type="button" data-withdraw="${good.goodId}" ${canWithdraw ? '' : 'disabled'}>
                ${canWithdraw ? 'Withdraw' : 'Locked'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    myListingsGrid.querySelectorAll('button[data-withdraw]').forEach((button) => {
      button.addEventListener('click', async () => {
        if (!confirm('Withdraw this listing from the pool?')) return;
        button.disabled = true;
        button.textContent = 'Withdrawing…';
        await fetchJson3('/api/goods/' + button.dataset.withdraw, { method: 'DELETE' }, {});
        render();
      });
    });
  }

  render();
}
