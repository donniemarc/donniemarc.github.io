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
    siteInfo.insertBefore(labTitle, sub);

    const strings = [
      '把脑海中的构想，一点点打印成现实，是创造者独有的浪漫。',
      '每一行代码，都是向世界交出的、一份小小的信任。',
      '真正的热爱，是失败一百次之后，依然想再试一次。',
      '记录不是为了证明存在，而是为了让思考留下痕迹。',
      '折腾不止，是因为相信亲手创造，好过坐等答案。'
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
