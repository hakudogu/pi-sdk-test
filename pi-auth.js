// Check if running in Pi Browser
function isPiBrowser() {
  return /PiBrowser/i.test(navigator.userAgent);
}

// Handle Pi authentication
function piLogin() {
  if (!isPiBrowser()) {
    alert('Please use Pi Browser to log in with Pi Network.');
    return;
  }
  if (window.Pi) {
    window.Pi.authenticate(['username'], onAuthSuccess, onAuthFailure);
  } else {
    alert('Pi SDK not loaded.');
  }
}

function onAuthSuccess(authResult) {
  const username = authResult.user.username;
  document.getElementById('pi-username').textContent = `Logged in as: ${username}`;
}

function onAuthFailure(error) {
  alert('Authentication failed: ' + error);
}

// Create login button and username display
window.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Log in with Pi';
  loginBtn.onclick = piLogin;
  document.body.appendChild(loginBtn);

  const usernameDiv = document.createElement('div');
  usernameDiv.id = 'pi-username';
  usernameDiv.style.marginTop = '10px';
  document.body.appendChild(usernameDiv);

  // Auto-login if in Pi Browser
  if (isPiBrowser()) {
    piLogin();
  }
});