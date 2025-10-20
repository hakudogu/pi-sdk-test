let bunianTime = 0;

// Orang Bunian metadata
export const orangBunian = {
  name: 'Orang Bunian',
  rarity: 35,
  draw: drawOrangBunian,
  points: Math.floor(100000/35),
  bosons: 0.75 ,
  leptons: 0.50
};

function drawOrangBunian(ctx) {
  bunianTime += 0.02;
  ctx.clearRect(0, 0, 200, 200);

  ctx.save();
  ctx.translate(100, 100);

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.ellipse(0, 70, 32, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Flowing robe (ethereal, light blue)
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = ctx.createLinearGradient(-30, 0, 30, 80);
  ctx.fillStyle.addColorStop(0, '#b3eaff');
  ctx.fillStyle.addColorStop(0.5, '#e0f7fa');
  ctx.fillStyle.addColorStop(1, '#b3eaff');
  ctx.beginPath();
  ctx.ellipse(0, 30, 28, 44, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Head (soft tan)
  ctx.save();
  ctx.fillStyle = '#fbe7c6';
  ctx.beginPath();
  ctx.arc(0, -38, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Hair (long, black, flowing)
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.ellipse(0, -28, 16, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  // Strands
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 10, -45);
    ctx.bezierCurveTo(i * 14, -55, i * 18, -15, i * 8, 0);
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();

  // Face (gentle features)
  ctx.save();
  // Eyes
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-6, -38, 2.2, 0, Math.PI * 2);
  ctx.arc(6, -38, 2.2, 0, Math.PI * 2);
  ctx.fill();
  // Brows
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(-6, -41, 3, Math.PI * 0.9, Math.PI * 2.1);
  ctx.arc(6, -41, 3, Math.PI * 0.9, Math.PI * 2.1);
  ctx.stroke();
  // Nose
  ctx.beginPath();
  ctx.moveTo(0, -36);
  ctx.lineTo(0, -34);
  ctx.stroke();
  // Mouth (gentle smile)
  ctx.strokeStyle = '#b77b5a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, -32, 4, Math.PI * 0.2, Math.PI * 0.8);
  ctx.stroke();
  ctx.restore();

  // Arms (flowing sleeves)
  const armSwing = Math.sin(bunianTime) * 0.2;
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = '#b3eaff';
  // Left arm
  ctx.save();
  ctx.translate(-20, 0);
  ctx.rotate(armSwing);
  ctx.beginPath();
  ctx.ellipse(0, 24, 8, 22, Math.PI * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // Right arm
  ctx.save();
  ctx.translate(20, 0);
  ctx.rotate(-armSwing);
  ctx.beginPath();
  ctx.ellipse(0, 24, 8, 22, -Math.PI * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.restore();

  // Hands (delicate, tan)
  ctx.save();
  ctx.fillStyle = '#fbe7c6';
  ctx.beginPath();
  ctx.ellipse(-20, 44, 6, 4, 0.2, 0, Math.PI * 2);
  ctx.ellipse(20, 44, 6, 4, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Ethereal glow
  ctx.save();
  ctx.globalAlpha = 0.18 + 0.08 * Math.sin(bunianTime * 2);
  ctx.beginPath();
  ctx.arc(0, 10, 60, 0, Math.PI * 2);
  ctx.fillStyle = '#b3eaff';
  ctx.fill();
  ctx.restore();

  ctx.restore();
}