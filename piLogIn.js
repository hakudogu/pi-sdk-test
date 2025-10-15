

document.addEventListener('DOMContentLoaded', async function () {
  const app = document.getElementById('app');

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Please log in using the Pi Browser.';
  subtitle.id = 'subtitle';

  const loginBtn = document.createElement('button');
  loginBtn.textContent = 'Log In';
  loginBtn.id = 'login-btn';

  // New: Payment subtitle and button
  const paySubtitle = document.createElement('p');
  paySubtitle.textContent = 'Test payment button';
  paySubtitle.id = 'pay-subtitle';

  const payBtn = document.createElement('button');
  payBtn.textContent = 'Pay Test Pi';
  payBtn.id = 'pay-btn';

  app.innerHTML = '';
  app.appendChild(subtitle);
  app.appendChild(loginBtn);
  app.appendChild(paySubtitle);
  app.appendChild(payBtn);

  function onIncompletePaymentFound(payment) {
    console.log('Incomplete payment found:', payment);
  }

  // Handler for when payment is ready for server approval
  function onReadyForServerApproval(paymentId) {
    // Here you would send the paymentId to your backend for approval
    // For demo, just log it
    console.log('Payment ready for server approval:', paymentId);
    // Example: fetch('/approve-payment', { method: 'POST', body: JSON.stringify({ paymentId }) })
  }

  async function triggerPiAuth() {
    if (typeof window.Pi === 'undefined') {
      subtitle.textContent = 'Please open this app in the Pi Browser to log in.';
      return;
    }
    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      subtitle.textContent = `Welcome, ${authResult.user.username}!`;
      loginBtn.style.display = 'none';
    } catch (error) {
      subtitle.textContent = 'Authentication failed or was cancelled.';
    }
  }

  // Automatically trigger authentication if in Pi Browser
  if (typeof window.Pi !== 'undefined') {
    triggerPiAuth();
  }

  loginBtn.onclick = triggerPiAuth;

  // Payment button handler (test payment)
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
        onReadyForServerApproval // Added as per Pi SDK docs
      );
      alert('Payment prompt triggered!');
    } catch (error) {
      alert('Payment failed or was cancelled.');
    }
  };
});
