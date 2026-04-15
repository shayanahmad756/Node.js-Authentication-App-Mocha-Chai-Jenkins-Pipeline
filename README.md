# Node.js Authentication Web Application

A complete authentication system built with Node.js, Express.js, and MongoDB, featuring automated testing with Mocha/Chai/Selenium (Page Object Model), and Jenkins CI/CD pipeline integration.

## Features

- **User Registration** - Secure signup with validation
- **User Login** - Authentication with password hashing
- **Input Validation** - Email, username, and password validation
- **Security** - Password hashing with bcrypt, Helmet security headers, CORS
- **Automated Testing** - Unit tests, integration tests, and UI tests with POM
- **CI/CD Pipeline** - Jenkins automated build and test pipeline
- **Beginner-Friendly** - Simple HTML/CSS/JavaScript frontend

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **Google Chrome** - For Selenium UI tests
- **Jenkins** (optional) - For CI/CD pipeline [Download](https://www.jenkins.io/)

Verify installations:

```bash
node -v
npm -v
mongod --version
```

## Project Structure

```
nodejs-authentication-app/
│
├── public/                    # Frontend files
│   ├── css/
│   │   └── styles.css        # Application styling
│   ├── js/
│   │   ├── login.js          # Login form logic
│   │   └── signup.js         # Signup form logic
│   ├── login.html            # Login page
│   ├── signup.html           # Signup page
│   └── dashboard.html        # Dashboard page
│
├── src/                       # Backend source code
│   ├── models/
│   │   └── User.js           # User Mongoose model
│   ├── routes/
│   │   └── authRoutes.js     # Authentication routes
│   ├── utils/
│   │   └── validators.js     # Validation functions
│   ├── app.js                # Express app configuration
│   └── server.js             # Server entry point
│
├── tests/                     # Test files
│   ├── unit/
│   │   ├── emailValidation.test.js
│   │   ├── passwordValidation.test.js
│   │   └── usernameValidation.test.js
│   ├── integration/
│   │   ├── login.test.js
│   │   └── signup.test.js
│   ├── pages/                 # Page Object Models
│   │   ├── LoginPage.js
│   │   └── SignupPage.js
│   └── utils/
│       └── driver.js          # Selenium WebDriver setup
│
├── Jenkinsfile                # Jenkins CI/CD pipeline
├── package.json               # Project dependencies
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nodejs-authentication-app.git
cd nodejs-authentication-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/auth-app
```

Or copy from example:

```bash
cp .env.example .env
```

### 4. Start MongoDB

Ensure MongoDB is running:

```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

### 5. Run the Application

```bash
npm start
```

The application will start on **http://localhost:3000**

Open your browser and navigate to:
- Login: http://localhost:3000/login.html
- Signup: http://localhost:3000/signup.html

## Running Tests

### Run Unit Tests

Unit tests validate the input validation logic:

```bash
npm run test:unit
```

**Test Coverage:**
- Email format validation
- Username length validation (3-50 characters)
- Password length validation (minimum 6 characters)

### Run Integration Tests

Integration tests verify API endpoints (application must be running):

```bash
# Start the application first
npm start &

# Run integration tests
npm run test:integration
```

**Test Scenarios:**

| Test Type | Scenario | Expected Result |
|-----------|----------|----------------|
| Signup | Valid registration | Success (201) |
| Signup | Missing fields | Validation error (400) |
| Signup | Short password (< 6 chars) | Error (400) |
| Signup | Invalid email | Error (400) |
| Signup | Short username (< 3 chars) | Error (400) |
| Signup | Duplicate email | Error (400) |
| Login | Valid credentials | Success (200) |
| Login | Wrong password | Error (401) |
| Login | Non-existing user | Error (401) |
| Login | Empty form | Validation error (400) |
| Login | Invalid email format | Error (400) |

### Run All Tests

```bash
npm test
```

### Generate Test Reports

Generate HTML test reports using Mochawesome:

```bash
npm run test:report
```

Reports will be available in the `mochawesome-report/` directory. Open `mochawesome-report/mochawesome.html` in your browser to view them.

## Jenkins CI/CD Pipeline

### Setup Jenkins

1. **Start Jenkins:**
   ```bash
   java -jar jenkins.war
   ```

2. **Access Jenkins:**
   Open http://localhost:8080 in your browser

3. **Install Plugins:**
   - NodeJS Plugin
   - Pipeline Plugin
   - Mochawesome Plugin (optional)

4. **Configure NodeJS:**
   - Go to **Manage Jenkins** → **Global Tool Configuration**
   - Add NodeJS installation (version 18+)
   - Name it "NodeJS"

5. **Create Pipeline Job:**
   - Click **New Item**
   - Select **Pipeline**
   - Name your job (e.g., "Auth-App-Pipeline")
   - In **Pipeline** section, select **Pipeline script from SCM**
   - Choose **Git** and enter your repository URL
   - Set **Script Path** to `Jenkinsfile`

### Pipeline Stages

The Jenkinsfile includes the following stages:

1. **Checkout Code** - Pull latest code from repository
2. **Install Dependencies** - Run `npm install`
3. **Run Unit Tests** - Execute unit test suite
4. **Run Integration Tests** - Start app and run API tests
5. **Generate Test Reports** - Create Mochawesome HTML reports
6. **Archive Reports** - Save reports as build artifacts

### Trigger Build

- **Manual:** Click **Build Now** in Jenkins dashboard
- **Automatic:** Configure webhooks or polling triggers

### View Results

- Check **Console Output** for detailed logs
- View archived test reports in build artifacts
- Monitor pipeline stage status

## API Endpoints

### POST /api/signup

Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Username must be between 3 and 50 characters"
}
```

### POST /api/login

Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

## Validation Rules

| Field | Rules |
|-------|-------|
| Username | 3-50 characters, required |
| Email | Valid email format, required, unique |
| Password | Minimum 6 characters, required |

## Security Features

- **Password Hashing** - bcrypt with salt rounds (10)
- **HTTP Security Headers** - Helmet middleware
- **CORS Protection** - Configured CORS policy
- **Input Validation** - Server-side validation for all inputs
- **Email Case-Insensitive** - Prevents duplicate accounts

## Technology Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Testing:**
- Mocha
- Chai
- Selenium WebDriver
- Mochawesome

**CI/CD:**
- Jenkins Pipeline

## Development Scripts

```bash
# Start application
npm start

# Start with auto-restart (development)
npm run dev

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run all tests
npm test

# Generate test reports
npm run test:report
```

## Demonstration Checklist (2-3 Minutes)

Use this checklist for presentations or demonstrations:

- [ ] **Introduction**
  - [ ] State your name and assignment objective
  
- [ ] **Application Overview**
  - [ ] Show project folder structure
  - [ ] Explain authentication flow (signup → login → dashboard)
  
- [ ] **Test Architecture**
  - [ ] Explain unit tests (validation logic)
  - [ ] Explain integration tests (API endpoints)
  - [ ] Demonstrate Page Object Model pattern
  
- [ ] **Local Execution**
  - [ ] Start the application (`npm start`)
  - [ ] Show signup page and create a user
  - [ ] Show login page and authenticate
  - [ ] Run unit tests (`npm run test:unit`)
  - [ ] Run integration tests (`npm run test:integration`)
  
- [ ] **Jenkins Pipeline**
  - [ ] Show Jenkins dashboard
  - [ ] Trigger a build
  - [ ] Display pipeline stages
  - [ ] Show test results and reports
  
- [ ] **Closing**
  - [ ] Summarize key learnings
  - [ ] Highlight challenges and solutions
  - [ ] Answer questions

## Troubleshooting

### MongoDB Connection Error

Ensure MongoDB is running:
```bash
# Check MongoDB status
mongod --version

# Start MongoDB (Windows)
net start MongoDB
```

### Port Already in Use

Change the port in `.env` file:
```
PORT=3001
```

### Test Failures

- Ensure MongoDB is running
- For integration tests, ensure the application is running on port 3000
- Check that all dependencies are installed: `npm install`

### Selenium WebDriver Issues

- Ensure Google Chrome is installed
- chromedriver version should match Chrome browser version
- Set `HEADLESS=true` for headless testing

## License

MIT License

## Author

Built as a comprehensive authentication application with testing and CI/CD integration.

## Acknowledgments

- Express.js documentation
- MongoDB University
- Mocha and Chai documentation
- Selenium WebDriver guides
- Jenkins documentation
