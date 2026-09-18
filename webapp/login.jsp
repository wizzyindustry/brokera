<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Log In — BROKERA Marketplace</title>
  <link rel="stylesheet" href="/css/brokera.css">
  <link rel="stylesheet" href="css/brokera.css">
</head>
<body style="background: linear-gradient(135deg, var(--color-slate-950) 0%, var(--color-brand-950) 50%, var(--color-slate-900) 100%); color: var(--color-slate-100); min-height: 100vh;">

<!-- Ambient Background Glows -->
<div style="position: fixed; top: 10%; left: 15%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0) 70%); pointer-events: none; z-index: 0;"></div>
<div style="position: fixed; bottom: 10%; right: 10%; width: 450px; height: 450px; background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%); pointer-events: none; z-index: 0;"></div>

<!-- Top Bar -->
<div class="commerce-promo" style="position: relative; z-index: 10;">
  <span>BROKERA MARKETPLACE</span>
  <strong>Smart Sourcing for Buyers &amp; Sellers</strong>
  <span>Trusted Deals Across Tanzania</span>
</div>

<!-- Navigation -->
<nav class="nav" id="main-nav" style="background: rgba(15, 23, 42, 0.85); border-bottom-color: rgba(255,255,255,0.1); position: relative; z-index: 100;">
  <div class="wrap">
    <a href="index.html" class="nav-logo" style="color: var(--color-white);">BROKERA</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html" style="color: var(--color-slate-200);">Home</a></li>
      <li><a href="about.html" style="color: var(--color-slate-200);">How It Works</a></li>
      <li><a href="/buyer/pool.html" style="color: var(--color-slate-200);">Browse Goods</a></li>
      <li><a href="register.html" style="color: var(--color-slate-200);">Create Account</a></li>
    </ul>
    <div class="nav-actions">
      <a href="/buyer/dashboard.html" class="btn btn-ghost" style="color: var(--color-slate-200);">Dashboard</a>
      <a href="register.html" class="btn btn-primary">Join BROKERA</a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span style="background: var(--color-white);"></span></button>
    </div>
  </div>
  <div class="nav-overlay" id="nav-overlay"></div>
</nav>

