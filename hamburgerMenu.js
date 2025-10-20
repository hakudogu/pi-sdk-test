export function setupHamburgerMenu() {
  // Create hamburger button
  let menuBtn = document.createElement('div');
  menuBtn.id = 'hamburgerMenuBtn';
  menuBtn.style.position = 'fixed';
  menuBtn.style.top = '24px';
  menuBtn.style.right = '32px';
  menuBtn.style.width = '38px';
  menuBtn.style.height = '38px';
  menuBtn.style.zIndex = '100';
  menuBtn.style.cursor = 'pointer';
  menuBtn.style.display = 'flex';
  menuBtn.style.flexDirection = 'column';
  menuBtn.style.justifyContent = 'center';
  menuBtn.style.alignItems = 'center';
  menuBtn.innerHTML = `
    <span style="display:block;width:28px;height:4px;background:#fff;border-radius:2px;margin:4px 0;"></span>
    <span style="display:block;width:28px;height:4px;background:#fff;border-radius:2px;margin:4px 0;"></span>
    <span style="display:block;width:28px;height:4px;background:#fff;border-radius:2px;margin:4px 0;"></span>
  `;

  // Create dropdown menu
  let menuDropdown = document.createElement('div');
  menuDropdown.id = 'hamburgerMenuDropdown';
  menuDropdown.style.position = 'fixed';
  menuDropdown.style.top = '70px';
  menuDropdown.style.right = '32px';
  menuDropdown.style.background = 'rgba(24,24,37,0.97)';
  menuDropdown.style.borderRadius = '12px';
  menuDropdown.style.boxShadow = '0 4px 18px rgba(0,0,0,0.18)';
  menuDropdown.style.padding = '12px 0';
  menuDropdown.style.minWidth = '160px';
  menuDropdown.style.display = 'none';
  menuDropdown.style.flexDirection = 'column';
  menuDropdown.style.zIndex = '101';

  const menuItems = [
    { label: 'Home', id: 'menuHome' },
    { label: 'Inventory', id: 'menuInventory' },
    { label: 'Account Settings', id: 'menuAccount' },
    { label: 'Balance', id: 'menuBalance' },
    { label: 'leaderBoard', id: 'menuLeaderBoard' }
  ];

  menuItems.forEach(item => {
    let btn = document.createElement('button');
    btn.textContent = item.label;
    btn.id = item.id;
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.color = '#fff';
    btn.style.fontSize = '20px';
    btn.style.fontFamily = 'Arial, sans-serif';
    btn.style.padding = '10px 24px';
    btn.style.textAlign = 'left';
    btn.style.width = '100%';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'background 0.2s';
    btn.onmouseover = () => btn.style.background = 'rgba(255,255,255,0.08)';
    btn.onmouseout = () => btn.style.background = 'none';
    // Add click handlers
    if (item.id === 'menuHome') {
      btn.onclick = () => {
        window.location.href = '/'; // Redirect to landing page
      };
    } else if (item.id === 'menuInventory') {
      btn.onclick = () => {
         window.location.href = '/inventory.html'; // Redirect to landing page
      };
    } else if (item.id === 'menuAccount') {
      btn.onclick = () => {
        alert('Account Settings clicked! (Implement account settings modal or page)');
      };
    } else if (item.id === 'menuBalance') {
      btn.onclick = () => {
        alert('Balance clicked! (Implement balance modal or page)');
      };
    }
    menuDropdown.appendChild(btn);
  });

  // Toggle menu
  menuBtn.onclick = () => {
    menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'flex' : 'none';
  };

  // Hide menu when clicking outside
  document.addEventListener('mousedown', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
      menuDropdown.style.display = 'none';
    }
  });

  document.body.appendChild(menuBtn);
  document.body.appendChild(menuDropdown);
}

// Call this at the end of your DOMContentLoaded handler:
setupHamburgerMenu();