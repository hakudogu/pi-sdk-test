let greyTime = 0;
let blinkTimer = 0;
let isBlinking = false;

// Orb animation state
let orbPhase = 0;

// Grey Alien metadata
export const grey = {
  name: 'Grey Alien',
  rarity: 75,
  draw: drawGrey,
  points: Math.round(100000/75),
  bosons: 0.75 ,
  leptons: 0.50
};

function drawGrey(ctx) {
  greyTime += 0.02;
  blinkTimer += 1;
  orbPhase += 0.03;

  // Blink every ~3 seconds, lasts ~15 frames
  if (!isBlinking && Math.random() < 0.01 && blinkTimer > 180) {
    isBlinking = true;
    blinkTimer = 0;
  }
  if (isBlinking && blinkTimer > 15) {
    isBlinking = false;
    blinkTimer = 0;
  }

  ctx.clearRect(0, 0, 200, 200);

  ctx.save();
  ctx.translate(100, 100);

  // --- Dynamic Orbs Floating Around ---
  for (let i = 0; i < 4; i++) {
    const angle = orbPhase + (Math.PI * 2 * i) / 4;
    const radius = 54 + Math.sin(orbPhase + i) * 8;
    const orbX = Math.cos(angle) * radius;
    const orbY = Math.sin(angle) * radius - 10 + Math.cos(orbPhase * 2 + i) * 4;

    ctx.save();
    ctx.globalAlpha = 0.45 + 0.25 * Math.sin(orbPhase * 2 + i);
    const orbGradient = ctx.createRadialGradient(orbX, orbY, 2, orbX, orbY, 12);
    orbGradient.addColorStop(0, "#fff");
    orbGradient.addColorStop(0.3, "#8be9fd");
    orbGradient.addColorStop(0.7, "#bd93f9");
    orbGradient.addColorStop(1, "rgba(139,233,253,0)");
    ctx.fillStyle = orbGradient;
    ctx.beginPath();
    ctx.arc(orbX, orbY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.ellipse(0, 70, 32, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Body (thin, elongated)
  ctx.save();
  ctx.fillStyle = '#bfc3c7';
  ctx.beginPath();
  ctx.ellipse(0, 30, 18, 38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Head (large, classic alien shape)
  ctx.save();
  ctx.fillStyle = '#d3d7db';
  ctx.beginPath();
  ctx.ellipse(0, -38, 34, 44, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Forehead shine
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.ellipse(-8, -52, 12, 8, Math.PI/8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Eyes (large, black, slanted)
  ctx.save();
  ctx.fillStyle = '#222';
  if (!isBlinking) {
    ctx.beginPath();
    ctx.ellipse(-13, -38, 10, 18, -0.3, 0, Math.PI * 2);
    ctx.ellipse(13, -38, 10, 18, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Eye shine
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(-17, -45, 4, 6, -0.3, 0, Math.PI * 2);
    ctx.ellipse(9, -45, 4, 6, 0.3, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Draw eyelids (blink)
    ctx.fillStyle = '#d3d7db';
    ctx.beginPath();
    ctx.ellipse(-13, -38, 10, 18, -0.3, 0, Math.PI * 2);
    ctx.ellipse(13, -38, 10, 18, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Eyelid line
    ctx.strokeStyle = '#bfc3c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(-13, -38, 10, 18, -0.3, 0, Math.PI * 2);
    ctx.ellipse(13, -38, 10, 18, 0.3, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Nose (tiny, just nostrils)
  ctx.save();
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.arc(-2, -22, 1, 0, Math.PI * 2);
  ctx.arc(2, -22, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Neck
  ctx.save();
  ctx.fillStyle = '#bfc3c7';
  ctx.beginPath();
  ctx.ellipse(0, -10, 7, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Arms (thin, long, slightly bent)
  const armSwing = Math.sin(greyTime) * 0.2;
  ctx.save();
  ctx.strokeStyle = '#bfc3c7';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-14, 10);
  ctx.quadraticCurveTo(-38, 40 + armSwing * 10, -22, 70);
  ctx.moveTo(14, 10);
  ctx.quadraticCurveTo(38, 40 - armSwing * 10, 22, 70);
  ctx.stroke();
  ctx.restore();

  // Fingers (3 per hand)
  ctx.save();
  ctx.strokeStyle = '#bfc3c7';
  ctx.lineWidth = 3;
  for (let side of [-1, 1]) {
    for (let f = -1; f <= 1; f++) {
      ctx.beginPath();
      ctx.moveTo(side * 22, 70);
      ctx.lineTo(side * (22 + 7 * f), 78);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Legs (thin, long)
  ctx.save();
  ctx.strokeStyle = '#bfc3c7';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-8, 60);
  ctx.lineTo(-12, 110);
  ctx.moveTo(8, 60);
  ctx.lineTo(12, 110);
  ctx.stroke();
  ctx.restore();

  // Feet (small, oval)
  ctx.save();
  ctx.fillStyle = '#bfc3c7';
  ctx.beginPath();
  ctx.ellipse(-12, 112, 8, 4, 0.2, 0, Math.PI * 2);
  ctx.ellipse(12, 112, 8, 4, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}