<!-- Main Split Auth Container -->
<main class="auth-page-main" style="position: relative; z-index: 10;">
  <div class="auth-split-wrapper">
    
    <!-- LEFT COLUMN: Professional Login Form -->
    <div class="auth-form-panel">
      <div class="auth-form-header">
        <span class="auth-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Account Login
        </span>
        <h1>Welcome Back</h1>
        <p>Access your dashboard, marketplace listings, or claim pipeline.</p>
      </div>

      <!-- Banner Alert -->
      <div class="form-banner" id="login-banner" role="alert"></div>

      <!-- Quick Demo Accounts Helper -->
      <div class="demo-quick-bar">
        <div class="demo-quick-title">
          <span>Demo Accounts</span>
          <span>Click to auto-fill &darr;</span>
        </div>
        <div class="demo-pills">
          <button type="button" class="demo-pill-btn buyer" data-demo-email="buyer@brokera.test" title="Fill Buyer Credentials">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Buyer
          </button>
          <button type="button" class="demo-pill-btn broker" data-demo-email="broker@brokera.test" title="Fill Broker Credentials">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            Broker
          </button>
          <button type="button" class="demo-pill-btn seller" data-demo-email="seller@brokera.test" title="Fill Seller Credentials">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            Seller
          </button>
        </div>
      </div>

      <!-- Auth Form (Standardized IDs for auth.js) -->
      <form id="login-form" novalidate>
        <div class="form-group field" data-field="email">
          <label for="email" class="form-label">Email Address</label>
          <input type="email" id="email" name="email" class="form-control" autocomplete="email" placeholder="name@example.com" required>
          <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem; min-height: 1rem;"></p>
        </div>

        <div class="form-group field" data-field="password">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <label for="password" class="form-label">Password</label>
          </div>
          <div class="password-input-wrapper">
            <input type="password" id="password" name="password" class="form-control" autocomplete="current-password" placeholder="Enter your password" required>
            <button type="button" class="password-toggle-btn" id="toggle-password-btn" aria-label="Show or hide password">
              <svg id="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem; min-height: 1rem;"></p>
        </div>

        <div class="auth-options-row">
          <label class="auth-checkbox-label">
            <input type="checkbox" id="remember-me" name="remember" style="width: auto; margin: 0;">
            <span>Remember this device</span>
          </label>
          <a href="#forgot" class="auth-forgot-link" id="forgot-password-trigger">Forgot password?</a>
        </div>

        <button type="submit" class="btn btn-primary btn-full btn-lg" style="box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); font-weight: 700;">
          Log In to BROKERA &rarr;
        </button>

        <div style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--color-slate-600);">
          <span>Don't have an account yet?</span>
          <a href="register.html" style="font-weight: 700; color: var(--color-brand-600); margin-left: 0.25rem;">Create an account</a>
        </div>

        <div class="auth-trust-note">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          256-bit SSL Encryption &bull; Official NIDA Verified Partner Network
        </div>
      </form>
    </div>

    <!-- RIGHT COLUMN: Professional Project Description & Platform Showcase -->
    <div class="auth-info-panel">
      <div>
        <!-- Platform Badge -->
        <div class="auth-info-badge">
          <span class="pulse-dot"></span>
          Tanzania's Trusted Commerce Network
        </div>

        <!-- Headline -->
        <h2 class="auth-info-heading">
          Trade With Confidence. <br>
          <span class="highlight">Source With Speed.</span>
        </h2>

        <!-- Project Overview / Problem & Solution Description -->
        <p class="auth-info-lead">
          <strong>BROKERA</strong> is Tanzania's premier tri-party marketplace built to eliminate the trust deficit in high-value goods commerce. By bridging Buyers, Certified Brokers, and Sellers, we replace blind meetups and unverified payments with on-ground inspection and secure deal handovers.
        </p>

        <!-- 3-Party Tri-Party Model Showcase -->
        <div class="ecosystem-grid">
          
          <!-- Buyer Block -->
          <div class="ecosystem-item buyer">
            <div class="ecosystem-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </div>
            <div class="ecosystem-text">
              <h4>Verified Sourcing for Buyers</h4>
              <p>Explore genuine electronics, machinery, vehicles &amp; property. Submit binding offers online and let a certified broker verify physical condition before payment.</p>
            </div>
          </div>

          <!-- Broker Block -->
          <div class="ecosystem-item broker">
            <div class="ecosystem-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            </div>
            <div class="ecosystem-text">
              <h4>NIDA-Accredited Local Brokers</h4>
              <p>Certified local agents claim open listings in Dar es Salaam, Arusha, Mwanza &amp; Dodoma to inspect goods, coordinate handovers, and earn guaranteed commissions.</p>
            </div>
          </div>

          <!-- Seller Block -->
          <div class="ecosystem-item seller">
            <div class="ecosystem-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <div class="ecosystem-text">
              <h4>Privacy &amp; Fast Closing for Sellers</h4>
              <p>Post items securely with zero public phone disclosure. Dedicated brokers screen buyers, filter out spam, and finalize the deal on your terms.</p>
            </div>
          </div>

        </div>
      </div>

      <!-- Trust Badges & Market Metrics -->
      <div>
        <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--radius-lg); padding: 1rem 1.25rem; margin-bottom: 1.5rem; backdrop-filter: blur(8px);">
          <p style="font-size: 0.8125rem; color: #E2E8F0; margin: 0; font-style: italic; line-height: 1.45;">
            &ldquo;BROKERA gave us complete peace of mind. Our broker physically inspected the generator serials and verified testing in Dar before payment release.&rdquo;
          </p>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.625rem; font-size: 0.75rem; color: #94A3B8;">
            <span><strong>Daudi M.</strong> &bull; Industrial Sourcing Partner</span>
            <span style="color: #FBBF24;">&#9733;&#9733;&#9733;&#9733;&#9733; Verified Deal</span>
          </div>
        </div>

        <div class="auth-trust-strip">
          <div class="auth-stat-col">
            <div class="auth-stat-num">1,200+</div>
            <div class="auth-stat-lbl">Active Listings</div>
          </div>
          <div class="auth-stat-col">
            <div class="auth-stat-num">100%</div>
            <div class="auth-stat-lbl">NIDA ID Verified</div>
          </div>
          <div class="auth-stat-col">
            <div class="auth-stat-num">4 Hubs</div>
            <div class="auth-stat-lbl">Dar &bull; Arusha &bull; Mwanza</div>
          </div>
        </div>
      </div>

    </div>

  </div>
