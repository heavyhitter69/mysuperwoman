// Landing page behavior: validate code, animate hearts, transition
(function () {
  const form = document.getElementById('gateForm');
  const input = document.getElementById('codeInput');
  const hearts = document.getElementById('hearts');
  const alertEl = document.getElementById('intruder-alert');
  const correct = (window.__PASSCODE__ || '').toString();

  function spawnHeart(x, y, size, duration) {
    const el = document.createElement('div');
    el.className = 'heart';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    const driftX = (Math.random() * 2 - 1) * 120;
    const driftY = -window.innerHeight - Math.random() * 200;
    el.animate([
      { transform: 'translate(0, 0) rotate(45deg)', opacity: 1 },
      { transform: `translate(${driftX}px, ${driftY}px) rotate(45deg)`, opacity: 0 }
    ], { duration, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' });
    hearts.appendChild(el);
    setTimeout(() => el.remove(), duration + 50);
  }

  function burstHearts(centerX, centerY) {
    const count = 42;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 40 + Math.random() * 60;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      spawnHeart(x, y, 14 + Math.random() * 14, 1600 + Math.random() * 1200);
    }
  }

  function celebrateThenEnter() {
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;
    burstHearts(midX, midY);
    const overlay = document.createElement('div');
    overlay.className = 'overlay explode';
    document.body.appendChild(overlay);
    setTimeout(() => {
      window.location.href = 'main.html';
    }, 1000);
  }

  if (form && input) {
    let isAlertActive = false;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (isAlertActive) return; // Prevent spamming while alert is active

      const value = (input.value || '').trim();
      if (value === correct) {
        celebrateThenEnter();
      } else {
        isAlertActive = true;
        document.body.classList.add('intruder-alert-active');
        if (alertEl) alertEl.style.display = 'block';

        input.classList.add('shake');
        input.value = '';

        setTimeout(() => {
          document.body.classList.remove('intruder-alert-active');
          if (alertEl) alertEl.style.display = 'none';
          input.classList.remove('shake');
          isAlertActive = false;
        }, 3000);
      }
    });

    // Ambient floating hearts
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight - 20;
      spawnHeart(x, y, 10 + Math.random() * 12, 2500 + Math.random() * 1500);
    }, 400);
  }
})();

// Main page enhancements
(function () {
  const grid = document.getElementById('galleryGrid');
  const toTop = document.getElementById('toTop');
  if (!grid && !toTop) return;

  // Show/hide to-top button
  if (toTop) {
    const onScroll = () => {
      if (window.scrollY > 300) toTop.classList.add('visible'); else toTop.classList.remove('visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Add captions if data-captions exists on window
  if (grid && Array.isArray(window.galleryCaptions)) {
    const cards = grid.children;
    for (let i = 0; i < cards.length; i++) {
      const caption = document.createElement('div');
      caption.className = 'caption';
      caption.textContent = window.galleryCaptions[i] || '';
      cards[i].appendChild(caption);
    }
  }

  // Ambient floating hearts on main page
  const spawnAmbient = () => {
    const el = document.createElement('div');
    el.className = 'heart ambient-heart';
    const size = 10 + Math.random() * 16;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.top = window.innerHeight + 'px';
    document.body.appendChild(el);
    const driftX = (Math.random() * 2 - 1) * 80;
    const driftY = -window.innerHeight - 200 - Math.random() * 200;
    el.animate([
      { transform: 'translate(0,0) rotate(45deg)', opacity: .25 },
      { transform: `translate(${driftX}px, ${driftY}px) rotate(45deg)`, opacity: 0 }
    ], { duration: 6000 + Math.random() * 4000, easing: 'ease-out', fill: 'forwards' });
    setTimeout(() => el.remove(), 11000);
  };
  setInterval(spawnAmbient, 900);

  // Fade-in elements on scroll
  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-element').forEach(el => observer.observe(el));
  } catch(e) {
    // Fallback for older browsers
    document.querySelectorAll('.fade-in-element').forEach(el => el.classList.add('is-visible'));
  }
})();

// Balloon animation for gallery clicks
function spawnBalloon(x, y) {
  const el = document.createElement('div');
  el.className = 'balloon';
  // Use the #hearts container so balloons appear under the overlay
  const container = document.getElementById('hearts') || document.body;
  container.appendChild(el);

  el.style.left = x + 'px';
  el.style.top = y + 'px';

  const driftX = (Math.random() - 0.5) * 150;
  const driftY = -window.innerHeight - Math.random() * 100 - 150;

  el.animate([
    { transform: 'translate(-50%, 0) scale(0)', opacity: 1 },
    { transform: `translate(calc(-50% + ${driftX}px), ${driftY}px) scale(1.2)`, opacity: 0 }
  ], {
    duration: 3000 + Math.random() * 1500,
    easing: 'ease-out',
    fill: 'forwards'
  });

  setTimeout(() => el.remove(), 5000);
}
window.spawnBalloon = spawnBalloon;

