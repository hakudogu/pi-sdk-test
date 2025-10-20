import { drawCosmicPot } from './cosmicPot.js';
import { pots } from './pots.js';
import { setupGalaxyBackground } from './Realms/galaxyBG.js';

document.addEventListener('DOMContentLoaded', function () {

  // --- Rest of your landing page code ---
  // ... (title, canvas, pot health, loot button, etc.)
  // (Keep your existing code for those parts)
  
  
  setupGalaxyBackground();
// Create and style the title
const title = document.createElement('h1');
title.textContent = ' The Cosmic Pot ';
title.style.textAlign = 'center';
title.style.marginTop = '38px';
title.style.marginBottom = '0';
title.style.fontSize = '2rem';
title.style.fontFamily = "'Orbitron', 'Segoe UI', Arial, sans-serif";
title.style.letterSpacing = '0.12em';
title.style.background = 'linear-gradient(90deg, #ffe066 10%, #f1fa8c 40%, #8be9fd 70%, #bd93f9 100%)';
title.style.webkitBackgroundClip = 'text';
title.style.webkitTextFillColor = 'transparent';
title.style.backgroundClip = 'text';
title.style.color = '#ffe066';
title.style.textShadow = '0 2px 16px #fff7, 0 0px 32px #ffe06688, 0 0px 8px #8be9fd55';
title.style.fontWeight = '900';
title.style.userSelect = 'none';
title.style.cursor = 'pointer';
title.title = "Welcome to the Cosmic Pot!";
title.style.transition = 'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55), text-shadow 0.3s';

// Add a fun hover effect
title.addEventListener('mouseenter', () => {
  title.style.transform = 'scale(1.04) rotate(-2deg)';
  title.style.textShadow = '0 4px 32px #fff, 0 0px 48px #ffe066cc, 0 0px 16px #8be9fd99';
});
title.addEventListener('mouseleave', () => {
  title.style.transform = '';
  title.style.textShadow = '0 2px 16px #fff7, 0 0px 32px #ffe06688, 0 0px 8px #8be9fd55';
});

document.body.appendChild(title);

// Animate the title with a gentle floating and shimmering effect
let titleAnimTime = 0;
function animateTitle() {
  titleAnimTime += 0.03;
  // Floating up and down
  title.style.transform = `translateY(${Math.sin(titleAnimTime) * 0}px) scale(1.04)`;
  // Animate the gradient background position for shimmer
  // title.style.background = `linear-gradient(90deg, #ffe066 10%, #f1fa8c 40%, #8be9fd 70%, #bd93f9 100%)`;
  title.style.backgroundSize = '200% 200%';
  title.style.backgroundPosition = `${50 + Math.sin(titleAnimTime * 1.2) * 40}% 50%`;
  requestAnimationFrame(animateTitle);
}
animateTitle();

// Create and style the canvas
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.style.display = 'block';
canvas.style.margin = '60px auto 0 auto';
canvas.style.background = '#181825';
canvas.style.borderRadius = '24px';
canvas.style.boxShadow = '0 8px 32px #0008';

document.body.style.background = '#181825';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Animate the cosmic pot
function animatePot() {
  drawCosmicPot(ctx);
  requestAnimationFrame(animatePot);
}

function displayRandomPotHealth() {
  // Pick a random pot from the pots array
  const pot = pots[Math.floor(Math.random() * pots.length)];
  
  // Create or update the health display panel
  let potHealthPanel = document.getElementById('potHealthPanel');
  if (!potHealthPanel) {
    potHealthPanel = document.createElement('div');
    potHealthPanel.id = 'potHealthPanel';
    potHealthPanel.style.position = 'fixed';
    potHealthPanel.style.top = '350px';
    potHealthPanel.style.left = '50%';
    potHealthPanel.style.transform = 'translateX(-50%)';
    potHealthPanel.style.background = 'rgba(24,24,37,0.85)';
    potHealthPanel.style.color = '#fff';
    potHealthPanel.style.fontSize = '18px';
    potHealthPanel.style.fontFamily = 'Arial, sans-serif';
    potHealthPanel.style.padding = '8px 28px';
    potHealthPanel.style.borderRadius = '0 0 14px 14px';
    potHealthPanel.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)';
    potHealthPanel.style.zIndex = '30';
    document.body.appendChild(potHealthPanel);
  }
  potHealthPanel.textContent = `0/${pot.essenceRequired.toLocaleString()}`;
}

// Example usage: call this to display a random pot's health points
displayRandomPotHealth();
animatePot();

// Create Loot Essence button
const button = document.createElement('button');
button.textContent = 'Loot Essence';
button.style.display = 'block';
button.style.margin = '40px auto 0 auto';
button.style.padding = '16px 36px';
button.style.fontSize = '1.3rem';
button.style.background = 'linear-gradient(90deg, #8be9fd 0%, #bd93f9 100%)';
button.style.color = '#181825';
button.style.border = 'none';
button.style.borderRadius = '12px';
button.style.cursor = 'pointer';
button.style.boxShadow = '0 4px 16px #0004';
button.style.fontWeight = 'bold';
button.style.letterSpacing = '1px';
button.style.transition = 'transform 0.15s, box-shadow 0.15s';

button.addEventListener('mouseenter', () => {
  button.style.transform = 'scale(1.07)';
  button.style.boxShadow = '0 8px 32px #8be9fd77, 0 2px 24px #bd93f9aa';
});
button.addEventListener('mouseleave', () => {
  button.style.transform = '';
  button.style.boxShadow = '0 4px 16px #0004';
});

button.addEventListener('click', () => {
  // Redirect to the main game page (script.js should be loaded there)
  window.location.href = 'game.html'; // Change to your main game HTML file if different
});

document.body.appendChild(button);


});