</main>

<!-- Forgot Password Dialog (Simple Modal Alert) -->
<div id="forgot-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 1000; align-items: center; justify-content: center; padding: 1.5rem; backdrop-filter: blur(4px);">
  <div style="background: var(--color-white); color: var(--color-slate-900); max-width: 440px; width: 100%; border-radius: var(--radius-xl); padding: 2rem; box-shadow: var(--shadow-xl);">
    <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-slate-900);">Password Recovery</h3>
    <p style="font-size: 0.875rem; color: var(--color-slate-600); line-height: 1.5; margin-bottom: 1.25rem;">
      For the prototype demo, you can log in directly using any password (e.g. <code>password123</code>) with any of the demo accounts above.<br><br>
      In production, password reset instructions are dispatched via SMS and email to your NIDA-verified phone number.
    </p>
    <button type="button" id="close-forgot-modal" class="btn btn-primary btn-full">Got it, return to login</button>
  </div>
</div>

<!-- Scripts -->
<script src="/js/auth.js"></script>
<script src="js/auth.js"></script>
<script>
  // Mobile navigation menu toggle
  (function(){
    var t = document.getElementById('nav-toggle'),
        l = document.getElementById('nav-links'),
        o = document.getElementById('nav-overlay');
    if(!t || !l) return;
    function c(){
      t.setAttribute('aria-expanded','false');
      l.classList.remove('open');
      if(o) o.classList.remove('open');
    }
    t.addEventListener('click', function(){
      var open = t.getAttribute('aria-expanded') === 'true';
      if(open){ c(); } else {
        t.setAttribute('aria-expanded','true');
        l.classList.add('open');
        if(o) o.classList.add('open');
      }
    });
    if(o) o.addEventListener('click', c);
    l.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', c); });
  })();

  // 1-Click Demo Accounts Quick-Fill
  (function(){
    var pills = document.querySelectorAll('[data-demo-email]');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var banner = document.getElementById('login-banner');

    pills.forEach(function(btn){
      btn.addEventListener('click', function(){
        var email = btn.getAttribute('data-demo-email');
        if(emailInput) {
          emailInput.value = email;
          emailInput.focus();
        }
        if(passwordInput) {
          passwordInput.value = 'password123';
        }
        if(banner) {
          banner.className = 'form-banner show success';
          banner.textContent = 'Selected ' + email + ' (Password filled). Click "Log In to BROKERA" below!';
        }
      });
    });
  })();

  // Toggle Password Visibility
  (function(){
    var toggleBtn = document.getElementById('toggle-password-btn');
    var passInput = document.getElementById('password');
    var eyeIcon = document.getElementById('eye-icon');
    if(!toggleBtn || !passInput) return;

    toggleBtn.addEventListener('click', function(){
      var isPass = passInput.getAttribute('type') === 'password';
      if(isPass){
        passInput.setAttribute('type', 'text');
        eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
      } else {
        passInput.setAttribute('type', 'password');
        eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
      }
    });
  })();

  // Forgot password modal interaction
  (function(){
    var trigger = document.getElementById('forgot-password-trigger');
    var modal = document.getElementById('forgot-modal');
    var closeBtn = document.getElementById('close-forgot-modal');
    if(!trigger || !modal) return;

    trigger.addEventListener('click', function(e){
      e.preventDefault();
      modal.style.display = 'flex';
    });
    if(closeBtn){
      closeBtn.addEventListener('click', function(){
        modal.style.display = 'none';
      });
    }
    modal.addEventListener('click', function(e){
      if(e.target === modal) modal.style.display = 'none';
    });
  })();
</script>
</body>
</html>
