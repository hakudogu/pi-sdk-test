export function showLootDisplay({ essence = 0, bosons = 0, leptons = 0 }) {
  // Remove any existing loot display
  let lootPanel = document.getElementById('lootDisplayPanel');
  if (lootPanel) lootPanel.remove();

  lootPanel = document.createElement('div');
  lootPanel.id = 'lootDisplayPanel';
  lootPanel.style.position = 'fixed';
  lootPanel.style.top = '30%';
  lootPanel.style.left = '50%';
  lootPanel.style.transform = 'translate(-50%, -50%)';
  lootPanel.style.background = 'rgba(24,24,37,0.92)';
  lootPanel.style.color = '#fff';
  lootPanel.style.fontSize = '1.3rem';
  lootPanel.style.fontFamily = "'Orbitron', Arial, sans-serif";
  lootPanel.style.padding = '22px 44px';
  lootPanel.style.borderRadius = '18px';
  lootPanel.style.boxShadow = '0 4px 24px #8be9fd55, 0 2px 12px #bd93f9aa';
  lootPanel.style.zIndex = '9999';
  lootPanel.style.textAlign = 'center';
  lootPanel.style.pointerEvents = 'none';
  lootPanel.style.opacity = '0';
  lootPanel.style.transition = 'opacity 0.3s';

   // SVG icons (unique shapes)
  // Essence: teardrop
  const essenceIcon = `<svg width="28" height="28" viewBox="0 0 28 28" style="vertical-align:middle;margin-right:6px;" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="essenceOrbGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="60%" stop-color="#b388ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <circle cx="14" cy="14" r="11" fill="url(#essenceOrbGradient)" stroke="#fff" stroke-width="2"/>
  <ellipse cx="10" cy="10" rx="4" ry="2" fill="#fff" opacity="0.7"/>
  <ellipse cx="18" cy="17" rx="2" ry="1" fill="#fff" opacity="0.4"/>
  <path d="M8 7 Q14 2 20 7" stroke="#fff" stroke-width="1.2" opacity="0.18" fill="none"/>
</svg>`;
  // Boson: hexagon
  const bosonIcon = `<svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:6px;" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="11,3 19,8 19,16 11,21 3,16 3,8" fill="#8be9fd" stroke="#fff" stroke-width="2"/>
    <polygon points="11,7 16,10 16,14 11,17 6,14 6,10" fill="#fff" opacity="0.5"/>
  </svg>`;
  // Lepton: diamond
  const leptonIcon = `<svg width="30" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:6px;" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="11,2 20,11 11,20 2,11" fill="#bd93f9" stroke="#fff" stroke-width="2"/>
    <polygon points="11,6 16,11 11,16 6,11" fill="#fff" opacity="0.5"/>
  </svg>`;

  lootPanel.innerHTML = `
    <div style="margin-bottom:10px;font-size:1.1em;">Loots:</div>
    <div style="margin-bottom:6px;color:#ffe066;display:flex;align-items:center;justify-content:center;">
      ${essenceIcon}<span>essence<b>+${essence.toLocaleString()}</b></span>
    </div>
    <div style="margin-bottom:6px;color:#8be9fd;display:flex;align-items:center;justify-content:center;">
      ${bosonIcon}<span><b>+${bosons.toFixed(2)}</b></span>
    </div>
    <div style="margin-bottom:6px;color:#bd93f9;display:flex;align-items:center;justify-content:center;">
      ${leptonIcon}<span><b>+${leptons.toFixed(2)}</b></span>
    </div>
  `;

  document.body.appendChild(lootPanel);

  // Animate in
  setTimeout(() => {
    lootPanel.style.opacity = '0.75';
  }, 15);

  // Remove after 1.5 seconds
  setTimeout(() => {
    lootPanel.style.opacity = '0';
    setTimeout(() => {
      if (lootPanel.parentNode) lootPanel.parentNode.removeChild(lootPanel);
    }, 400);
  }, 1500);
}