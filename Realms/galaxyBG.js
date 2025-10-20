export function setupGalaxyBackground() {
  let galaxyCanvas = document.createElement('canvas');
  galaxyCanvas.id = 'galaxy-bg';
  galaxyCanvas.style.position = 'fixed';
  galaxyCanvas.style.top = '0';
  galaxyCanvas.style.left = '0';
  galaxyCanvas.style.width = '100vw';
  galaxyCanvas.style.height = '100vh';
  galaxyCanvas.style.zIndex = '0';
  galaxyCanvas.style.pointerEvents = 'none';
  document.body.insertBefore(galaxyCanvas, document.body.firstChild);

  const ctx = galaxyCanvas.getContext('2d');
  let stars = [];
  let w = 0, h = 0;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    galaxyCanvas.width = w;
    galaxyCanvas.height = h;
    stars = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.7 + Math.random() * 1.8,
        speed: 0.02 + Math.random() * 0.06,
        twinkle: Math.random() * Math.PI * 2,
        color: ["#fff", "#8be9fd", "#f1fa8c", "#bd93f9", "#ff79c6"][Math.floor(Math.random()*5)]
      });
    }
  }
  window.addEventListener('resize', resize);
  resize();

  function animateGalaxy() {
    ctx.clearRect(0, 0, w, h);

    // Nebula gradient
    let nebula = ctx.createRadialGradient(w/2, h/2, h/8, w/2, h/2, h/1.2);
    nebula.addColorStop(0, "rgba(139,233,253,0.08)");
    nebula.addColorStop(0.3, "rgba(189,147,249,0.07)");
    nebula.addColorStop(0.6, "rgba(255,121,198,0.05)");
    nebula.addColorStop(1, "rgba(24,24,37,0.95)");
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, w, h);

    // Draw stars
    for (let star of stars) {
      star.x += star.speed * 0.5;
      star.y += star.speed * 0.2;
      if (star.x > w) star.x = 0;
      if (star.y > h) star.y = 0;
      const tw = 0.7 + 0.5 * Math.sin(performance.now()/2000 + star.twinkle);
      ctx.save();
      ctx.globalAlpha = 0.7 * tw;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r * tw, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.shadowColor = star.color;
      ctx.shadowBlur = 8 * tw;
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(animateGalaxy);
  }
  animateGalaxy();
};
// --- END GALAXY BACKGROUND ---