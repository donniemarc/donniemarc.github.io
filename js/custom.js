// Custom home page effects
(function() {
  // Typing effect for the profound quote on the home page banner
  function initTyping() {
    const sub = document.querySelector('#site-info #subtitle');
    if (!sub || sub.dataset.typingReady) return;
    sub.dataset.typingReady = '1';

    const strings = [
      'Don·Lab'
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
