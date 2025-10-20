import { setupHamburgerMenu } from "./hamburgerMenu.js";
// In-memory loot log for the current session (replace with DB calls in the future)
export const userLoots = [];

/**
 * Record a loot event for the user.
 * @param {Object} loot - { essence, bosons, leptons, creatureName, timestamp }
 */
export function recordLoot({ essence = 0, bosons = 0, leptons = 0, creatureName = '', timestamp = Date.now() }) {
    userLoots.push({
        essence,
        bosons,
        leptons,
        creatureName,
        timestamp
    });
}

/**
 * Display the user's total loot in the #inventory div, using SVG icons.
 */
export function displayTotalLoot() {
    const inventoryDiv = document.getElementById('inventory');
    if (!inventoryDiv) return;

    // SVG icons (same as LootDisplay)
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
    const bosonIcon = `<svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:6px;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="11,3 19,8 19,16 11,21 3,16 3,8" fill="#8be9fd" stroke="#fff" stroke-width="2"/>
      <polygon points="11,7 16,10 16,14 11,17 6,14 6,10" fill="#fff" opacity="0.5"/>
    </svg>`;
    const leptonIcon = `<svg width="22" height="22" viewBox="0 0 22 22" style="vertical-align:middle;margin-right:6px;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="11,2 20,11 11,20 2,11" fill="#bd93f9" stroke="#fff" stroke-width="2"/>
      <polygon points="11,6 16,11 11,16 6,11" fill="#fff" opacity="0.5"/>
    </svg>`;

    // Calculate totals
    let totalEssence = 0, totalBosons = 0, totalLeptons = 0;
    userLoots.forEach(loot => {
        totalEssence += loot.essence;
        totalBosons += loot.bosons;
        totalLeptons += loot.leptons;
    });

    inventoryDiv.innerHTML = `
        <div style="color: #6a00ffff; font-size:1.2em;font-weight:bold;margin-bottom:12px;">Total Loot</div>
        <div style="margin-bottom:8px;color:#ffe066;display:flex;align-items:center;">
            ${essenceIcon}<span>Essence: <b>${totalEssence.toLocaleString()}</b></span>
        </div>
        <div style="margin-bottom:8px;color:#8be9fd;display:flex;align-items:center;">
            ${bosonIcon}<span>Bosons: <b>${totalBosons.toFixed(2)}</b></span>
        </div>
        <div style="margin-bottom:8px;color:#bd93f9;display:flex;align-items:center;">
            ${leptonIcon}<span>Leptons: <b>${totalLeptons.toFixed(2)}</b></span>
        </div>
        
        <div style="color: #6a00ffff; font-size:1.2em;font-weight:bold;margin-bottom:12px;">Items</div>
    `;
}

// Initialize the hamburger menu and display loot on page load
document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
    displayTotalLoot();
});