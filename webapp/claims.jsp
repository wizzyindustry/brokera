<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Broker Claims — BROKERA</title>
  <link rel="stylesheet" href="/css/brokera.css">
</head>
<body>

<nav class="nav" id="main-nav">
  <div class="wrap">
    <a href="/index.html" class="nav-logo">BROKERA</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="broker-pool.html">Available Pool</a></li>
      <li><a href="claims.html" class="active">My Claims</a></li>
      <li><a href="/dashboard.html">Dashboard</a></li>
      <li><a href="/login.html">Log In</a></li>
    </ul>
    <div class="nav-actions">
      <a href="/dashboard.html" class="btn btn-ghost">Dashboard</a>
      <a href="broker-pool.html" class="btn btn-primary">Claim More Goods</a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span></button>
    </div>
  </div>
  <div class="nav-overlay" id="nav-overlay"></div>
</nav>

<main style="padding-bottom: 4rem;">
  <section class="hero" style="padding: 2.5rem 0;">
    <div class="wrap hero-copy">
      <p class="hero-eyebrow">Broker Workspace</p>
      <h1>My Active Claims</h1>
      <p class="hero-sub">Manage items you are currently holding. Coordinate buyer outreach, track time remaining on active holds, and release items when deals complete.</p>
    </div>
  </section>

  <section class="wrap" style="margin-top: 2.5rem;">
    <div class="claims-grid" id="claims-list">
      <div class="empty-state">Loading your active claims...</div>
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
        <h4>Broker Portal</h4>
        <ul>
          <li><a href="broker-pool.html">Available Pool</a></li>
          <li><a href="claims.html">My Claims</a></li>
          <li><a href="/dashboard.html">Broker Dashboard</a></li>
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

<script src="/js/broker.js"></script>
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
