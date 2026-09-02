// Custom home page effects
(function() {
  // Typing effect for the profound quote on the home page banner
  function initTyping() {
    const sub = document.querySelector('#site-info #subtitle');
    if (!sub || sub.dataset.typingReady) return;
    sub.dataset.typingReady = '1';

    // 在 #subtitle 上方插入 Don·Lab 静态标题
    const siteInfo = document.querySelector('#site-info');
    const labTitle = document.createElement('div');
    labTitle.className = 'home-lab-title';
    labTitle.textContent = 'Don·Lab';
    siteInfo.insertBefore(labTitle, document.querySelector('#site-info #site-subtitle'));

    const strings = [
      'Build, fail, repeat.',
      'Creating what I imagine.',
      'Code & 3D prints.',
      'One layer at a time.',
      'Never stop tinkering.'
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = strings[stringIndex];

      if (isDeleting) {
        sub.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        sub.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 110;

      if (!isDeleting && charIndex === current.length) {
        speed = 2800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        speed = 600;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyping);
  } else {
    initTyping();
  }
})();

// Background image (no video)
(function() {
  function initBgImage() {
    if (document.getElementById('bg-video')) return;
    const v = document.createElement('video');
    v.id = 'bg-video';
    v.poster = '/images/bg2.jpg';
    v.setAttribute('autoplay', '');
    v.setAttribute('loop', '');
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('preload', 'auto');
    v.src = '/images/bg2.jpg';
    document.body.appendChild(v);
    const p = v.play();
    if (p && p.catch) p.catch(function() {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBgImage);
  } else {
    initBgImage();
  }
})();
