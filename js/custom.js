// Custom typing effect for home page
(function() {
  function initTyping() {
    // Check if we're on the home page
    const siteTitle = document.querySelector('#site-title');
    if (!siteTitle) return;
    
    const subtitleContainer = document.createElement('div');
    subtitleContainer.id = 'site-subtitle';
    subtitleContainer.className = 'subtitle-text';
    
    // Insert after site title
    siteTitle.parentNode.insertBefore(subtitleContainer, siteTitle.nextSibling);
    
    // Typing effect
    const strings = [
      '轻量级自建图纸文档管理系统',
      '支持 DWG/DXF/STEP/IGES/STL/PDF 预览',
      'Docker Compose 一键部署',
      '3D打印设计项目分享'
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentString = strings[stringIndex];
      
      if (isDeleting) {
        subtitleContainer.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
      } else {
        subtitleContainer.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 150;
      
      if (!isDeleting && charIndex === currentString.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typeSpeed = 500; // Pause before next string
      }
      
      setTimeout(type, typeSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyping);
  } else {
    initTyping();
  }
})();
