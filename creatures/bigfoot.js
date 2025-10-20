let footTime = 0;

// Bigfoot metadata
export const bigfoot = {
  name: 'Bigfoot',
  rarity: 100,
  draw: drawBigfoot,
  points: 10000/100,
  bosons: 0.75 ,
  leptons: 0.50
};

function drawBigfoot(ctx) {
  footTime += 0.02;
  ctx.clearRect(0, 0, 200, 200);

  ctx.save();
  ctx.translate(100, 100);

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.ellipse(0, 70, 38, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Body (furry texture)
  ctx.save();
  ctx.fillStyle = ctx.createLinearGradient(-30, -30, 30, 80);
  ctx.fillStyle.addColorStop(0, '#6b4f2a');
  ctx.fillStyle.addColorStop(0.5, '#4A3728');
  ctx.fillStyle.addColorStop(1, '#2d1c0f');
  ctx.beginPath();
  ctx.ellipse(0, 20, 32, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Chest fur
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#fffbe6';
  ctx.beginPath();
  ctx.ellipse(0, 35, 18, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Head (furry)
  ctx.save();
  ctx.fillStyle = ctx.createRadialGradient(0, -38, 8, 0, -38, 22);
  ctx.fillStyle.addColorStop(0, '#7c5a36');
  ctx.fillStyle.addColorStop(1, '#4A3728');
  ctx.beginPath();
  ctx.arc(0, -38, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Hairy face (ape-like)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, -32, 15, 12, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#5b4636';
  ctx.globalAlpha = 0.7;
  ctx.fill();
  ctx.globalAlpha = 1;

  // Add random fur strokes for ape look
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 13 + Math.random() * 4;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r - 32;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#4A3728';
    ctx.lineWidth = 2 + Math.random();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 4 + Math.random() * 4);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  // Face skin (smaller, more ape-like)
  ctx.save();
  ctx.fillStyle = '#a67c52';
  ctx.beginPath();
  ctx.ellipse(0, -32, 8, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Brow ridge (ape-like)
  ctx.save();
  ctx.strokeStyle = '#3a2718';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, -38, 10, Math.PI * 0.85, Math.PI * 0.15, true);
  ctx.stroke();
  ctx.restore();

  // Eyes
  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(-5, -36, 2.5, 0, Math.PI * 2);
  ctx.arc(5, -36, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-5, -36, 1.2, 0, Math.PI * 2);
  ctx.arc(5, -36, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Nose (wider, flatter)
  ctx.save();
  ctx.fillStyle = '#a67c52';
  ctx.beginPath();
  ctx.ellipse(0, -30, 3.5, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Mouth (smaller, lower)
  ctx.save();
  ctx.strokeStyle = '#a67c52';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, -25, 4, Math.PI * 0.2, Math.PI * 0.8);
  ctx.stroke();
  ctx.restore();

  // Beard (extra chin fur)
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#4A3728';
  ctx.beginPath();
  ctx.ellipse(0, -22, 8, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Arms swinging animation
  const armSwing = Math.sin(footTime) * 0.4;

  // Left arm (furry)
  ctx.save();
  ctx.translate(-32, -10);
  ctx.rotate(armSwing);
  ctx.fillStyle = '#4A3728';
  ctx.beginPath();
  ctx.ellipse(0, 22, 8, 22, Math.PI * 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Hand
  ctx.fillStyle = '#a67c52';
  ctx.beginPath();
  ctx.ellipse(0, 44, 7, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Right arm (furry)
  ctx.save();
  ctx.translate(32, -10);
  ctx.rotate(-armSwing);
  ctx.fillStyle = '#4A3728';
  ctx.beginPath();
  ctx.ellipse(0, 22, 8, 22, -Math.PI * 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Hand
  ctx.fillStyle = '#a67c52';
  ctx.beginPath();
  ctx.ellipse(0, 44, 7, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Legs with walking animation
  const legSwing = Math.sin(footTime) * 0.25;

  // Left leg
  ctx.save();
  ctx.translate(-14, 60);
  ctx.rotate(legSwing);
  ctx.fillStyle = '#4A3728';
  ctx.beginPath();
  ctx.ellipse(0, 22, 9, 22, Math.PI * 0.05, 0, Math.PI * 2);
  ctx.fill();
  // Big foot
  ctx.fillStyle = '#3A2718';
  ctx.beginPath();
  ctx.ellipse(0, 44, 14, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  // Toes
  ctx.fillStyle = '#a67c52';
  for (let t = -1; t <= 1; t++) {
    ctx.beginPath();
    ctx.arc(t * 5, 50, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Right leg
  ctx.save();
  ctx.translate(14, 60);
  ctx.rotate(-legSwing);
  ctx.fillStyle = '#4A3728';
  ctx.beginPath();
  ctx.ellipse(0, 22, 9, 22, -Math.PI * 0.05, 0, Math.PI * 2);
  ctx.fill();
  // Big foot
  ctx.fillStyle = '#3A2718';
  ctx.beginPath();
  ctx.ellipse(0, 44, 14, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  // Toes
  ctx.fillStyle = '#a67c52';
  for (let t = -1; t <= 1; t++) {
    ctx.beginPath();
    ctx.arc(t * 5, 50, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.restore();
}