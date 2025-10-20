import { showLootDisplay } from "../LootDisplay.js";

export function startLaserGame(getCurrentCreature) {
  // Get the bow div to use as the laser gun base
  const bowDiv = document.getElementById('bow');
  if (!bowDiv) return;

  // Create laser gun canvas (fixed size, bottom center)
  const gunCanvas = document.createElement('canvas');
  gunCanvas.width = 100;
  gunCanvas.height = 120;
  gunCanvas.style.position = 'fixed';
  gunCanvas.style.bottom = '10px';
  gunCanvas.style.left = '50%';
  gunCanvas.style.transform = 'translateX(-50%)';
  gunCanvas.style.zIndex = '20';
  gunCanvas.style.pointerEvents = 'auto';
  bowDiv.appendChild(gunCanvas);

  const gunCtx = gunCanvas.getContext('2d');

  // Draw a simple sci-fi laser gun
  function drawGun() {
    gunCtx.clearRect(0, 0, gunCanvas.width, gunCanvas.height);
    // Gun body
    gunCtx.fillStyle = '#222';
    gunCtx.fillRect(30, 60, 40, 30);
    // Barrel
    gunCtx.fillStyle = '#00eaff';
    gunCtx.fillRect(44, 30, 12, 40);
    // Handle
    gunCtx.fillStyle = '#444';
    gunCtx.fillRect(40, 90, 20, 25);
    // Details
    gunCtx.strokeStyle = '#0ff';
    gunCtx.lineWidth = 2;
    gunCtx.beginPath();
    gunCtx.moveTo(50, 60);
    gunCtx.lineTo(50, 30);
    gunCtx.stroke();
    // Glow
    gunCtx.shadowColor = '#00eaff';
    gunCtx.shadowBlur = 12;
    gunCtx.beginPath();
    gunCtx.arc(50, 30, 8, 0, Math.PI * 2);
    gunCtx.fillStyle = 'rgba(0,255,255,0.3)';
    gunCtx.fill();
    gunCtx.shadowBlur = 0;
  }
  drawGun();

  // Create laser beam canvas (full screen)
  const laserCanvas = document.createElement('canvas');
  laserCanvas.width = window.innerWidth;
  laserCanvas.height = window.innerHeight;
  laserCanvas.style.position = 'fixed';
  laserCanvas.style.top = '0';
  laserCanvas.style.left = '0';
  laserCanvas.style.width = '100vw';
  laserCanvas.style.height = '100vh';
  laserCanvas.style.pointerEvents = 'none';
  laserCanvas.style.zIndex = '15';
  document.body.appendChild(laserCanvas);

  const ctx = laserCanvas.getContext('2d');
  let isFiring = false;
  let targetX = 0;
  let targetY = 0;
  let score = 0;
  let totalBosons = 0;
  let totalLeptons = 0;

  // Score display
  function updateScoreDisplay() {
    let scoreElement = document.getElementById('laserScoreDisplay');
    if (!scoreElement) {
      scoreElement = document.createElement('div');
      scoreElement.id = 'laserScoreDisplay';
      scoreElement.style.position = 'fixed';
      scoreElement.style.top = '20px';
      scoreElement.style.left = '20px';
      scoreElement.style.color = '#00ffff';
      scoreElement.style.fontSize = '22px';
      scoreElement.style.fontWeight = 'bold';
      scoreElement.style.fontFamily = 'Arial, sans-serif';
      scoreElement.style.textShadow = '2px 2px 8px #000';
      scoreElement.style.zIndex = '30';
      document.body.appendChild(scoreElement);
    }
    scoreElement.textContent = `Essence: ${score}`;
  }

  // Check if laser hits the creature (centered)
  function checkCreatureHit(x, y) {
    const creatureCenterX = window.innerWidth / 2;
    const creatureCenterY = window.innerHeight / 2;
    const creatureWidth = 120;
    const creatureHeight = 100;
    return (
      x >= creatureCenterX - creatureWidth / 2 &&
      x <= creatureCenterX + creatureWidth / 2 &&
      y >= creatureCenterY - creatureHeight / 2 &&
      y <= creatureCenterY + creatureHeight / 2
    );
  }

  // Draw laser beam from gun to target
  function drawLaserBeam(x, y) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0,255,255,0.85)';
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 8;
    ctx.beginPath();
    // Gun tip position (relative to screen)
    const gunRect = gunCanvas.getBoundingClientRect();
    const gunTipX = gunRect.left + gunCanvas.width / 2;
    const gunTipY = gunRect.top + 30; // barrel tip
    ctx.moveTo(gunTipX, gunTipY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();
  }

  // Fire laser on click/touch
  function fireLaser(x, y) {
    ctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
    drawLaserBeam(x, y);
    if (checkCreatureHit(x, y)) {
      score += getCurrentCreature().points;
      if (getCurrentCreature().bosons && Math.random() < getCurrentCreature().bosons) {
        totalBosons += Math.round((0.25 + Math.random() * 0.25) * getCurrentCreature().points);
      }
      if (getCurrentCreature().leptons && Math.random() < getCurrentCreature().leptons) {
        totalLeptons += Math.round((0.25 + Math.random() * 0.25) * getCurrentCreature().points);
      }
           showLootDisplay({ essence: getCurrentCreature().points, bosons: getCurrentCreature().bosons ? (0.25 + Math.random() * 0.25) * getCurrentCreature().points : 0, leptons: getCurrentCreature().leptons ? (0.25 + Math.random() * 0.25) * getCurrentCreature().points : 0 });

      updateScoreDisplay();

    setTimeout(() => {
      ctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
    }, 120);
  }}

  // Mouse events (on gun only)
  gunCanvas.addEventListener('mousedown', (e) => {
    // Fire laser straight to center of screen (creature)
    const targetX = window.innerWidth/2 ;
    const targetY = window.innerHeight/2;
    fireLaser(targetX, targetY);
  });

  // Touch events (on gun only)
  gunCanvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2;
    fireLaser(targetX, targetY);
  });

  // Optionally, allow firing at any point on screen:
  // laserCanvas.addEventListener('mousedown', (e) => {
  //   fireLaser(e.clientX, e.clientY);
  // });
  // laserCanvas.addEventListener('touchstart', (e) => {
  //   const touch = e.touches[0];
  //   fireLaser(touch.clientX, touch.clientY);
  // });

  // Responsive resize
  function resize() {
    laserCanvas.width = window.innerWidth;
    laserCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  // updateScoreDisplay();
}