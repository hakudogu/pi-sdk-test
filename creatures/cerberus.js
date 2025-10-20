let cerberusTime = 0;

// cerberus metadata
export const cerberus = {
  name: 'cerberus',
  rarity: 1000000,
  points: 2000,
  draw: drawCerberus,
  bosons: 0.75 ,
  leptons: 0.50
};

function drawCerberus(ctx) {
  cerberusTime += 0.04;
  ctx.clearRect(0, 0, 200, 200);

  const centerX = 100;
  const centerY = 120 + Math.sin(cerberusTime) * 2;

  // Colors
  const mainPurple = '#7c3aed';
  const darkPurple = '#4c1d95';
  const lightPurple = '#c4b5fd';
  const accentCyan = '#38bdf8';
  const accentPink = '#f472b6';
  const accentYellow = '#fde047';

  // Body
  const bodyGradient = ctx.createLinearGradient(centerX, centerY + 30, centerX, centerY + 80);
  bodyGradient.addColorStop(0, mainPurple);
  bodyGradient.addColorStop(1, darkPurple);
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 40, 45, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  ctx.lineCap = 'round';
  ctx.lineWidth = 14;
  ctx.strokeStyle = darkPurple;
  for (let i = -1; i <= 1; i += 2) {
    ctx.beginPath();
    ctx.moveTo(centerX - 20 * i, centerY + 60);
    ctx.lineTo(centerX - 20 * i, centerY + 100);
    ctx.stroke();
  }
  ctx.lineWidth = 10;
  ctx.strokeStyle = mainPurple;
  for (let i = -1; i <= 1; i += 2) {
    ctx.beginPath();
    ctx.moveTo(centerX - 10 * i, centerY + 60);
    ctx.lineTo(centerX - 10 * i, centerY + 100);
    ctx.stroke();
  }

  // Tails (wiggle)
  for (let t = 0; t < 2; t++) {
    ctx.save();
    ctx.strokeStyle = accentCyan;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(centerX + 40, centerY + 60 + t * 8);
    ctx.quadraticCurveTo(
      centerX + 70 + Math.sin(cerberusTime + t) * 10,
      centerY + 80 + t * 10,
      centerX + 60 + Math.cos(cerberusTime + t) * 10,
      centerY + 110 + t * 8
    );
    ctx.stroke();
    ctx.restore();
  }

  // Head positions (left, center, right)
  const headOffsets = [-38, 0, 38];
  const headAngles = [
    Math.sin(cerberusTime) * 0.08 - 0.08,
    0,
    -Math.sin(cerberusTime) * 0.08 + 0.08
  ];

  headOffsets.forEach((offset, i) => {
    ctx.save();
    ctx.translate(centerX + offset, centerY);
    ctx.rotate(headAngles[i]);

    // Neck
    ctx.strokeStyle = darkPurple;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(0, 10);
    ctx.stroke();

    // Head
    ctx.fillStyle = mainPurple;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Snout
    ctx.save();
    ctx.rotate(i === 0 ? -0.18 : i === 2 ? 0.18 : 0);
    ctx.fillStyle = lightPurple;
    ctx.beginPath();
    ctx.ellipse(18, 6, 13, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Nose
    ctx.fillStyle = accentPink;
    ctx.beginPath();
    ctx.arc(26, 8, 3, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = accentYellow;
    ctx.beginPath();
    ctx.arc(10, -6, 3, 0, Math.PI * 2);
    ctx.arc(18, -8, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#22223a';
    ctx.beginPath();
    ctx.arc(10, -6, 1, 0, Math.PI * 2);
    ctx.arc(18, -8, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.save();
    ctx.fillStyle = accentCyan;
    ctx.rotate(-0.5);
    ctx.beginPath();
    ctx.ellipse(-15, -18, 7, 14, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = accentPink;
    ctx.rotate(0.5);
    ctx.beginPath();
    ctx.ellipse(10, -22, 7, 14, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Mouth (snarl, animated)
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(18, 13);
    ctx.quadraticCurveTo(22, 16 + Math.sin(cerberusTime * 2 + i) * 2, 26, 10);
    ctx.stroke();

    // Teeth
    ctx.fillStyle = '#fff';
    for (let t = 0; t < 3; t++) {
      ctx.beginPath();
      ctx.ellipse(20 + t * 2.5, 13, 1.2, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });

  // Chest fluff
  ctx.save();
  ctx.fillStyle = lightPurple;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 25, 18, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}