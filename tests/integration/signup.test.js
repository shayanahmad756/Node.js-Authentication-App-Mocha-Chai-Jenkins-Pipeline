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

describe('Signup Integration Tests', () => {
  const testEmail = `test${Date.now()}@example.com`;

  // Valid registration
  it('should successfully register a new user with valid credentials', async () => {
    const response = await postRequest('/api/signup', {
      username: 'testuser',
      email: testEmail,
      password: 'password123'
    });

    expect(response.statusCode).to.equal(201);
    expect(response.data.message).to.equal('User registered successfully');
    expect(response.data.user).to.have.property('username', 'testuser');
    expect(response.data.user).to.have.property('email', testEmail.toLowerCase());
  });

  // Missing fields
  it('should return error when username is missing', async () => {
    const response = await postRequest('/api/signup', {
      email: 'test@example.com',
      password: 'password123'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('required');
  });

  it('should return error when email is missing', async () => {
    const response = await postRequest('/api/signup', {
      username: 'testuser',
      password: 'password123'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('required');
  });

  it('should return error when password is missing', async () => {
    const response = await postRequest('/api/signup', {
      username: 'testuser',
      email: 'test@example.com'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('required');
  });

  // Short password
  it('should return error when password is less than 6 characters', async () => {
    const response = await postRequest('/api/signup', {
      username: 'testuser',
      email: `test${Date.now()}@example.com`,
      password: '12345'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('at least 6 characters');
  });

  // Invalid email
  it('should return error when email format is invalid', async () => {
    const response = await postRequest('/api/signup', {
      username: 'testuser',
      email: 'invalid-email',
      password: 'password123'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('valid email');
  });

  // Short username
  it('should return error when username is less than 3 characters', async () => {
    const response = await postRequest('/api/signup', {
      username: 'ab',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('between 3 and 50');
  });

  // Duplicate email
  it('should return error when email already exists', async () => {
    const duplicateEmail = `duplicate${Date.now()}@example.com`;
    
    // First registration
    await postRequest('/api/signup', {
      username: 'user1',
      email: duplicateEmail,
      password: 'password123'
    });

    // Second registration with same email
    const response = await postRequest('/api/signup', {
      username: 'user2',
      email: duplicateEmail,
      password: 'password456'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('already exists');
  });

  // Boundary testing - username length
  it('should accept username with exactly 3 characters', async () => {
    const response = await postRequest('/api/signup', {
      username: 'abc',
      email: `boundary${Date.now()}@example.com`,
      password: 'password123'
    });

    expect(response.statusCode).to.equal(201);
  });

  it('should accept username with exactly 50 characters', async () => {
    const response = await postRequest('/api/signup', {
      username: 'a'.repeat(50),
      email: `longuser${Date.now()}@example.com`,
      password: 'password123'
    });

    expect(response.statusCode).to.equal(201);
  });

  // Special characters
  it('should accept email with special characters in local part', async () => {
    const response = await postRequest('/api/signup', {
      username: 'testuser',
      email: `user.name+tag${Date.now()}@example.com`,
      password: 'password123'
    });

    expect(response.statusCode).to.equal(201);
  });

  // Case sensitivity
  it('should treat emails as case-insensitive', async () => {
    const email = `casesensitive${Date.now()}@example.com`;
    
    // First registration
    await postRequest('/api/signup', {
      username: 'user1',
      email: email,
      password: 'password123'
    });

    // Try with uppercase
    const response = await postRequest('/api/signup', {
      username: 'user2',
      email: email.toUpperCase(),
      password: 'password456'
    });

    expect(response.statusCode).to.equal(400);
    expect(response.data.message).to.include('already exists');
  });
});
