<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Post a New Listing — BROKERA</title>
  <link rel="stylesheet" href="/css/brokera.css">
</head>
<body>

<nav class="nav" id="main-nav">
  <div class="wrap">
    <a href="/index.html" class="nav-logo">BROKERA</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="post-listing.html" class="active">Post a Listing</a></li>
      <li><a href="my-listings.html">My Listings</a></li>
      <li><a href="/dashboard.html">Dashboard</a></li>
      <li><a href="/login.html">Log In</a></li>
    </ul>
    <div class="nav-actions">
      <a href="/dashboard.html" class="btn btn-ghost">Dashboard</a>
      <a href="my-listings.html" class="btn btn-outline">My Listings</a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span></button>
    </div>
  </div>
  <div class="nav-overlay" id="nav-overlay"></div>
</nav>

<main style="padding-bottom: 4rem;">
  <section class="hero" style="padding: 2.5rem 0;">
    <div class="wrap hero-copy">
      <p class="hero-eyebrow">Seller Portal</p>
      <h1>Post a New Product</h1>
      <p class="hero-sub">List your goods in the marketplace. Verified brokers will claim your listing and handle buyer outreach while keeping your contact details private.</p>
    </div>
  </section>

  <section class="wrap" style="max-width: 680px; margin-top: 2rem;">
    <div class="form-banner" id="listing-banner" role="alert"></div>

    <div class="form-card" style="margin: 0; max-width: 100%;">
      <form id="listing-form" novalidate>
        <div class="form-group field" data-field="title">
          <label for="title" class="form-label">Product Title</label>
          <input type="text" id="title" name="title" class="form-control" placeholder="e.g. 40 Bags of Dry Maize, 200W Solar Kit" required>
        </div>

        <div class="form-group field" data-field="description">
          <label for="description" class="form-label">Detailed Description</label>
          <textarea id="description" name="description" class="form-control" rows="4" placeholder="Mention item condition, specs, warranty, or pickup notes..."></textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group field" data-field="price">
            <label for="price" class="form-label">Asking Price (TZS)</label>
            <input type="number" id="price" name="price" class="form-control" min="1" step="1" placeholder="e.g. 650000" required>
          </div>

          <div class="form-group field" data-field="categoryId">
            <label for="categoryId" class="form-label">Product Category</label>
            <select id="categoryId" name="categoryId" class="form-control" required></select>
          </div>
        </div>

        <div class="form-group field" data-field="location">
          <label for="location" class="form-label">City / Region Location</label>
          <input type="text" id="location" name="location" class="form-control" placeholder="e.g. Dar es Salaam, Dodoma, Mbeya" required>
        </div>

        <div class="form-group field" style="margin-top: 1rem;">
          <label class="form-label">Product Photos (Image URLs)</label>
          <div class="image-list" id="image-list" style="margin-bottom: 0.75rem;"></div>
          <button type="button" class="btn btn-outline btn-sm" id="add-image-btn">+ Add Image URL</button>
        </div>

        <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top: 1.5rem;">Publish to Marketplace Pool</button>
      </form>
    </div>
  </section>
</main>

<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <h2>BROKERA</h2>
        <p>Tanzania's Web-Based Goods Brokerage &amp; Trading Platform.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/about.html">About Us</a></li>
          <li><a href="/buyer/pool.html">Buyer Pool</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Seller Portal</h4>
        <ul>
          <li><a href="post-listing.html">Post a Listing</a></li>
          <li><a href="my-listings.html">My Listings</a></li>
          <li><a href="/dashboard.html">Seller Dashboard</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <ul>
          <li><a href="mailto:hello@brokera.co.tz">hello@brokera.co.tz</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 BROKERA Platform. All rights reserved.</span>
    </div>
  </div>
</footer>

<script src="/js/seller.js"></script>
<script>
  (function(){
    var t=document.getElementById('nav-toggle'),l=document.getElementById('nav-links'),o=document.getElementById('nav-overlay');
    if(!t||!l)return;
    function c(){t.setAttribute('aria-expanded','false');l.classList.remove('open');if(o)o.classList.remove('open');}
    t.addEventListener('click',function(){var open=t.getAttribute('aria-expanded')==='true';if(open){c();}else{t.setAttribute('aria-expanded','true');l.classList.add('open');if(o)o.classList.add('open');}});
    if(o)o.addEventListener('click',c);
    l.querySelectorAll('a').forEach(function(a){a.addEventListener('click',c);});
  })();
</script>
</body>
</html>
