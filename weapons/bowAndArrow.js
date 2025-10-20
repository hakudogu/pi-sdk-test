import { showLootDisplay } from "../LootDisplay.js";
import { createHitParticles } from "../particlesAnimation.js";

export function startBowAndArrowGame(getCurrentCreature) {
    // Create bow canvas
  const bowCanvas = document.createElement('canvas');
  bowCanvas.width = 80;
  bowCanvas.height = 100;
  bowCanvas.style.width = '80px';
  bowCanvas.style.height = '100px';
  bow.appendChild(bowCanvas);
  
  const bowCtx = bowCanvas.getContext('2d');
  
  // 3D Bow state
  let bowStringPull = 0; // 0 = no pull, 1 = max pull
  let isPulling = false;
  
  // Draw 3D bow with animated string
  function drawBow() {
    bowCtx.clearRect(0, 0, 80, 100);
    
    // Calculate string pull effect
    const stringPullAmount = bowStringPull * 15; // Max 15px pull
    
    // Bow limbs with 3D effect
    // Left limb (with gradient for 3D)
    const leftGradient = bowCtx.createLinearGradient(8, 35, 15, 85);
    leftGradient.addColorStop(0, '#4A4A4A');
    leftGradient.addColorStop(0.5, '#2C2C2C');
    leftGradient.addColorStop(1, '#1A1A1A');
    
    bowCtx.strokeStyle = leftGradient;
    bowCtx.lineWidth = 8;
    bowCtx.lineCap = 'round';
    bowCtx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    bowCtx.shadowBlur = 3;
    bowCtx.shadowOffsetY = 2;
    
    bowCtx.beginPath();
    bowCtx.moveTo(15, 85);
    bowCtx.quadraticCurveTo(8, 60, 15, 35);
    bowCtx.stroke();
    
    // Right limb (with gradient for 3D)
    const rightGradient = bowCtx.createLinearGradient(65, 35, 72, 85);
    rightGradient.addColorStop(0, '#4A4A4A');
    rightGradient.addColorStop(0.5, '#2C2C2C');
    rightGradient.addColorStop(1, '#1A1A1A');
    
    bowCtx.strokeStyle = rightGradient;
    bowCtx.beginPath();
    bowCtx.moveTo(65, 85);
    bowCtx.quadraticCurveTo(72, 60, 65, 35);
    bowCtx.stroke();
    
    // Reset shadow
    bowCtx.shadowBlur = 0;
    
    // 3D Bow grip with depth
    const gripGradient = bowCtx.createLinearGradient(35, 65, 45, 90);
    gripGradient.addColorStop(0, '#2A2A2A');
    gripGradient.addColorStop(0.5, '#1A1A1A');
    gripGradient.addColorStop(1, '#0F0F0F');
    
    bowCtx.fillStyle = gripGradient;
    bowCtx.fillRect(35, 65, 10, 25);
    
    // Grip texture
    bowCtx.fillStyle = '#333333';
    for (let i = 0; i < 3; i++) {
      bowCtx.fillRect(36, 67 + i * 6, 8, 2);
    }
    
    // 3D Bowstring with pull animation
    bowCtx.strokeStyle = '#E0E0E0';
    bowCtx.lineWidth = 3;
    bowCtx.shadowColor = 'rgba(255, 255, 255, 0.2)';
    bowCtx.shadowBlur = 2;
    
    // String curves when pulled (realistic bow physics)
    if (stringPullAmount > 0) {
      const centerX = 40;
      const centerY = 35 + stringPullAmount;
      
      bowCtx.beginPath();
      bowCtx.moveTo(15, 35);
      bowCtx.quadraticCurveTo(centerX, centerY, 65, 35);
      bowCtx.stroke();
      
      // Draw arrow nocked on string
      if (isPulling) {
        bowCtx.strokeStyle = '#8B4513';
        bowCtx.lineWidth = 2;
        bowCtx.beginPath();
        bowCtx.moveTo(centerX, centerY - 5);
        bowCtx.lineTo(centerX + 20, centerY - 5);
        bowCtx.stroke();
        
        // Arrowhead
        bowCtx.fillStyle = '#C0C0C0';
        bowCtx.beginPath();
        bowCtx.moveTo(centerX + 20, centerY - 5);
        bowCtx.lineTo(centerX + 25, centerY - 7);
        bowCtx.lineTo(centerX + 25, centerY - 3);
        bowCtx.closePath();
        bowCtx.fill();
      }
    } else {
      // Normal string position
      bowCtx.beginPath();
      bowCtx.moveTo(15, 35);
      bowCtx.lineTo(65, 35);
      bowCtx.stroke();
    }
    
    // Reset shadow
    bowCtx.shadowBlur = 0;
    
    // Enhanced attachment points with 3D effect
    const goldGradient = bowCtx.createRadialGradient(15, 35, 0, 15, 35, 4);
    goldGradient.addColorStop(0, '#FFD700');
    goldGradient.addColorStop(0.7, '#FFA500');
    goldGradient.addColorStop(1, '#B8860B');
    
    bowCtx.fillStyle = goldGradient;
    bowCtx.beginPath();
    bowCtx.arc(15, 35, 4, 0, Math.PI * 2);
    bowCtx.fill();
    
    bowCtx.beginPath();
    bowCtx.arc(65, 35, 4, 0, Math.PI * 2);
    bowCtx.fill();
    
    // Modern tech details with glow
    bowCtx.fillStyle = '#00FF88';
    bowCtx.shadowColor = '#00FF88';
    bowCtx.shadowBlur = 5;
    bowCtx.fillRect(32, 45, 16, 3);
    
    bowCtx.fillStyle = '#0088FF';
    bowCtx.shadowColor = '#0088FF';
    bowCtx.fillRect(34, 50, 12, 2);
    
    // Enhanced sight with 3D effect
    const sightGradient = bowCtx.createLinearGradient(38, 55, 42, 63);
    sightGradient.addColorStop(0, '#FF6666');
    sightGradient.addColorStop(0.5, '#FF4444');
    sightGradient.addColorStop(1, '#CC2222');
    
    bowCtx.fillStyle = sightGradient;
    bowCtx.shadowColor = '#FF4444';
    bowCtx.shadowBlur = 8;
    bowCtx.fillRect(38, 55, 4, 8);
    
    bowCtx.fillStyle = '#FFAAAA';
    bowCtx.shadowBlur = 3;
    bowCtx.fillRect(39, 56, 2, 6);
    
    // Reset shadow
    bowCtx.shadowBlur = 0;
  }
  
  drawBow();
  
  // Create canvas for arrows
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '5';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Game state
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let arrows = [];
  let particles = [];
  let score = 0;
  
  // Add these variables to track total bosons and leptons
  let totalBosons = 0;
  let totalLeptons = 0;
  
  // Mouse/touch events for dragging
  function handleStart(e) {
    isDragging = true;
    isPulling = true;
    const rect = bowCanvas.getBoundingClientRect();
    dragStartX = rect.left + rect.width / 2;
    dragStartY = rect.top + rect.height / 2;
    bow.style.cursor = 'grabbing';
    bow.style.transform = 'translateX(-50%) perspective(300px) rotateX(15deg) scale(1.05)';
  }
  
  function handleMove(e) {
    if (!isDragging) return;
    
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    // Move bow with mouse/touch
    bow.style.left = clientX + 'px';
    bow.style.transform = 'translateX(-50%) perspective(300px) rotateX(15deg) scale(1.05)';
    
    // Calculate string pull amount
    const dx = clientX - dragStartX;
    const dy = clientY - dragStartY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    bowStringPull = Math.min(distance / 50, 1); // Max pull at 50px distance
    
    // Redraw bow with new string pull
    drawBow();
  }
  
  function handleEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    isPulling = false;
    bow.style.cursor = 'grab';
    bow.style.transform = 'translateX(-50%) perspective(300px) rotateX(15deg)';
    
    // Shoot arrow
    const clientX = e.clientX || e.changedTouches[0].clientX;
    const clientY = e.clientY || e.changedTouches[0].clientY;
    
    const dx = clientX - dragStartX;
    const dy = clientY - dragStartY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 10) { // Only shoot if dragged far enough
      const speed = Math.min(distance / 8, 20); // Pull distance affects speed
      
      // Correct physics: arrow shoots in OPPOSITE direction of pull
      const velX = -(dx / distance) * speed;
      const velY = -(dy / distance) * speed;
      
      arrows.push({
        x: dragStartX,
        y: dragStartY,
        velX: velX,
        velY: velY,
        life: 180
      });
    }
    
    // Reset bow position and string
    bow.style.left = '50%';
    bowStringPull = 0;
    drawBow();
  }
  
  // Add event listeners
  bow.addEventListener('mousedown', handleStart);
  bow.addEventListener('mousemove', handleMove);
  bow.addEventListener('mouseup', handleEnd);
  bow.addEventListener('mouseleave', handleEnd);
  
  // Touch events
  bow.addEventListener('touchstart', handleStart);
  bow.addEventListener('touchmove', handleMove);
  bow.addEventListener('touchend', handleEnd);
  
  // Make bow draggable
  bow.style.cursor = 'grab';
  bow.style.position = 'fixed';
  bow.style.bottom = '20px';
  bow.style.left = '50%';
  bow.style.transform = 'translateX(-50%)';
  bow.style.userSelect = 'none';
  
  // Arrow physics and rendering
  function updateArrows() {
    for (let i = arrows.length - 1; i >= 0; i--) {
      const arrow = arrows[i];
      
      // Update position
      arrow.x += arrow.velX;
      arrow.y += arrow.velY;
      
      // Apply gravity
      arrow.velY += 0.22;
      
      // Check collision between arrow and dragon
      function checkDragonCollision(arrow) {
        // Get dragon's position (center of screen)
        const dragonCenterX = window.innerWidth / 2;
        const dragonCenterY = window.innerHeight / 2;
        
        // Dragon collision box (adjust these values to match dragon size)
        const dragonWidth = 120;
        const dragonHeight = 100;
        
        // Check if arrow is within dragon's collision box
        const arrowX = arrow.x;
        const arrowY = arrow.y;
        
        const dragonLeft = dragonCenterX - dragonWidth / 2;
        const dragonRight = dragonCenterX + dragonWidth / 2;
        const dragonTop = dragonCenterY - dragonHeight / 2;
        const dragonBottom = dragonCenterY + dragonHeight / 2;
        
        return arrowX >= dragonLeft && arrowX <= dragonRight && 
               arrowY >= dragonTop && arrowY <= dragonBottom;
      }
      // Check collision with dragon
      if (checkDragonCollision(arrow)) {
        // Hit creature - add its points, create particles, and remove arrow
        score += getCurrentCreature().points;

        // Boson drop
        if (getCurrentCreature().bosons && Math.random() < getCurrentCreature().bosons) {
          const bosonAmount = (0.25 + Math.random() * 0.25) * getCurrentCreature().points;
          totalBosons += bosonAmount;
          // Optionally, show a floating text or effect for boson drop
        }
        // Lepton drop
        if (getCurrentCreature().leptons && Math.random() < getCurrentCreature().leptons) {
          const leptonAmount = (0.25 + Math.random() * 0.25) * getCurrentCreature().points;
          totalLeptons += leptonAmount;
          // Optionally, show a floating text or effect for lepton drop
        }

        
        createHitParticles(arrow.x,arrow.y); // Placeholder for particle effect at hit location);
        // updateScoreDisplay();
        showLootDisplay({ essence: getCurrentCreature().points, bosons: getCurrentCreature().bosons ? (0.25 + Math.random() * 0.25) * getCurrentCreature().points : 0, leptons: getCurrentCreature().leptons ? (0.25 + Math.random() * 0.25) * getCurrentCreature().points : 0 });
        
        arrows.splice(i, 1);
        continue;
      }
      
      // Remove arrow if off screen or expired
      if (arrow.x < 0 || arrow.x > canvas.width || 
          arrow.y > canvas.height || arrow.life <= 0) {
        arrows.splice(i, 1);
      } else {
        arrow.life--;
      }
    }
  }
  
  // // Create hit particle effects
  // function createHitParticles(x, y) {
  //   const particleCount = 15;
  //   const colors = ['#FFD700', '#FF6347', '#FF4500', '#FF1493', '#00FFFF', '#FF69B4'];
    
  //   for (let i = 0; i < particleCount; i++) {
  //     const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
  //     const speed = 2 + Math.random() * 4;
  //     const size = 3 + Math.random() * 5;
  //     const color = colors[Math.floor(Math.random() * colors.length)];
      
  //     particles.push({
  //       x: x,
  //       y: y,
  //       velX: Math.cos(angle) * speed,
  //       velY: Math.sin(angle) * speed,
  //       size: size,
  //       color: color,
  //       life: 60 + Math.random() * 40,
  //       maxLife: 60 + Math.random() * 40,
  //       alpha: 1,
  //       glow: true
  //     });
  //   }
  // }
  
  // // Update particles
  // function updateParticles() {
  //   for (let i = particles.length - 1; i >= 0; i--) {
  //     const particle = particles[i];
      
  //     // Update position
  //     particle.x += particle.velX;
  //     particle.y += particle.velY;
      
  //     // Apply gravity and friction
  //     particle.velY += 0.1;
  //     particle.velX *= 0.98;
  //     particle.velY *= 0.98;
      
  //     // Update life and alpha
  //     particle.life--;
  //     particle.alpha = particle.life / particle.maxLife;
      
  //     // Remove dead particles
  //     if (particle.life <= 0 || particle.alpha <= 0) {
  //       particles.splice(i, 1);
  //     }
  //   }
  // }
  
  // // Draw particles
  // function drawParticles() {
  //   for (let particle of particles) {
  //     ctx.save();
  //     ctx.globalAlpha = particle.alpha;
      
  //     // Create glowing effect
  //     if (particle.glow) {
  //       ctx.shadowColor = particle.color;
  //       ctx.shadowBlur = 15;
  //     }
      
  //     // Draw particle
  //     ctx.fillStyle = particle.color;
  //     ctx.beginPath();
  //     ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  //     ctx.fill();
      
  //     // Add inner glow
  //     ctx.shadowBlur = 0;
  //     ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  //     ctx.beginPath();
  //     ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
  //     ctx.fill();
      
  //     ctx.restore();
  //   }
  // }
  
 

  // Update score display to show essence only
  function updateScoreDisplay() {
    let scoreElement = document.getElementById('scoreDisplay');
    if (!scoreElement) {
      scoreElement = document.createElement('div');
      scoreElement.id = 'scoreDisplay';
      scoreElement.style.position = 'fixed';
      scoreElement.style.top = '20px';
      scoreElement.style.left = '20px';
      scoreElement.style.color = 'white';
      scoreElement.style.fontSize = '24px';
      scoreElement.style.fontWeight = 'bold';
      scoreElement.style.fontFamily = 'Arial, sans-serif';
      scoreElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
      scoreElement.style.zIndex = '20';
      document.body.appendChild(scoreElement);
    }
    scoreElement.textContent = `Essence: ${score}`;
  
  }
  

  // Example usage (call this whenever the creature changes):
  // updateCreatureStatsPanel(getCCurrentCreature);
  
  function drawArrows() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles first (behind arrows)
    // drawParticles();
    
    for (let arrow of arrows) {
      // Calculate arrow direction and position
      const angle = Math.atan2(arrow.velY, arrow.velX);
      const arrowLength = 35;
      const shaftWidth = 3;
      
      // Save context for rotation
      ctx.save();
      ctx.translate(arrow.x, arrow.y);
      ctx.rotate(angle);
      
      // Draw arrow shaft (brown wood)
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-arrowLength, -shaftWidth/2, arrowLength, shaftWidth);
      
      // Draw fletching (feathers at the back)
      ctx.fillStyle = '#b11254ff';
      ctx.beginPath();
      ctx.moveTo(-arrowLength, -shaftWidth/2);
      ctx.lineTo(-arrowLength - 8, -shaftWidth/2 - 4);
      ctx.lineTo(-arrowLength - 8, -shaftWidth/2 + 2);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = '#f309e7ff';
      ctx.beginPath();
      ctx.moveTo(-arrowLength, shaftWidth/2);
      ctx.lineTo(-arrowLength - 8, shaftWidth/2 + 4);
      ctx.lineTo(-arrowLength - 8, shaftWidth/2 - 2);
      ctx.closePath();
      ctx.fill();
      
      // Draw arrowhead (metal tip)
      ctx.fillStyle = '#fffb00ff';
      ctx.strokeStyle = '#fbff03ff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(4, 4);
      ctx.lineTo(4, -4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Add some shine to the arrowhead
      ctx.fillStyle = '#E0E0E0';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(6, -2);
      ctx.lineTo(6, 2);
      ctx.closePath();
      ctx.fill();
      
      // Restore context
      ctx.restore();
    }
  }
  
  // Game loop
  function gameLoop() {
    updateArrows();
    // updateParticles();
    drawArrows();
    requestAnimationFrame(gameLoop);
    updateScoreDisplay();
//    showLootDisplay({ essence: score, bosons: totalBosons, leptons: totalLeptons });
  }
  
  // Initialize score display
  
  
  gameLoop();
}