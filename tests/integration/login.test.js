const { expect } = require('chai');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

/**
 * Helper function to make HTTP POST requests
 */
function postRequest(path, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const postData = JSON.stringify(data);

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: JSON.parse(body)
        });
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

describe('Login Integration Tests', () => {
  const testEmail = `logintest${Date.now()}@example.com`;
  const testPassword = 'password123';

  // Create a test user before running login tests
  before(async () => {
    await postRequest('/api/signup', {
      username: 'logintestuser',
      email: testEmail,
      password: testPassword
    });
  });

  // Valid credentials
  it('should successfully login with valid credentials', async () => {
    const response = await postRequest('/api/login', {
      email: testEmail,
      password: testPassword
    });

    expect(response.statusCode).to.equal(200);
    expect(response.data.message).to.equal('Login successful');
    expect(response.data.user).to.have.property('username', 'logintestuser');
    expect(response.data.user).to.have.property('email', testEmail.toLowerCase());
  });

  // Wrong password
  it('should return error when password is incorrect', async () => {
    const response = await postRequest('/api/login', {
      email: testEmail,
      password: 'wrongpassword'
    });

    expect(response.statusCode).to.equal(401);
    expect(response.data.message).to.equal('Invalid email or password');
  });

  // Non-existing user
  it('should return error when user does not exist', async () => {
    const response = await postRequest('/api/login', {
      email: 'nonexistent@example.com',
      password: 'password123'
    });

    expect(response.statusCode).to.equal(401);
    expect(response.data.message).to.equal('Invalid email or password');
  });

  // Empty form
  it('should return error when email is missing', async () => {
    const response = await postRequest('/api/login', {
      password: 'password123'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('required');
  });

  it('should return error when password is missing', async () => {
    const response = await postRequest('/api/login', {
      email: testEmail
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('required');
  });

  // Invalid email format
  it('should return error when email format is invalid', async () => {
    const response = await postRequest('/api/login', {
      email: 'invalid-email',
      password: 'password123'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('valid email');
  });

  // Case sensitivity
  it('should login successfully with uppercase email', async () => {
    const response = await postRequest('/api/login', {
      email: testEmail.toUpperCase(),
      password: testPassword
    });

    expect(response.statusCode).to.equal(200);
    expect(response.data.message).to.equal('Login successful');
  });

  // Special characters in password
  it('should login successfully with special characters in password', async () => {
    const specialEmail = `special${Date.now()}@example.com`;
    const specialPassword = 'p@ssw0rd!#$%';

    // Create user with special password
    await postRequest('/api/signup', {
      username: 'specialuser',
      email: specialEmail,
      password: specialPassword
    });

    // Login with same password
    const response = await postRequest('/api/login', {
      email: specialEmail,
      password: specialPassword
    });

    expect(response.statusCode).to.equal(200);
    expect(response.data.message).to.equal('Login successful');
  });

  // Boundary password length
  it('should login successfully with 6-character password', async () => {
    const boundaryEmail = `boundary${Date.now()}@example.com`;
    const boundaryPassword = '123456';

    // Create user with 6-char password
    await postRequest('/api/signup', {
      username: 'boundaryuser',
      email: boundaryEmail,
      password: boundaryPassword
    });

    // Login
    const response = await postRequest('/api/login', {
      email: boundaryEmail,
      password: boundaryPassword
    });

    expect(response.statusCode).to.equal(200);
    expect(response.data.message).to.equal('Login successful');
  });
});
