<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Browse Marketplace Pool — BROKERA</title>
  <link rel="stylesheet" href="/css/brokera.css">
</head>
<body>

<nav class="nav" id="main-nav">
  <div class="wrap">
    <a href="/index.html" class="nav-logo">BROKERA</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="/index.html">Home</a></li>
      <li><a href="pool.html" class="active">Browse Goods</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/dashboard.html">Dashboard</a></li>
      <li><a href="/login.html">Log In</a></li>
    </ul>
    <div class="nav-actions">
      <a href="/dashboard.html" class="btn btn-ghost">Dashboard</a>
      <a href="/login.html" class="btn btn-outline">Log In</a>
      <a href="/register.html" class="btn btn-primary">Get Started</a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span></button>
    </div>
  </div>
  <div class="nav-overlay" id="nav-overlay"></div>
</nav>

<main style="padding-bottom: 4rem;">
  <section class="hero" style="padding: 2.5rem 0;">
    <div class="wrap hero-copy">
      <p class="hero-eyebrow">Available Goods Pool</p>
      <h1>Explore Marketplace Listings</h1>
      <p class="hero-sub">Browse goods from sellers across Tanzania. Seller contact info stays protected while verified brokers handle every offer, inspection, and deal handover.</p>
    </div>
  </section>

  <section class="wrap" style="margin-top: 2rem;">
    <div class="pool-filter-bar">
      <input type="search" id="pool-search" class="form-control" placeholder="Search product title..." aria-label="Search listings">
      <select id="pool-category" class="form-control" aria-label="Filter by category">
        <option value="">All Categories</option>
      </select>
      <select id="pool-sort" class="form-control" aria-label="Sort listings">
        <option value="">Newest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
      <span class="pool-count-badge" id="pool-count">0 listings</span>
    </div>

    <div class="goods-grid" id="goods-grid">
      <div class="empty-state">Loading marketplace listings...</div>
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
          <li><a href="pool.html">Browse Goods</a></li>
          <li><a href="/login.html">Log In</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Roles</h4>
        <ul>
          <li><a href="pool.html">Buyer Pool</a></li>
          <li><a href="/broker/broker-pool.html">Broker Pool</a></li>
          <li><a href="/seller/post-listing.html">Post Listing</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <ul>
          <li><a href="mailto:hello@brokera.co.tz">hello@brokera.co.tz</a></li>
          <li><a href="https://brokera.co.tz" target="_blank" rel="noopener">brokera.co.tz</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 BROKERA Platform. All rights reserved.</span>
      <span>Built for the Tanzanian Market</span>
    </div>
  </div>
</footer>

<script src="/js/goods.js"></script>
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
