let cyclopsTime = 0;

// cyclops metadata
export const cyclops= {
  name: 'cyclops',
  rarity: 100,
  draw: drawCyclops,
  points: 100000/100,
  bosons: 0.75 ,
  leptons: 0.50
};

function drawCyclops(ctx) {
  cyclopsTime += 0.04;
  ctx.clearRect(0, 0, 200, 200);

  const centerX = 100;
  const centerY = 110 + Math.sin(cyclopsTime) * 2;

  // Body
  const bodyGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 60);
  bodyGradient.addColorStop(0, '#b0a16b');
  bodyGradient.addColorStop(0.5, '#8d7b4a');
  bodyGradient.addColorStop(1, '#5a4a1a');
  ctx.fillStyle = bodyGradient;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, 45, 60, 0, 0, Math.PI * 2);
  ctx.fill();

  // Belly
  ctx.fillStyle = '#e2d7b5';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 25, 25, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Arms
  ctx.strokeStyle = '#8d7b4a';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(centerX - 40, centerY + 10);
  ctx.quadraticCurveTo(centerX - 70, centerY + 50, centerX - 30, centerY + 70);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX + 40, centerY + 10);
  ctx.quadraticCurveTo(centerX + 70, centerY + 50, centerX + 30, centerY + 70);
  ctx.stroke();

  // Legs
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(centerX - 18, centerY + 60);
  ctx.lineTo(centerX - 18, centerY + 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX + 18, centerY + 60);
  ctx.lineTo(centerX + 18, centerY + 100);
  ctx.stroke();

  // Feet
  ctx.fillStyle = '#5a4a1a';
  ctx.beginPath();
  ctx.ellipse(centerX - 18, centerY + 108, 12, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(centerX + 18, centerY + 108, 12, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = '#b0a16b';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY - 50, 38, 38, 0, 0, Math.PI * 2);
  ctx.fill();

  // Jaw
  ctx.fillStyle = '#8d7b4a';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY - 22, 22, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // One big eye
  const eyeY = centerY - 60 + Math.sin(cyclopsTime * 2) * 2;
  ctx.save();
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.ellipse(centerX, eyeY, 16, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Iris
  ctx.fillStyle = '#4a7bb0';
  ctx.beginPath();
  ctx.arc(centerX, eyeY, 7, 0, Math.PI * 2);
  ctx.fill();

  // Pupil (moves a bit)
  const pupilOffsetX = Math.sin(cyclopsTime * 1.5) * 2;
  const pupilOffsetY = Math.cos(cyclopsTime * 1.2) * 2;
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(centerX + pupilOffsetX, eyeY + pupilOffsetY, 3, 0, Math.PI * 2);
  ctx.fill();

  // Eyelid (blinks)
  if (Math.abs(Math.sin(cyclopsTime * 0.7)) > 0.92) {
    ctx.fillStyle = '#b0a16b';
    ctx.beginPath();
    ctx.ellipse(centerX, eyeY, 16, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Eyebrow
  ctx.strokeStyle = '#5a4a1a';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(centerX, eyeY - 13, 14, Math.PI * 0.15, Math.PI * 0.85, false);
  ctx.stroke();

  // Mouth (smile or frown)
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3;
  ctx.beginPath();
  const mouthSmile = Math.sin(cyclopsTime) * 6;
  ctx.arc(centerX, centerY - 15, 10, Math.PI * 0.15 + mouthSmile * 0.01, Math.PI * 0.85 - mouthSmile * 0.01, false);
  ctx.stroke();

  // Teeth
  ctx.fillStyle = '#fff';
  ctx.fillRect(centerX - 5, centerY - 7, 3, 6);
  ctx.fillRect(centerX + 2, centerY - 7, 3, 6);
}