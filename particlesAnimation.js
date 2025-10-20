let particles = [];
let ctx = null;
let animationStarted = false;

// Create or get the shared particle canvas
function getParticlesCanvas() {
  let canvas = document.getElementById('particlesCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particlesCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '100';
    document.body.appendChild(canvas);
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}

// Exported function to create hit particles at (x, y)
export function createHitParticles(x, y) {
  const particleCount = 15;
  const colors = ['#FFD700', '#FF6347', '#FF4500', '#FF1493', '#00FFFF', '#FF69B4'];
  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
    const speed = 2 + Math.random() * 4;
    const size = 3 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
      x: x,
      y: y,
      velX: Math.cos(angle) * speed,
      velY: Math.sin(angle) * speed,
      size: size,
      color: color,
      life: 60 + Math.random() * 40,
      maxLife: 60 + Math.random() * 40,
      alpha: 1,
      glow: true
    });
  }
  // Start animation loop if not already running
  if (!animationStarted) {
    startParticlesAnimation();
  }
}

// Animation loop (called once, keeps running as long as particles exist)
function startParticlesAnimation() {
  animationStarted = true;
  const canvas = getParticlesCanvas();
  ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.x += particle.velX;
      particle.y += particle.velY;
      particle.velY += 0.1;
      particle.velX *= 0.98;
      particle.velY *= 0.98;
      particle.life--;
      particle.alpha = particle.life / particle.maxLife;
      if (particle.life <= 0 || particle.alpha <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
      ctx.save();
      ctx.globalAlpha = particle.alpha;
      if (particle.glow) {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
      }
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function animate() {
    updateParticles();
    drawParticles();
    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      animationStarted = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}