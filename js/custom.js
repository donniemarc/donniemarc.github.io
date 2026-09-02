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

    // 在 #site-subtitle 下方插入搜索框
    const subtitle = document.querySelector('#site-subtitle');
    const searchBox = document.createElement('div');
    searchBox.className = 'home-search-box';
    searchBox.innerHTML = `
      <div class="home-search-inner">
        <i class="fas fa-search home-search-icon"></i>
        <input type="text" class="home-search-input" placeholder="">
      </div>
    `;
    siteInfo.insertBefore(searchBox, subtitle.nextSibling);

    // 搜索框回车触发本地搜索
    const searchInput = searchBox.querySelector('.home-search-input');
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const q = this.value.trim();
        if (q) {
          // 触发导航栏搜索按钮点击，打开 Butterfly 搜索对话框
          const searchBtn = document.querySelector('#search-button > .search');
          if (searchBtn) {
            searchBtn.click();
            // 将搜索词填入搜索对话框
            setTimeout(() => {
              const dialogInput = document.querySelector('#local-search .local-search-input input');
              if (dialogInput) {
                dialogInput.value = q;
                dialogInput.dispatchEvent(new Event('input'));
              }
            }, 400);
          }
        }
      }
    });

    const strings = [
      'Turning imagination into reality, one layer at a time.',
      'Every line of code is a small act of trust toward the world.',
      'True passion means wanting to try again, even after a hundred failures.',
      'Documentation is not about proving existence — it\'s about letting ideas leave a trace.',
      'We keep tinkering because we believe in building over waiting.'
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
