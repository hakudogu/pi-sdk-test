let voidTime = 0;

// cosmicVoid metadata
export const cosmicVoid = {
  name: 'cosmicVoid',
  rarity: 10000000,
  draw: drawCosmicVoid,
  points: 100000/1,
  bosons: 0.75 ,
  leptons: 0.50
  
};

function drawCosmicVoid(ctx) {
  voidTime += 0.03;
  ctx.clearRect(0, 0, 200, 200);

  // Draw swirling dark core
  const centerX = 100;
  const centerY = 100;
  const coreGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 60);
  coreGradient.addColorStop(0, '#22223a');
  coreGradient.addColorStop(0.4, '#2d2d44');
  coreGradient.addColorStop(0.7, '#1a1a2e');
  coreGradient.addColorStop(1, 'rgba(10,10,30,0)');

  ctx.save();
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
  ctx.fillStyle = coreGradient;
  ctx.fill();
  ctx.restore();

  // Swirling energy rings
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(voidTime * (0.5 + i * 0.2) + i);
    ctx.globalAlpha = 0.18 + 0.08 * i;
    ctx.strokeStyle = ['#8be9fd', '#bd93f9', '#f1fa8c', '#ff79c6'][i % 4];
    ctx.lineWidth = 2 + i;
    ctx.beginPath();
    ctx.ellipse(0, 0, 40 + i * 10, 18 + i * 6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Flickering stars around the void
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + voidTime * (0.6 + i * 0.03);
    const radius = 70 + Math.sin(voidTime * 1.2 + i) * 8;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.save();
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(voidTime * 2 + i);
    ctx.fillStyle = ['#f8f8f2', '#8be9fd', '#f1fa8c', '#bd93f9'][i % 4];
    ctx.beginPath();
    ctx.arc(x, y, 2 + Math.sin(voidTime * 2 + i) * 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Event horizon shimmer
  ctx.save();
  ctx.globalAlpha = 0.25 + 0.15 * Math.sin(voidTime * 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}