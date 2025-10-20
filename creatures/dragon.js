// Dragon animation state
let dragonTime = 0;
let wingFlap = 0;
let headBob = 0;
let tailSway = 0;

// Dragon metadata
export const dragon = {
  name: 'dragon',
  rarity: 500,
  draw: drawDragon,
  points: 100000/500,
  bosons: 0.75 ,
  leptons: 0.50
};

// Draw 3D dragon with animations
 function drawDragon(dragonCtx) {
  dragonCtx.clearRect(0, 0, 200, 200);

  // Animation calculations
  dragonTime += 0.05;
  wingFlap = Math.sin(dragonTime * 3) * 0.3;
  headBob = Math.sin(dragonTime * 1.5) * 2;
  tailSway = Math.sin(dragonTime * 2) * 5;
  const bodyPulse = Math.sin(dragonTime * 2.5) * 0.1;

  const centerX = 100;
  const centerY = 100 + headBob;

  // Dragon body gradient
  const bodyGradient = dragonCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
  bodyGradient.addColorStop(0, '#8B0000');
  bodyGradient.addColorStop(0.5, '#DC143C');
  bodyGradient.addColorStop(1, '#B22222');

  // Main body
  dragonCtx.fillStyle = bodyGradient;
  dragonCtx.shadowColor = 'rgba(139, 0, 0, 0.5)';
  dragonCtx.shadowBlur = 10;
  dragonCtx.beginPath();
  dragonCtx.ellipse(centerX, centerY, 35 + bodyPulse, 25 + bodyPulse, 0, 0, Math.PI * 2);
  dragonCtx.fill();

  // Dragon head
  const headGradient = dragonCtx.createRadialGradient(centerX + 25, centerY - 10, 0, centerX + 25, centerY - 10, 20);
  headGradient.addColorStop(0, '#FF6347');
  headGradient.addColorStop(0.7, '#DC143C');
  headGradient.addColorStop(1, '#8B0000');

  dragonCtx.fillStyle = headGradient;
  dragonCtx.shadowBlur = 8;
  dragonCtx.beginPath();
  dragonCtx.ellipse(centerX + 25, centerY - 10, 18, 15, 0, 0, Math.PI * 2);
  dragonCtx.fill();

  // Dragon snout
  dragonCtx.fillStyle = '#CD5C5C';
  dragonCtx.beginPath();
  dragonCtx.ellipse(centerX + 40, centerY - 8, 12, 8, 0, 0, Math.PI * 2);
  dragonCtx.fill();

  // Eyes
  dragonCtx.fillStyle = '#FFD700';
  dragonCtx.shadowBlur = 5;
  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 30, centerY - 15, 4, 0, Math.PI * 2);
  dragonCtx.fill();

  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 35, centerY - 12, 4, 0, Math.PI * 2);
  dragonCtx.fill();

  // Eye pupils
  dragonCtx.fillStyle = '#000000';
  dragonCtx.shadowBlur = 0;
  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 30, centerY - 15, 2, 0, Math.PI * 2);
  dragonCtx.fill();

  dragonCtx.beginPath();
  dragonCtx.arc(centerX + 35, centerY - 12, 2, 0, Math.PI * 2);
  dragonCtx.fill();

  // Wings (animated)
  const wingGradient = dragonCtx.createLinearGradient(centerX - 20, centerY - 30, centerX + 20, centerY - 30);
  wingGradient.addColorStop(0, '#2F4F4F');
  wingGradient.addColorStop(0.5, '#708090');
  wingGradient.addColorStop(1, '#4682B4');

  dragonCtx.fillStyle = wingGradient;
  dragonCtx.shadowColor = 'rgba(47, 79, 79, 0.3)';
  dragonCtx.shadowBlur = 6;

  // Left wing
  dragonCtx.save();
  dragonCtx.translate(centerX - 15, centerY - 20);
  dragonCtx.rotate(wingFlap);
  dragonCtx.beginPath();
  dragonCtx.moveTo(0, 0);
  dragonCtx.lineTo(-30, -20);
  dragonCtx.lineTo(-25, -35);
  dragonCtx.lineTo(-5, -25);
  dragonCtx.closePath();
  dragonCtx.fill();
  dragonCtx.restore();

  // Right wing
  dragonCtx.save();
  dragonCtx.translate(centerX + 15, centerY - 20);
  dragonCtx.rotate(-wingFlap);
  dragonCtx.beginPath();
  dragonCtx.moveTo(0, 0);
  dragonCtx.lineTo(30, -20);
  dragonCtx.lineTo(25, -35);
  dragonCtx.lineTo(5, -25);
  dragonCtx.closePath();
  dragonCtx.fill();
  dragonCtx.restore();

  // Tail (animated sway)
  const tailGradient = dragonCtx.createLinearGradient(centerX - 40, centerY, centerX - 60, centerY + tailSway);
  tailGradient.addColorStop(0, '#DC143C');
  tailGradient.addColorStop(1, '#8B0000');

  dragonCtx.fillStyle = tailGradient;
  dragonCtx.shadowBlur = 8;
  dragonCtx.beginPath();
  dragonCtx.moveTo(centerX - 35, centerY);
  dragonCtx.quadraticCurveTo(centerX - 50, centerY + tailSway, centerX - 60, centerY + tailSway * 1.5);
  dragonCtx.lineWidth = 8;
  dragonCtx.stroke();

  // Tail tip
  dragonCtx.fillStyle = '#FF4500';
  dragonCtx.beginPath();
  dragonCtx.arc(centerX - 60, centerY + tailSway * 1.5, 6, 0, Math.PI * 2);
  dragonCtx.fill();

  // Legs
  dragonCtx.fillStyle = '#8B0000';
  dragonCtx.shadowBlur = 4;
  dragonCtx.fillRect(centerX - 20, centerY + 15, 6, 15);
  dragonCtx.fillRect(centerX - 5, centerY + 15, 6, 15);
  dragonCtx.fillRect(centerX + 10, centerY + 15, 6, 15);
  dragonCtx.fillRect(centerX + 25, centerY + 15, 6, 15);

  // Claws
  dragonCtx.fillStyle = '#2F2F2F';
  dragonCtx.shadowBlur = 0;
  dragonCtx.fillRect(centerX - 22, centerY + 28, 2, 4);
  dragonCtx.fillRect(centerX - 7, centerY + 28, 2, 4);
  dragonCtx.fillRect(centerX + 8, centerY + 28, 2, 4);
  dragonCtx.fillRect(centerX + 23, centerY + 28, 2, 4);

  // Breath effect (occasional)
  if (Math.sin(dragonTime * 0.5) > 0.8) {
    const breathGradient = dragonCtx.createLinearGradient(centerX + 45, centerY - 8, centerX + 80, centerY - 8);
    breathGradient.addColorStop(0, '#FF4500');
    breathGradient.addColorStop(0.5, '#FF6347');
    breathGradient.addColorStop(1, 'rgba(255, 99, 71, 0)');

    dragonCtx.fillStyle = breathGradient;
    dragonCtx.shadowColor = '#FF4500';
    dragonCtx.shadowBlur = 15;
    dragonCtx.beginPath();
    dragonCtx.ellipse(centerX + 65, centerY - 8, 25, 8, 0, 0, Math.PI * 2);
    dragonCtx.fill();
  }

  // Reset shadow
  dragonCtx.shadowBlur = 0;
}