document.addEventListener('DOMContentLoaded', async function () {
  const app = document.getElementById('app');

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Please log in using the Pi Browser.';
  subtitle.id = 'subtitle';
  subtitle.style.textAlign = 'center';
  subtitle.style.fontFamily = "'Segoe UI', Arial, sans-serif";
  subtitle.style.fontSize = '1rem';
  subtitle.style.color = '#ffe066';
  subtitle.style.marginTop = '18px';
  subtitle.style.marginBottom = '12px';
  subtitle.style.letterSpacing = '0.04em';

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Log In';
  loginBtn.id = 'login-btn';
  loginBtn.style.display = 'block';
  loginBtn.style.margin = '12px auto 0 auto';
  loginBtn.style.padding = '10px 22px';
  loginBtn.style.fontSize = '1rem';
  loginBtn.style.fontFamily = "'Segoe UI', Arial, sans-serif";
  loginBtn.style.background = 'linear-gradient(90deg, #8be9fd 0%, #bd93f9 100%)';
  loginBtn.style.color = '#181825';
  loginBtn.style.border = 'none';
  loginBtn.style.borderRadius = '8px';
  loginBtn.style.cursor = 'pointer';
  loginBtn.style.boxShadow = '0 2px 8px #8be9fd44, 0 2px 8px #bd93f944';
  loginBtn.style.fontWeight = 'bold';
  loginBtn.style.letterSpacing = '0.5px';
  loginBtn.style.transition = 'transform 0.12s, box-shadow 0.12s';

  loginBtn.addEventListener('mouseenter', () => {
    loginBtn.style.transform = 'scale(1.04)';
    loginBtn.style.boxShadow = '0 4px 16px #8be9fd44, 0 2px 16px #bd93f944';
  });
  loginBtn.addEventListener('mouseleave', () => {
    loginBtn.style.transform = '';
    loginBtn.style.boxShadow = '0 2px 8px #8be9fd44, 0 2px 8px #bd93f944';
  });

  // Payment subtitle and button
  const paySubtitle = document.createElement('p');
  paySubtitle.textContent = 'Test payment button';
  paySubtitle.id = 'pay-subtitle';
  paySubtitle.style.textAlign = 'center';
  paySubtitle.style.fontFamily = "'Segoe UI', Arial, sans-serif";
  paySubtitle.style.fontSize = '0.95rem';
  paySubtitle.style.color = '#8be9fd';
  paySubtitle.style.marginTop = '16px';
  paySubtitle.style.marginBottom = '8px';
  paySubtitle.style.letterSpacing = '0.03em';

  const payBtn = document.createElement('button');
  payBtn.textContent = 'Pay Test Pi';
  payBtn.id = 'pay-btn';
  payBtn.style.display = 'block';
  payBtn.style.margin = '8px auto 0 auto';
  payBtn.style.padding = '9px 20px';
  payBtn.style.fontSize = '0.95rem';
  payBtn.style.fontFamily = "'Segoe UI', Arial, sans-serif";
  payBtn.style.background = 'linear-gradient(90deg, #bd93f9 0%, #8be9fd 100%)';
  payBtn.style.color = '#181825';
  payBtn.style.border = 'none';
  payBtn.style.borderRadius = '8px';
  payBtn.style.cursor = 'pointer';
  payBtn.style.boxShadow = '0 2px 8px #bd93f944, 0 2px 8px #8be9fd44';
  payBtn.style.fontWeight = 'bold';
  payBtn.style.letterSpacing = '0.5px';
  payBtn.style.transition = 'transform 0.12s, box-shadow 0.12s';

  payBtn.addEventListener('mouseenter', () => {
    payBtn.style.transform = 'scale(1.04)';
    payBtn.style.boxShadow = '0 4px 16px #bd93f944, 0 2px 16px #8be9fd44';
  });
  payBtn.addEventListener('mouseleave', () => {
    payBtn.style.transform = '';
    payBtn.style.boxShadow = '0 2px 8px #bd93f944, 0 2px 8px #8be9fd44';
  });

  app.innerHTML = '';
  app.appendChild(subtitle);
  app.appendChild(loginBtn);
  // app.appendChild(paySubtitle);
  // app.appendChild(payBtn);

  function onIncompletePaymentFound(payment) {
    console.log('Incomplete payment found:', payment);
  }

  function onReadyForServerApproval(paymentId) {
    console.log('Payment ready for server approval:', paymentId);
  }

  async function triggerPiAuth() {
    if (typeof window.Pi === 'undefined') {
      subtitle.textContent = 'Please open this app in the Pi Browser to log in.';
      loginBtn.style.display = 'block';
      return;
    }
    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      subtitle.textContent = `Welcome, ${authResult.user.username}!`;
      loginBtn.style.display = 'none';
      setTimeout(() => {
        window.location.href = 'game.html'; // Adjust filename/path as needed
      }, 800);
    } catch (error) {
      subtitle.textContent = 'Authentication failed.';
      loginBtn.style.display = 'block';
    }
  }

  function getPiSDK() {
    return window.Pi || window.pi;
  }

  function waitForPiSDKAndAuth() {
    if (getPiSDK()) {
      triggerPiAuth();
    } else {
      setTimeout(waitForPiSDKAndAuth, 100);
    }
  }
  waitForPiSDKAndAuth();

  loginBtn.onclick = triggerPiAuth;

  payBtn.onclick = async () => {
    if (typeof window.Pi === 'undefined') {
      alert('Please open this app in the Pi Browser to make a payment.');
      return;
    }
    try {
      await window.Pi.createPayment(
        {
          amount: 0.001,
          memo: "Test payment",
          metadata: { type: "test" }
        },
        onIncompletePaymentFound,
        onReadyForServerApproval
      );
      alert('Payment prompt triggered!');
    } catch (error) {
      alert('Payment failed or was cancelled.');
    }
  };
});