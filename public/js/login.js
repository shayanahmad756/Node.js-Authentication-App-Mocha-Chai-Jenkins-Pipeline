document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  const message = document.getElementById('message');

  if (response.ok) {
    message.style.color = 'green';
    message.textContent = data.message;
    // Redirect to dashboard after successful login
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 500);
  } else {
    message.style.color = 'red';
    message.textContent = data.message;
  }
});
