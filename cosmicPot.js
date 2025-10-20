let cosmicPotTime = 1;

export function drawCosmicPot(ctx) {
  cosmicPotTime += 0.02;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2 + 40;
  const potWidth = 180;
  const potHeight = 120;
  const rimHeight = 30;

  // Pot shadow
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + potHeight / 2 + 18, potWidth * 0.6, 18, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#22223a";
  ctx.fill();
  ctx.restore();

  // Pot body (galaxy gradient)
  const potGradient = ctx.createLinearGradient(centerX, centerY - potHeight / 2, centerX, centerY + potHeight / 2);
  potGradient.addColorStop(0, "#3a1c71");
  potGradient.addColorStop(0.3, "#5f2c82");
  potGradient.addColorStop(0.7, "#6a3093");
  potGradient.addColorStop(1, "#22223a");

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, potWidth / 2, potHeight / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = potGradient;
  ctx.shadowColor = "#8be9fd";
  ctx.shadowBlur = 24;
  ctx.fill();
  ctx.restore();

  // Pot rim (top ellipse)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(centerX, centerY - potHeight / 2 + rimHeight / 2, potWidth * 0.95 / 2, rimHeight / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#f8f8f2";
  ctx.globalAlpha = 0.18 + 0.08 * Math.sin(cosmicPotTime * 2); // shimmer
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(centerX, centerY - potHeight / 2 + rimHeight / 2, potWidth * 0.95 / 2, rimHeight / 2, 0, 0, Math.PI * 2);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#8be9fd";
  ctx.globalAlpha = 0.5 + 0.2 * Math.sin(cosmicPotTime * 2); // shimmer
  ctx.stroke();
  ctx.restore();

  // Pot opening (dark inner ellipse)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(centerX, centerY - potHeight / 2 + rimHeight / 2, potWidth * 0.8 / 2, rimHeight * 0.7 / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#22223a";
  ctx.globalAlpha = 0.85;
  ctx.fill();
  ctx.restore();

  // Animated rotating essence orbs
  const orbColors = ["#8be9fd", "#f1fa8c", "#bd93f9", "#ff79c6"];
  for (let i = 0; i < 4; i++) {
    const angle = cosmicPotTime + (i * Math.PI / 2);
    const r = 38 + 6 * Math.sin(cosmicPotTime * 1.5 + i);
    const x = centerX + Math.cos(angle) * r;
    const y = centerY - potHeight / 2 + rimHeight / 2 + Math.sin(angle) * (rimHeight * 0.35);
    ctx.save();
    ctx.globalAlpha = 0.7 + 0.3 * Math.sin(cosmicPotTime * 2 + i);
    ctx.beginPath();
    ctx.arc(x, y, 8 + 2 * Math.sin(cosmicPotTime * 2 + i), 0, Math.PI * 2);
    ctx.fillStyle = orbColors[i];
    ctx.shadowColor = orbColors[i];
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();
  }

  // Galaxy hints: stars and nebula swirls (twinkle)
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    const r = potWidth * 0.35 + Math.random() * 30;
    const x = centerX + Math.cos(angle) * r * 0.5 + (Math.random() - 0.5) * 10;
    const y = centerY + Math.sin(angle) * r * 0.3 + (Math.random() - 0.5) * 10;
    ctx.save();
    ctx.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(cosmicPotTime * 2 + i));
    ctx.beginPath();
    ctx.arc(x, y, 2 + Math.abs(Math.sin(cosmicPotTime + i)) * 2, 0, Math.PI * 2);
    ctx.fillStyle = ["#fff", "#8be9fd", "#f1fa8c", "#bd93f9", "#ff79c6"][i % 5];
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  // Nebula swirl (slight shimmer)
  ctx.save();
  ctx.globalAlpha = 0.18 + 0.06 * Math.sin(cosmicPotTime * 1.5);
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 10, potWidth * 0.3, potHeight * 0.18, Math.PI / 6, 0, Math.PI * 2);
  ctx.fillStyle = "#8be9fd";
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.13 + 0.05 * Math.cos(cosmicPotTime * 1.2);
  ctx.beginPath();
  ctx.ellipse(centerX - 30, centerY + 20, potWidth * 0.18, potHeight * 0.09, -Math.PI / 8, 0, Math.PI * 2);
  ctx.fillStyle = "#bd93f9";
  ctx.fill();
  ctx.restore();
}

// Animation loop for the cosmic pot
export function animateCosmicPot(ctx) {
  function loop() {
    drawCosmicPot(ctx);
    requestAnimationFrame(loop);
  }
  loop();
}