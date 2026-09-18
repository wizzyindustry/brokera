<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create Account — BROKERA Marketplace</title>
  <link rel="stylesheet" href="/css/brokera.css">
</head>
<body style="background: linear-gradient(135deg, var(--color-slate-900) 0%, var(--color-brand-950) 100%); color: var(--color-slate-100);">

<nav class="nav" id="main-nav" style="background: rgba(15, 23, 42, 0.8); border-bottom-color: rgba(255,255,255,0.1);">
  <div class="wrap">
    <a href="index.html" class="nav-logo" style="color: var(--color-white);">BROKERA</a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html" style="color: var(--color-slate-200);">Home</a></li>
      <li><a href="/buyer/pool.html" style="color: var(--color-slate-200);">Browse Goods</a></li>
      <li><a href="login.html" style="color: var(--color-slate-200);">Log In</a></li>
    </ul>
    <div class="nav-actions">
      <a href="/buyer/dashboard.html" class="btn btn-ghost" style="color: var(--color-slate-200);">Dashboard</a>
      <a href="login.html" class="btn btn-outline" style="color: var(--color-white); border-color: rgba(255,255,255,0.3);">Log In</a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span style="background: var(--color-white);"></span></button>
    </div>
  </div>
  <div class="nav-overlay" id="nav-overlay"></div>
</nav>

<main style="display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;">
  <div class="form-card" style="width: 100%; max-width: 560px; margin: 0; box-shadow: var(--shadow-xl);">
    <div style="text-align: center; margin-bottom: 2rem;">
      <h1 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Join BROKERA</h1>
      <p style="font-size: 0.9375rem;">One account gives you access to buying, selling, or brokering goods across Tanzania.</p>
    </div>

    <div class="form-banner" id="register-banner" role="alert"></div>

    <form id="register-form" novalidate>
      <div class="form-group field" data-field="fullName">
        <label for="fullName" class="form-label">Full Name</label>
        <input type="text" id="fullName" name="fullName" class="form-control" autocomplete="name" placeholder="Amina Juma" required>
        <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem;"></p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group field" data-field="email">
          <label for="email" class="form-label">Email Address</label>
          <input type="email" id="email" name="email" class="form-control" autocomplete="email" placeholder="name@example.com" required>
          <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem;"></p>
        </div>

        <div class="form-group field" data-field="phone">
          <label for="phone" class="form-label">Phone Number</label>
          <input type="tel" id="phone" name="phone" class="form-control" autocomplete="tel" placeholder="+255 7XX XXX XXX" required>
          <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem;"></p>
        </div>
      </div>

      <div class="form-group field" data-field="accountType">
        <label for="accountType" class="form-label">Primary Role Choice</label>
        <select id="accountType" name="accountType" class="form-control" required>
          <option value="buyer">Buyer — Source products through brokers</option>
          <option value="seller">Seller — List goods for brokers to sell</option>
        </select>
        <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem;"></p>
      </div>

      <div class="form-group field" data-field="brokerApplication" style="background: var(--color-slate-50); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); margin-top: 0.5rem;">
        <label style="display: flex; align-items: center; gap: 0.75rem; font-weight: 600; cursor: pointer;">
          <input type="checkbox" id="brokerApplication" name="brokerApplication" style="width: 18px; height: 18px; accent-color: var(--color-brand-600);">
          Apply to become a Verified Broker
        </label>
        <p style="font-size: 0.8125rem; color: var(--color-slate-500); margin-top: 0.25rem; margin-left: 2rem;">Requires 20-digit NIDA verification to claim marketplace goods.</p>
      </div>

      <div class="form-group field broker-id-field" data-field="nidaNumber" style="display: none; margin-top: 1rem;">
        <label for="nidaNumber" class="form-label">20-Digit NIDA Number</label>
        <input type="text" id="nidaNumber" name="nidaNumber" class="form-control" inputmode="numeric" maxlength="20" placeholder="19950101-XXXXX-XXXXX-XX">
        <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem;"></p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
        <div class="form-group field" data-field="password">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" name="password" class="form-control" autocomplete="new-password" placeholder="At least 8 chars" required>
          <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem;"></p>
        </div>

        <div class="form-group field" data-field="confirmPassword">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" autocomplete="new-password" placeholder="Re-enter password" required>
          <p class="field-error" style="color: var(--color-error-600); font-size: 0.8125rem; margin-top: 0.25rem;"></p>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top: 1.5rem;">Create Free Account</button>

      <div style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem;">
        <p>Already registered? <a href="login.html" style="font-weight: 600;">Log in here</a></p>
      </div>
    </form>
  </div>
</main>

<script src="/js/auth.js"></script>
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
