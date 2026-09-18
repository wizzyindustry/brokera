/* ==========================================================================
   BROKERA — Public Landing Page JavaScript Core (/js/home.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Mobile Navigation & Drawer Overlay
  // ------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('open');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        navToggle.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('open');
        if (navOverlay) navOverlay.classList.add('open');
      }
    });

    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  // ------------------------------------------------------------------------
  // 2. Image Search Dropzone & File Upload Preview
  // ------------------------------------------------------------------------
  const imageSearchToggle = document.querySelector('[data-image-search-toggle]');
  const imageSearchBox = document.querySelector('[data-image-search-box]');
  const imageInput = document.querySelector('[data-image-input]');
  const imageDropzone = document.querySelector('[data-image-dropzone]');
  const imagePreview = document.querySelector('[data-image-preview]');
  const imagePreviewImage = document.querySelector('[data-image-preview-image]');
  const imageName = document.querySelector('[data-image-name]');
  const imageRemove = document.querySelector('[data-image-remove]');

  if (imageSearchToggle && imageSearchBox && imageInput && imageDropzone) {
    imageSearchToggle.addEventListener('click', () => {
      const isOpen = imageSearchToggle.getAttribute('aria-expanded') === 'true';
      imageSearchToggle.setAttribute('aria-expanded', String(!isOpen));
      imageSearchBox.hidden = isOpen;
    });

    const showImage = (file) => {
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (imagePreviewImage) imagePreviewImage.src = reader.result;
        if (imageName) imageName.textContent = file.name;
        if (imagePreview) imagePreview.hidden = false;
        if (imageDropzone) imageDropzone.hidden = true;
      });
      reader.readAsDataURL(file);
    };

    imageDropzone.addEventListener('click', () => imageInput.click());
    imageDropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        imageInput.click();
      }
    });

    imageInput.addEventListener('change', () => showImage(imageInput.files[0]));
    imageDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      imageDropzone.classList.add('is-dragging');
    });
    imageDropzone.addEventListener('dragleave', () => imageDropzone.classList.remove('is-dragging'));
    imageDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      imageDropzone.classList.remove('is-dragging');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        showImage(e.dataTransfer.files[0]);
      }
    });

    if (imageRemove) {
      imageRemove.addEventListener('click', () => {
        imageInput.value = '';
        if (imagePreview) imagePreview.hidden = true;
        if (imageDropzone) imageDropzone.hidden = false;
      });
    }
  }

  // ------------------------------------------------------------------------
  // 3. Seller Guide Expand / Collapse Toggle
  // ------------------------------------------------------------------------
  const sellerGuideToggle = document.getElementById('seller-guide-toggle');
  const sellerGuideSections = document.querySelectorAll('.seller-guide');

  if (sellerGuideToggle && sellerGuideSections.length) {
    sellerGuideToggle.addEventListener('click', () => {
      const isOpen = sellerGuideToggle.getAttribute('aria-expanded') === 'true';
      sellerGuideToggle.setAttribute('aria-expanded', String(!isOpen));

      const symbol = sellerGuideToggle.querySelector('span');
      if (symbol) symbol.textContent = isOpen ? '+' : '−';

      sellerGuideSections.forEach((section) => {
        section.hidden = isOpen;
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Featured Showcase Slider (Responsive CSS Grid Translation)
  // ------------------------------------------------------------------------
  const featuredSlider = document.getElementById('featured-slider');
  const slideButtons = document.querySelectorAll('.showcase-actions [data-slide]');

  if (featuredSlider && slideButtons.length) {
    let currentSlide = 0;
    const cards = Array.from(featuredSlider.children);

    const getVisibleCards = () => {
      if (window.matchMedia('(max-width: 600px)').matches) return 1;
      if (window.matchMedia('(max-width: 920px)').matches) return 2;
      return 3;
    };

    const renderSlider = () => {
      const visible = getVisibleCards();
      const maxSlide = Math.max(0, cards.length - visible);
      currentSlide = Math.min(currentSlide, maxSlide);
      const offset = currentSlide * (100 / visible);
      featuredSlider.style.transform = `translateX(-${offset}%)`;

      slideButtons.forEach((button) => {
        const dir = button.dataset.slide;
        button.disabled = (dir === 'previous' && currentSlide === 0) || (dir === 'next' && currentSlide >= maxSlide);
      });
    };

    slideButtons.forEach((button) => {
      button.addEventListener('click', () => {
        currentSlide += button.dataset.slide === 'next' ? 1 : -1;
        renderSlider();
      });
    });

    window.addEventListener('resize', renderSlider);
    renderSlider();
  }

  // ------------------------------------------------------------------------
  // 5. Frequently Searched Auto-Rotating Carousel
  // ------------------------------------------------------------------------
  const frequentSlider = document.getElementById('frequent-slider');
  const frequentButtons = document.querySelectorAll('[data-frequent-slide]');

  if (frequentSlider && frequentButtons.length) {
    let frequentSlide = 0;
    const frequentCards = Array.from(frequentSlider.children);

    const visibleFrequent = () => {
      if (window.matchMedia('(max-width: 600px)').matches) return 1;
      if (window.matchMedia('(max-width: 920px)').matches) return 2;
      return 4;
    };

    const renderFrequent = () => {
      const visible = visibleFrequent();
      const maxSlide = Math.max(0, frequentCards.length - visible);
      if (frequentSlide > maxSlide) frequentSlide = 0;
      if (frequentSlide < 0) frequentSlide = maxSlide;
      frequentSlider.style.transform = `translateX(-${frequentSlide * (100 / visible)}%)`;
    };

    frequentButtons.forEach((button) => {
      button.addEventListener('click', () => {
        frequentSlide += button.dataset.frequentSlide === 'next' ? 1 : -1;
        renderFrequent();
      });
    });

    window.addEventListener('resize', renderFrequent);
    const autoRotate = window.setInterval(() => {
      frequentSlide += 1;
      renderFrequent();
    }, 4500);

    frequentSlider.addEventListener('mouseenter', () => clearInterval(autoRotate));
    renderFrequent();
  }

  // ------------------------------------------------------------------------
  // 6. Dynamic Filterable Listings Data & Renderer
  // ------------------------------------------------------------------------
  const listingData = [
    {
      title: 'Business laptop',
      category: 'Electronics',
      price: 1450000,
      location: 'Dar es Salaam',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
      badge: 'Verified'
    },

    { title: 'Toyota Hilux, 2014', category: 'Vehicles', price: 38500000, location: 'Arusha', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85', badge: 'Hot deal' },
    { title: '3-bedroom plot, Chalinze', category: 'Property', price: 21000000, location: 'Chalinze', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=85', badge: 'High demand' },
    { title: 'Tailored kitenge set', category: 'Fashion', price: 85000, location: 'Mwanza', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', badge: 'New' },
    { title: 'Premium rice harvest', category: 'Agriculture', price: 2850000, location: 'Mbeya', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85', badge: 'Fresh' },
    { title: 'Double-door fridge', category: 'Home & Office', price: 950000, location: 'Dodoma', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85', badge: 'Top seller' },
    { title: 'Android smartphone', category: 'Electronics', price: 720000, location: 'Morogoro', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85', badge: 'Fast move' },
    { title: 'Coffee shop equipment set', category: 'Home & Office', price: 1850000, location: 'Morogoro', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85', badge: 'Ready to ship' }
  ];

  const dynamicListings = document.getElementById('dynamic-listings');
  if (dynamicListings) {
    const currencyFormatter = new Intl.NumberFormat('en-US');

    const renderListings = (category = 'all') => {
      const items = category === 'all'
        ? listingData
        : listingData.filter((item) => item.category === category);

      if (!items.length) {
        dynamicListings.innerHTML = '<div class="empty-state">No items match this category yet. Try another filter.</div>';
        return;
      }

      dynamicListings.innerHTML = items.map((item) => `
        <article class="listing-card">
          <div class="listing-card-media">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <span class="listing-card-tag">${item.badge}</span>
          </div>
          <div class="listing-card-body">
            <span class="listing-card-category">${item.category}</span>
            <h3>${item.title}</h3>
            <div class="listing-card-foot">
              <strong>TZS ${currencyFormatter.format(item.price)}</strong>
              <span>${item.location}</span>
            </div>
          </div>
        </article>
      `).join('');
    };

    document.querySelectorAll('.filter-chip').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('active', chip === button));
        renderListings(button.dataset.category || 'all');
      });
    });

    renderListings();
  }

  // ------------------------------------------------------------------------
  // 7. Impact Stat Counters (IntersectionObserver Smooth Easing)
  // ------------------------------------------------------------------------
  const statElements = document.querySelectorAll('[data-stat]');
  if (statElements.length) {
    const animateStat = (element) => {
      const target = Number(element.dataset.stat);
      const suffix = element.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();

      const updateFrame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);
        element.textContent = `${current.toLocaleString()}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateFrame);
        } else {
          element.textContent = `${target.toLocaleString()}${suffix}`;
        }
      };

      requestAnimationFrame(updateFrame);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach((element) => observer.observe(element));
  }

  // ------------------------------------------------------------------------
  // 8. FAQ Accordion Control
  // ------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach((item) => {
      const button = item.querySelector('.faq-question');
      if (!button) return;

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove('active');
          const faqButton = faqItem.querySelector('.faq-question');
          if (faqButton) faqButton.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 9. Trade Alert Newsletter Form Validation
  // ------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('newsletter-message');

  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = newsletterForm.elements.namedItem('name')?.value.trim();
      const email = newsletterForm.elements.namedItem('email')?.value.trim();
      const interest = newsletterForm.elements.namedItem('interest')?.value || 'Electronics';

      if (!name || !email) {
        newsletterMessage.textContent = 'Please add your name and email to receive trade alerts.';
        newsletterMessage.classList.remove('success');
        newsletterMessage.classList.add('error');
        return;
      }

      newsletterMessage.textContent = `Thanks, ${name}! We'll send ${interest.toLowerCase()} deals to ${email}.`;
      newsletterMessage.classList.remove('error');
      newsletterMessage.classList.add('success');
      newsletterForm.reset();
    });
  }

});