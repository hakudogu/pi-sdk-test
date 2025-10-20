let dragonTime = 0;
let wingFlap = 0;
let headBob = 0;
let tailSway = 0;

// Phoenix metadata
export const phoenix = {
  name: 'phoenix',
  rarity: 600,
  draw: drawPhoenix,
  points: Math.round(100000/600),
  bosons: 0.75 ,
  leptons: 0.50
};

function drawPhoenix(dragonCtx) {
  dragonCtx.clearRect(0, 0, 200, 200);

  // Animation calculations
  dragonTime += 0.05;
  wingFlap = Math.sin(dragonTime * 3) * 0.3;
  headBob = Math.sin(dragonTime * 1.5) * 2;
  tailSway = Math.sin(dragonTime * 2) * 5;
  const bodyPulse = Math.sin(dragonTime * 2.5) * 0.1;

  const centerX = 100;
  const centerY = 100 + headBob;

  // Phoenix body gradient (golden/orange) - more slender
  const bodyGradient = dragonCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 45);
  bodyGradient.addColorStop(0, '#FFD700');
  bodyGradient.addColorStop(0.5, '#FF8C00');
  bodyGradient.addColorStop(1, '#FF4500');

  // Main body - more slender and bird-like
  dragonCtx.fillStyle = bodyGradient;
  dragonCtx.shadowColor = 'rgba(255, 215, 0, 0.5)';
  dragonCtx.shadowBlur = 15;
  dragonCtx.beginPath();
  dragonCtx.ellipse(centerX, centerY, 20 + bodyPulse, 35 + bodyPulse, 0, 0, Math.PI * 2);
  dragonCtx.fill();

  // Phoenix head - more elegant and bird-like
  const headGradient = dragonCtx.createRadialGradient(centerX + 18, centerY - 12, 0, centerX + 18, centerY - 12, 15);
  headGradient.addColorStop(0, '#FFD700');
  headGradient.addColorStop(0.7, '#FFA500');
  headGradient.addColorStop(1, '#FF4500');

  dragonCtx.fillStyle = headGradient;
  dragonCtx.shadowBlur = 10;
  dragonCtx.beginPath();
  dragonCtx.ellipse(centerX + 18, centerY - 12, 12, 10, 0, 0, Math.PI * 2);
  dragonCtx.fill();

  // Elegant curved beak
  dragonCtx.fillStyle = '#FF6347';
  dragonCtx.beginPath();
  dragonCtx.ellipse(centerX + 28, centerY - 10, 6, 4, 0, 0, Math.PI * 2);
  dragonCtx.fill();

  // Eyes - more bird-like positioning
  dragonCtx.fillStyle = '#FFD700';
  dragonCtx.shadowBlur = 8;
  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 22, centerY - 15, 3, 0, Math.PI * 2);
  dragonCtx.fill();

  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 26, centerY - 13, 3, 0, Math.PI * 2);
  dragonCtx.fill();

  // Eye pupils
  dragonCtx.fillStyle = '#FF4500';
  dragonCtx.shadowBlur = 0;
  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 22, centerY - 15, 1.5, 0, Math.PI * 2);
  dragonCtx.fill();

  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 26, centerY - 13, 1.5, 0, Math.PI * 2);
  dragonCtx.fill();

  // Wings (flaming) - more elegant and phoenix-like
  const wingGradient = dragonCtx.createLinearGradient(centerX - 15, centerY - 25, centerX + 15, centerY - 25);
  wingGradient.addColorStop(0, '#FF4500');
  wingGradient.addColorStop(0.3, '#FF6347');
  wingGradient.addColorStop(0.7, '#FFD700');
  wingGradient.addColorStop(1, '#FF8C00');

  dragonCtx.fillStyle = wingGradient;
  dragonCtx.shadowColor = 'rgba(255, 69, 0, 0.6)';
  dragonCtx.shadowBlur = 10;

  // Left wing - more curved and elegant
  dragonCtx.save();
  dragonCtx.translate(centerX - 12, centerY - 18);
  dragonCtx.rotate(wingFlap);
  dragonCtx.beginPath();
  dragonCtx.moveTo(0, 0);
  dragonCtx.lineTo(-40, -20);
  dragonCtx.lineTo(-35, -35);
  dragonCtx.lineTo(-8, -25);
  dragonCtx.closePath();
  dragonCtx.fill();
  dragonCtx.restore();

  // Right wing - more curved and elegant
  dragonCtx.save();
  dragonCtx.translate(centerX + 12, centerY - 18);
  dragonCtx.rotate(-wingFlap);
  dragonCtx.beginPath();
  dragonCtx.moveTo(0, 0);
  dragonCtx.lineTo(40, -20);
  dragonCtx.lineTo(35, -35);
  dragonCtx.lineTo(8, -25);
  dragonCtx.closePath();
  dragonCtx.fill();
  dragonCtx.restore();

  // Long flowing tail feathers - more phoenix-like
  const tailGradient = dragonCtx.createLinearGradient(centerX - 20, centerY, centerX - 80, centerY + tailSway);
  tailGradient.addColorStop(0, '#FFD700');
  tailGradient.addColorStop(0.3, '#FF6347');
  tailGradient.addColorStop(0.7, '#FF4500');
  tailGradient.addColorStop(1, '#FF1493');

  dragonCtx.fillStyle = tailGradient;
  dragonCtx.shadowBlur = 12;

  // Multiple tail feathers for more elegant look
  for (let i = 0; i < 3; i++) {
    const offsetY = (i - 1) * 8;
    const curveOffset = tailSway * (1 + i * 0.3);

    dragonCtx.beginPath();
    dragonCtx.moveTo(centerX - 18, centerY + offsetY);
    dragonCtx.quadraticCurveTo(centerX - 45, centerY + offsetY + curveOffset, centerX - 75, centerY + offsetY + curveOffset * 1.5);
    dragonCtx.lineWidth = 6 - i;
    dragonCtx.stroke();

    // Tail tip flame
    dragonCtx.fillStyle = '#FF4500';
    dragonCtx.shadowColor = '#FF4500';
    dragonCtx.shadowBlur = 15;
    dragonCtx.beginPath();
    dragonCtx.arc(centerX - 75, centerY + offsetY + curveOffset * 1.5, 6 - i, 0, Math.PI * 2);
    dragonCtx.fill();
  }

  // Slender legs - more bird-like
  dragonCtx.fillStyle = '#FFD700';
  dragonCtx.shadowBlur = 6;
  dragonCtx.fillRect(centerX - 8, centerY + 25, 3, 10);
  dragonCtx.fillRect(centerX + 5, centerY + 25, 3, 10);

  // Elegant talons
  dragonCtx.fillStyle = '#FF6347';
  dragonCtx.shadowBlur = 0;
  dragonCtx.fillRect(centerX - 10, centerY + 33, 1.5, 3);
  dragonCtx.fillRect(centerX - 6, centerY + 33, 1.5, 3);
  dragonCtx.fillRect(centerX + 3, centerY + 33, 1.5, 3);
  dragonCtx.fillRect(centerX + 7, centerY + 33, 1.5, 3);

  // Fire aura effect
  if (Math.sin(dragonTime * 0.3) > 0.7) {
    const fireGradient = dragonCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
    fireGradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
    fireGradient.addColorStop(0.7, 'rgba(255, 69, 0, 0.2)');
    fireGradient.addColorStop(1, 'rgba(255, 69, 0, 0)');

    dragonCtx.fillStyle = fireGradient;
    dragonCtx.shadowBlur = 0;
    dragonCtx.beginPath();
    dragonCtx.arc(centerX, centerY, 80, 0, Math.PI * 2);
    dragonCtx.fill();
  }

  // Reset shadow
  dragonCtx.shadowBlur = 0;
}