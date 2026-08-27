// Custom home page effects
(function() {
  const isHome = () => !!document.querySelector('#page-site-info');

  // Typing effect for the profound quote on home page
  function initTyping() {
    const siteInfo = document.querySelector('#page-site-info');
    if (!siteInfo || document.querySelector('.home-quote')) return;

    const quoteWrap = document.createElement('div');
    quoteWrap.id = 'site-subtitle';
    quoteWrap.className = 'home-quote';

    const prefix = document.createElement('span');
    prefix.className = 'home-quote-mark home-quote-open';
    prefix.textContent = '“';
    const text = document.createElement('span');
    text.className = 'home-quote-text';
    const suffix = document.createElement('span');
    suffix.className = 'home-quote-mark home-quote-close';
    suffix.textContent = '”';

    quoteWrap.appendChild(prefix);
    quoteWrap.appendChild(text);
    quoteWrap.appendChild(suffix);
    siteInfo.appendChild(quoteWrap);

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
        text.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        text.textContent = current.substring(0, charIndex + 1);
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

  // Render the latest posts into the blank area left of the profile card
  function initRecentPosts() {
    const container = document.querySelector('.type-home #article-container');
    if (!container) return;

    fetch('/recent-posts.json', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        const posts = (data && data.posts) || [];

        const section = document.createElement('section');
        section.className = 'home-recent-posts';

        const header = document.createElement('h2');
        header.className = 'home-recent-posts-title';
        header.innerHTML = '<i class="fas fa-fire"></i> 最新文章';
        section.appendChild(header);

        if (!posts.length) {
          const empty = document.createElement('p');
          empty.className = 'home-recent-posts-empty';
          empty.textContent = '还没有文章，敬请期待……';
          section.appendChild(empty);
        } else {
          const list = document.createElement('ul');
          list.className = 'home-recent-posts-list';
          posts.forEach(post => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = post.path;
            link.className = 'home-recent-post-link';
            link.innerHTML =
              '<span class="home-recent-post-title">' + escapeHtml(post.title) + '</span>' +
              '<span class="home-recent-post-date">' + escapeHtml(post.date) + '</span>';
            li.appendChild(link);
            list.appendChild(li);
          });
          section.appendChild(list);
        }

        container.appendChild(section);
      })
      .catch(() => {
        // ignore fetch errors silently
      });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = String(str || '');
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (isHome()) {
        initTyping();
        initRecentPosts();
      }
    });
  } else if (isHome()) {
    initTyping();
    initRecentPosts();
  }
})();
