document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  const data = await response.json();
  const message = document.getElementById('message');

  if (response.ok) {
    message.style.color = 'green';
    message.textContent = data.message;
    // Optionally redirect to login after successful signup
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  } else {
    message.style.color = 'red';
    message.textContent = data.message;
  }
});
