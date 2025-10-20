let joroTime = 0;

// Jorogumo metadata
export const jorogumo = {
  name: 'Jorogumo',
  rarity: 31,
  draw: drawJorogumo,
  points: Math.floor(100000/31),
  bosons: 0.75 ,
  leptons: 0.50
};

function drawJorogumo(ctx) {
  joroTime += 0.02;
  ctx.clearRect(0, 0, 200, 200);

  ctx.save();
  ctx.translate(100, 100);

  // Shadow
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.ellipse(0, 70, 34, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Spider body (abdomen)
  ctx.save();
  ctx.fillStyle = '#2d1c0f';
  ctx.beginPath();
  ctx.ellipse(0, 38, 28, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  // Red hourglass marking
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = '#d7263d';
  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.lineTo(-6, 38);
  ctx.lineTo(0, 26);
  ctx.lineTo(6, 38);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Human upper body (torso)
  ctx.save();
  ctx.fillStyle = '#fbe7c6';
  ctx.beginPath();
  ctx.ellipse(0, 10, 14, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Kimono (red, flowing)
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = '#d7263d';
  ctx.beginPath();
  ctx.moveTo(-14, 10);
  ctx.lineTo(-28, 38);
  ctx.lineTo(0, 60);
  ctx.lineTo(28, 38);
  ctx.lineTo(14, 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Head (pale, elegant)
  ctx.save();
  ctx.fillStyle = '#fbe7c6';
  ctx.beginPath();
  ctx.arc(0, -18, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Hair (black, traditional bun)
  ctx.save();
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(0, -26, 10, 0, Math.PI * 2);
  ctx.fill();
  // Bun
  ctx.beginPath();
  ctx.arc(0, -32, 6, 0, Math.PI * 2);
  ctx.fill();
  // Hair sticks
  ctx.strokeStyle = '#bfa77a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-4, -34);
  ctx.lineTo(-14, -40);
  ctx.moveTo(4, -34);
  ctx.lineTo(14, -40);
  ctx.stroke();
  ctx.restore();

  // Face (sharp, mysterious)
  ctx.save();
  // Eyes
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(-4, -20, 1.5, 0, Math.PI * 2);
  ctx.arc(4, -20, 1.5, 0, Math.PI * 2);
  ctx.fill();
  // Red eyeshadow
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#d7263d';
  ctx.beginPath();
  ctx.arc(-4, -22, 2.2, 0, Math.PI * 2);
  ctx.arc(4, -22, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  // Brows
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(-4, -23, 2, Math.PI * 0.9, Math.PI * 2.1);
  ctx.arc(4, -23, 2, Math.PI * 0.9, Math.PI * 2.1);
  ctx.stroke();
  // Nose
  ctx.beginPath();
  ctx.moveTo(0, -19);
  ctx.lineTo(0, -17);
  ctx.stroke();
  // Lips (red, small)
  ctx.strokeStyle = '#d7263d';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, -15, 2.5, Math.PI * 0.2, Math.PI * 0.8);
  ctx.stroke();
  ctx.restore();

  // Spider legs (8, animated)
  ctx.save();
  ctx.strokeStyle = '#2d1c0f';
  ctx.lineWidth = 4;
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI * (0.2 + i / 8 * 1.6);
    const swing = Math.sin(joroTime * 1.5 + i) * 8;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 18, 38 + Math.sin(angle) * 18);
    ctx.lineTo(Math.cos(angle) * (38 + swing), 38 + Math.sin(angle) * (38 + swing));
    ctx.stroke();
  }
  ctx.restore();

  // Web effect (faint, mystical)
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = '#fff';
  for (let r = 30; r <= 60; r += 10) {
    ctx.beginPath();
    ctx.arc(0, 38, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI * (0.2 + i / 8 * 1.6);
    ctx.beginPath();
    ctx.moveTo(0, 38);
    ctx.lineTo(Math.cos(angle) * 60, 38 + Math.sin(angle) * 60);
    ctx.stroke();
  }
  ctx.restore();

  ctx.restore();
}