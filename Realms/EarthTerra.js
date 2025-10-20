/**
 * Draws a magical infinite grassland background with glowing orbs and lush greenery.
 * The grassland and hills gently move to create a dynamic, living scene.
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
 * @param {number} width - Canvas width.
 * @param {number} height - Canvas height.
 * @param {number} [time=0] - Animation time in milliseconds.
 */
export function setupEarthTerraBackground(ctx, width, height, time = 0) {
  // --- Sky gradient ---
  const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
  skyGradient.addColorStop(0, '#b6eaff');
  skyGradient.addColorStop(0.5, '#e0f7fa');
  skyGradient.addColorStop(1, '#c6f7d4');
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, height);

  // --- Sun (soft, magical) ---
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.18, 70, 0, 2 * Math.PI);
  ctx.fillStyle = '#fffde4';
  ctx.shadowColor = '#fffde4';
  ctx.shadowBlur = 80;
  ctx.fill();
  ctx.restore();

  // --- Glowing orbs (magical fireflies) ---
  const orbCount = Math.floor(width / 60);
  for (let i = 0; i < orbCount; i++) {
    const orbX = (i / orbCount) * width + Math.sin(i + time / 3000) * 40;
    const orbY = height * 0.25 + Math.sin(i * 2 + time / 1700) * 60 + Math.sin(i + time / 4000) * 10;
    const orbRadius = 7 + Math.sin(i * 1.7 + time / 1200) * 2;
    ctx.save();
    ctx.globalAlpha = 0.18 + Math.abs(Math.sin(time / 1200 + i)) * 0.25;
    ctx.beginPath();
    ctx.arc(orbX, orbY, orbRadius, 0, 2 * Math.PI);
    ctx.fillStyle = ['#baffff', '#fff7b2', '#b2ffb9', '#e0b2ff', '#ffe6b2'][i % 5];
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 24 + Math.random() * 10;
    ctx.fill();
    ctx.restore();
  }

  // --- Soft clouds, drifting horizontally ---
  function drawCloud(x, y, scale = 1, offset = 0) {
    ctx.save();
    ctx.globalAlpha = 0.28;
    ctx.beginPath();
    ctx.arc(x + offset, y, 30 * scale, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(x + 40 * scale + offset, y - 20 * scale, 40 * scale, Math.PI * 1, Math.PI * 1.85);
    ctx.arc(x + 80 * scale + offset, y, 30 * scale, Math.PI * 1.5, Math.PI * 0.5);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();
  }
  const cloudOffset = (time / 40000) * width;
  drawCloud(width * 0.18, height * 0.13, 0.7, cloudOffset % width);
  drawCloud(width * 0.5, height * 0.09, 1.1, (cloudOffset * 0.7) % width);
  drawCloud(width * 0.7, height * 0.16, 0.6, (cloudOffset * 1.3) % width);

  // --- Rolling lush hills (parallax, gently moving horizontally) ---
  function drawHill(yBase, amplitude, freq, color, speedFactor, moveSpeed = 0.08) {
    ctx.save();
    ctx.beginPath();
    // Add a horizontal phase shift for slow left-right movement
    const xPhase = (time / 10000) * moveSpeed * width;
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= width; x += 2) {
      const phase = (time / 9000) * speedFactor;
      // The xPhase shifts the hills horizontally over time
      const y = yBase - Math.sin(((x + xPhase) / width) * Math.PI * freq + phase) * amplitude;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18 * speedFactor;
    ctx.fill();
    ctx.restore();
  }
  // Distant hills
  drawHill(height * 0.7, 18, 2.5, '#b6e3a1', 0.4, 0.04);
  // Mid hills
  drawHill(height * 0.78, 28, 3.5, '#8fd47e', 0.7, 0.07);
  // Foreground hill
  drawHill(height * 0.88, 38, 4.5, '#5ebd4b', 1, 0.12);

  // --- Foreground grass blades (gently swaying and shifting) ---
  function drawGrassBlade(x, y, heightBlade, sway, color, bladeIndex) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Add a small horizontal shift to the base for a "wind" effect
    const baseShift = Math.sin(time / 3000 + bladeIndex * 0.5) * 2;
    const cp1x = x + sway * 0.3 + baseShift;
    const cp1y = y - heightBlade * 0.4;
    const cp2x = x + sway + baseShift;
    const cp2y = y - heightBlade * 0.8;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x + sway + baseShift, y - heightBlade);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.1;
    ctx.shadowColor = color;
    ctx.shadowBlur = 4;
    ctx.stroke();
    ctx.restore();
  }
  const bladeCount = Math.floor(width / 8);
  for (let i = 0; i < bladeCount; i++) {
    // Add a slow horizontal drift to the base of the grass
    const x = (i / bladeCount) * width + Math.sin(time / 5000 + i * 0.2) * 2;
    const y = height * 0.97 + Math.sin(i + time / 1200) * 2;
    const bladeHeight = 32 + Math.sin(i * 1.7 + time / 900) * 8;
    const sway = Math.sin(time / 800 + i) * 6;
    drawGrassBlade(x, y, bladeHeight, sway, '#3a8d2b', i);
    if (i % 3 === 0) {
      drawGrassBlade(x + 2, y, bladeHeight * 0.85, sway * 0.7, '#7ed957', i + 1000);
    }
  }

  // --- Wildflowers (subtle, scattered, gently moving) ---
  for (let i = 0; i < Math.floor(width / 30); i++) {
    const x = Math.floor((i / (width / 30)) * width + Math.sin(i + time / 2000) * 10 + Math.sin(time / 4000 + i) * 2);
    const y = height * 0.96 + Math.sin(i * 2 + time / 1500) * 3;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = ['#fff7b2', '#ffb2ef', '#b2eaff', '#ffe6b2', '#b2ffb9'][i % 5];
    ctx.globalAlpha = 0.7;
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
}