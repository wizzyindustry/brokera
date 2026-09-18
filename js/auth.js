/* ==========================================================================
   BROKERA — auth forms
   Field names below follow the team's "API Field Naming Standard" doc
   (camelCase, <entity>Id primary keys) exactly where that doc defines the
   endpoint. See the NOTE on the register form — that endpoint isn't in the
   standard yet, so its field names are a proposal, not a confirmed contract.
   ========================================================================== */

function showBanner(el, message, kind) {
  el.textContent = message;
  el.className = 'form-banner show ' + kind;
}

function setFieldError(fieldEl, message) {
  fieldEl.classList.add('has-error');
  const err = fieldEl.querySelector('.field-error');
  if (err) err.textContent = message;
}

function clearFieldErrors(form) {
  form.querySelectorAll('.field.has-error').forEach(f => f.classList.remove('has-error'));
}

const DEMO_USERS = {
  'buyer@brokera.test': { userId: 1001, role: 'buyer', name: 'Amina Buyer', roles: ['buyer'] },
  'broker@brokera.test': { userId: 2001, role: 'broker', name: 'Juma Broker', roles: ['broker'] },
  'seller@brokera.test': { userId: 3001, role: 'seller', name: 'Neema Seller', roles: ['seller'] }
};

function saveSession(data) {
  sessionStorage.setItem('userId', data.userId);
  sessionStorage.setItem('roleId', data.roleId || data.role || 'buyer');
  sessionStorage.setItem('userRole', data.role || 'buyer');
  sessionStorage.setItem('userName', data.name || 'BROKERA member');
  sessionStorage.setItem('userRoles', JSON.stringify(data.roles || [data.role || 'buyer']));
}

/* ---------- Login — POST /api/auth/login ---------- */
/* Request:  { email, password }
   Response: { userId, roleId, status, redirectUrl }             */

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFieldErrors(loginForm);
    const banner = document.getElementById('login-banner');
    banner.className = 'form-banner';

    const email = loginForm.elements['email'].value.trim();
    const password = loginForm.elements['password'].value;

    if (!email) {
      setFieldError(loginForm.querySelector('[data-field="email"]'), 'Enter the email you registered with.');
      return;
    }
    if (!password) {
      setFieldError(loginForm.querySelector('[data-field="password"]'), 'Enter your password.');
      return;
    }

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in…';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || data.status !== 'success') {
        showBanner(banner, 'That email and password don\u2019t match. Try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log in';
        return;
      }

      // One account can carry more than one role. The backend remains the
      // authority; these values only drive the frontend dashboard view.
      saveSession(data);

      // Server decides where each role lands (buyer / broker / seller / admin dashboard).
      window.location.href = data.redirectUrl || (data.role === 'broker' ? 'broker-pool.html' : 'dashboard.html');
    } catch (err) {
      const demoUser = DEMO_USERS[email.toLowerCase()];
      if (demoUser) {
        saveSession(demoUser);
        window.location.href = demoUser.role === 'broker' ? 'broker-pool.html' : 'dashboard.html';
        return;
      }
      showBanner(banner, 'Couldn\u2019t reach BROKERA. Check your connection and try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Log in';
    }
  });
}

/* ---------- Register — POST /api/auth/register ---------- */
/* NOTE: this endpoint is not yet defined in the API Field Naming Standard
   (that doc only covers /api/auth/login, /logout, /session). The field
   names below follow the same camelCase convention and mirror the USERS
   entity (full_name, email, phone, password_hash) — fullName, email,
   phone, password. Flag this with the backend teammate so the contract
   gets added to the standard; adjust the keys below if they land on
   different names. */

const registerForm = document.getElementById('register-form');
if (registerForm) {
  const brokerCheckbox = registerForm.elements['brokerApplication'];
  const brokerIdField = registerForm.querySelector('[data-field="nidaNumber"]');
  const nidaInput = registerForm.elements['nidaNumber'];

  function toggleBrokerVerification() {
    const isApplying = brokerCheckbox.checked;
    brokerIdField.classList.toggle('show', isApplying);
    nidaInput.required = isApplying;
    if (!isApplying) nidaInput.value = '';
  }

  brokerCheckbox.addEventListener('change', toggleBrokerVerification);
  toggleBrokerVerification();

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFieldErrors(registerForm);
    const banner = document.getElementById('register-banner');
    banner.className = 'form-banner';

    const fullName = registerForm.elements['fullName'].value.trim();
    const email = registerForm.elements['email'].value.trim();
    const phone = registerForm.elements['phone'].value.trim();
    const accountType = registerForm.elements['accountType'].value;
    const brokerApplication = registerForm.elements['brokerApplication'].checked;
    const nidaNumber = registerForm.elements['nidaNumber'].value.replace(/\D/g, '');
    const password = registerForm.elements['password'].value;
    const confirmPassword = registerForm.elements['confirmPassword'].value;

    let hasError = false;
    if (!fullName) {
      setFieldError(registerForm.querySelector('[data-field="fullName"]'), 'Tell us your full name.');
      hasError = true;
    }
    if (!email) {
      setFieldError(registerForm.querySelector('[data-field="email"]'), 'Enter a valid email address.');
      hasError = true;
    }
    if (!phone) {
      setFieldError(registerForm.querySelector('[data-field="phone"]'), 'Enter a phone number we can reach you on.');
      hasError = true;
    }
    if (password.length < 8) {
      setFieldError(registerForm.querySelector('[data-field="password"]'), 'Use at least 8 characters.');
      hasError = true;
    }
    if (password !== confirmPassword) {
      setFieldError(registerForm.querySelector('[data-field="confirmPassword"]'), 'Passwords don\u2019t match.');
      hasError = true;
    }
    if (brokerApplication && nidaNumber.length !== 20) {
      setFieldError(registerForm.querySelector('[data-field="nidaNumber"]'), 'Enter the 20-digit NIDA number for verification.');
      hasError = true;
    }
    if (hasError) return;

    const submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account…';

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          accountType,
          nidaNumber: brokerApplication ? nidaNumber : null,
          requestedRoles: brokerApplication ? [accountType, 'broker'] : [accountType]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        showBanner(banner, data.message || 'Couldn\u2019t create that account. Check your details and try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create account';
        return;
      }

      window.location.href = data.redirectUrl || '/login.jsp?registered=true';
    } catch (err) {
      showBanner(banner, 'Couldn\u2019t reach BROKERA. Check your connection and try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create account';
    }
  });
}
