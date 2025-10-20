import { phoenix } from './creatures/phoenix.js';
import { cosmicVoid } from './creatures/cosmicVoid.js'; 
import { cyclops } from './creatures/cyclops.js'; 
import { cerberus } from './creatures/cerberus.js';
import { dragon } from './creatures/dragon.js'; // <-- Import dragon metadata
import { bigfoot } from './creatures/bigfoot.js';
import { grey } from './creatures/grey.js';
import{ orangBunian } from './creatures/orangBunian.js';
import { jorogumo } from './creatures/Jorogumo.js';
import { setupGalaxyBackground } from './Realms/galaxyBG.js';
import { setupEarthTerraBackground } from './Realms/EarthTerra.js';
import { setupHamburgerMenu } from './hamburgerMenu.js';
import { showLootDisplay } from './LootDisplay.js';
import { startBowAndArrowGame } from './weapons/bowAndArrow.js';
import { startLaserGame } from './weapons/laser.js';

setupHamburgerMenu();
setupGalaxyBackground();

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app');
  const bow = document.getElementById('bow');
   let bgCanvas = document.getElementById('earthBGCanvas');
  if (!bgCanvas) {
    bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'earthBGCanvas';
    bgCanvas.style.position = 'fixed';
    bgCanvas.style.top = '0';
    bgCanvas.style.left = '0';
    bgCanvas.style.width = '100vw';
    bgCanvas.style.height = '100vh';
    bgCanvas.style.zIndex = '-5';
    bgCanvas.style.pointerEvents = 'none';
    document.body.appendChild(bgCanvas);
  }

  function resizeAndDrawBG() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    const ctx = bgCanvas.getContext('2d');
    // setupEarthTerraBackground(ctx, bgCanvas.width, bgCanvas.height);
  }

  // Draw on load and on resize
  resizeAndDrawBG();
  window.addEventListener('resize', resizeAndDrawBG);

  // ...rest of your existing code...

  if (appRoot) {
    // Create creature canvas
    const creatureCanvas = document.createElement('canvas');
    creatureCanvas.width = 200;
    creatureCanvas.height = 200;
    creatureCanvas.style.width = '200px';
    creatureCanvas.style.height = '200px';
    creatureCanvas.style.position = 'fixed';
    creatureCanvas.style.top = '50%';
    creatureCanvas.style.left = '50%';
    creatureCanvas.style.transform = 'translate(-50%, -50%)';
    creatureCanvas.style.zIndex = '5';
    appRoot.appendChild(creatureCanvas);
    
    const dragonCtx = creatureCanvas.getContext('2d');
    
    // Mythical creatures array
    const mythicalCreatures = [dragon, phoenix, cosmicVoid, cyclops, cerberus, bigfoot, grey, orangBunian, jorogumo];
    
    let currentCreature = mythicalCreatures[0];
    updateCreatureStatsPanel(currentCreature);
    
    // Switch to random creature
    function switchToRandomCreature() {
      // Exclude the current creature
      // Select based on weighted rarity
      // Pick a random number up to totalWeight
      const otherCreatures = mythicalCreatures.filter(creature => creature.name !== currentCreature.name);
      
      // Calculate total weight
      const totalWeight = otherCreatures.reduce((sum, c) => sum + c.rarity, 0);
      
      let rand = Math.random() * totalWeight;
      for (const creature of otherCreatures) {
        if (rand < creature.rarity) {
          currentCreature = creature;
          return;
        }
        rand -= creature.rarity;
      }
    }
    
    function updateCreatureStatsPanel(creature) {
      let statsPanel = document.getElementById('creatureStatsPanel');
      if (!statsPanel) {
        statsPanel = document.createElement('div');
        statsPanel.id = 'creatureStatsPanel';
        statsPanel.style.position = 'fixed';
        statsPanel.style.top = '75px';
        statsPanel.style.left = '150px';
        statsPanel.style.transform = 'translateX(-50%)';
        statsPanel.style.background = 'rgba(24,24,37,0.85)';
        statsPanel.style.color = '#fff';
        statsPanel.style.fontSize = '10px';
        statsPanel.style.fontWeight = 'bold';
        statsPanel.style.fontFamily = 'Arial, sans-serif';
        statsPanel.style.padding = '10px 20px';
        statsPanel.style.borderRadius = '0 0 18px 18px';
        statsPanel.style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)';
        statsPanel.style.zIndex = '30';
        document.body.appendChild(statsPanel);
      }
      statsPanel.textContent = 
        `Creature: ${currentCreature.name.toUpperCase()}        
        Rarity: ${currentCreature.rarity} 
        Essence: ${currentCreature.points}`;
    }
       // Add this function to handle clicks on the creature canvas
    function handleClick() {
      switchToRandomCreature();
      updateCreatureStatsPanel(currentCreature);
    }

    creatureCanvas.addEventListener('click', handleClick);

//  // Helper to get Manila time (UTC+8)
// function getManilaDate() {
//   return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));
// }

// // Schedule the next creature switch at 12:01 AM Manila time
// function scheduleNextCreatureSwitch() {
//   const now = getManilaDate();
//   let next = new Date(now);
//   next.setHours(0, 1, 0, 0); // 12:01 AM today

//   if (now >= next) {
//     // If it's already past 12:01 AM, schedule for tomorrow
//     next.setDate(next.getDate() + 1);
//   }

//   const msUntilNext = next - now;
//   setTimeout(() => {
//     switchToRandomCreature();
//     updateCreatureStatsPanel(currentCreature);
//     scheduleNextCreatureSwitch(); // Schedule the next switch
//   }, msUntilNext);
// }

// On load, set the creature and schedule the switch
updateCreatureStatsPanel(currentCreature);
// scheduleNextCreatureSwitch();

// Remove the click handler for switching creatures
// creatureCanvas.removeEventListener('click', handleCreatureClick);
    // Main creature animation loop
    function animateCreature() {
      currentCreature.draw(dragonCtx);
      requestAnimationFrame(animateCreature);
    }

    // creatureCanvas.addEventListener('click', handleCreatureClick);
    // creatureCanvas.style.cursor = 'pointer';
    animateCreature();
    // startLaserGame(() => currentCreature);
    startBowAndArrowGame(() => currentCreature);
    // showLootDisplay({ essence: currentCreature.points, bosons: currentCreature.bosons ? (0.25 + Math.random() * 0.25) * currentCreature.points : 0, leptons: currentCreature.leptons ? (0.25 + Math.random() * 0.25) * currentCreature.points : 0 });
  }
});


