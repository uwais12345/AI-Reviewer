You are a Principal AI Systems Architect, Senior MERN Stack Engineer, GitHub Integration Specialist, DevOps Engineer, and AI Product Engineer.

Your task is to build a complete production-style full-stack project called:

========================================================
AI CODE REVIEWER
========================================================

This is an AI-powered Pull Request Review Agent that integrates with GitHub and automatically reviews code whenever a Pull Request is created, updated, synchronized, or reopened.

The system should behave like an intelligent senior software engineer capable of analyzing pull requests and generating:
- code review summaries
- bug detection
- security analysis
- code quality insights
- performance suggestions
- best practice recommendations

========================================================
PRIMARY OBJECTIVE
========================================================

Build a modern real-world AI SaaS style application using MERN architecture.

The project must include:
1. Frontend Dashboard
2. Backend Webhook Server
3. GitHub API Integration
4. AI Review Engine
5. MongoDB Database
6. Review History System
7. Analytics Dashboard

The application must demonstrate:
- event-driven architecture
- API orchestration
- scalable backend structure
- modular design
- professional UI/UX
- AI integration workflow

========================================================
IMPORTANT INSTRUCTIONS
========================================================

- Generate REAL WORKING CODE
- Do NOT generate pseudo-code
- Use clean architecture
- Use reusable components
- Use async/await properly
- Add meaningful comments
- Handle errors gracefully
- Use environment variables
- Make UI responsive and modern
- Ensure deployment readiness

========================================================
TECH STACK
========================================================

Frontend:
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Octokit GitHub SDK

AI Integration:
- Groq API
OR
- OpenAI-compatible API

Deployment:
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

========================================================
APPLICATION FLOW
========================================================

GitHub Pull Request Created
        ↓
GitHub Webhook Triggered
        ↓
Backend Receives Event
        ↓
Fetch Pull Request Details
        ↓
Fetch Changed Files and Diffs
        ↓
Send Code Diff to AI
        ↓
AI Generates Review
        ↓
Store Review in MongoDB
        ↓
Frontend Displays Results

========================================================
BACKEND REQUIREMENTS
========================================================

Build a scalable Express.js backend.

========================================================
BACKEND FOLDER STRUCTURE
========================================================

backend/
│
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   ├── utils/
│   ├── prompts/
│   ├── validators/
│   └── jobs/
│
├── .env
├── package.json
├── app.js
└── server.js

========================================================
WEBHOOK SYSTEM
========================================================

Create:
POST /webhook

Listen for GitHub pull_request events.

Handle:
- opened
- synchronize
- reopened

Extract:
- repository owner
- repository name
- PR number
- PR title
- PR author

Validate GitHub webhook signatures.

Log webhook activities properly.

========================================================
GITHUB API INTEGRATION
========================================================

Use Octokit SDK.

Fetch:
- pull request metadata
- changed files
- patch/diff content
- additions
- deletions
- commit details

Ignore:
- binary files
- node_modules
- lock files
- huge files

========================================================
AI REVIEW ENGINE
========================================================

Create dedicated AI review service.

AI must analyze:
- bugs
- vulnerabilities
- readability
- maintainability
- performance
- best practices
- code smells

========================================================
AI PROMPT STRUCTURE
========================================================

Use structured prompts like:

“You are a senior software engineer and expert code reviewer.

Analyze the following pull request diff.

Review for:
- bugs
- security vulnerabilities
- performance issues
- readability
- maintainability
- best practices

Return response ONLY in JSON format.”

========================================================
AI RESPONSE FORMAT
========================================================

{
  "summary": "",
  "severity": "",
  "score": 0,
  "suggestions": [
    {
      "file": "",
      "issue": "",
      "severity": "",
      "fix": ""
    }
  ]
}

========================================================
SEVERITY LEVELS
========================================================

Use:
- LOW
- MEDIUM
- HIGH
- CRITICAL

========================================================
MONGODB REQUIREMENTS
========================================================

Use MongoDB Atlas.

Use Mongoose ODM.

========================================================
MONGOOSE MODELS
========================================================

Create models:

1. Repository
2. PullRequest
3. AIReview
4. ReviewHistory

========================================================
REPOSITORY MODEL
========================================================

Fields:
- repoName
- owner
- githubUrl
- createdAt

========================================================
PULL REQUEST MODEL
========================================================

Fields:
- repositoryId
- prNumber
- title
- author
- status
- githubUrl
- createdAt

========================================================
AI REVIEW MODEL
========================================================

Fields:
- prId
- summary
- severity
- score
- suggestions
- reviewedAt

========================================================
REVIEW HISTORY MODEL
========================================================

Fields:
- prId
- action
- timestamp

========================================================
API ENDPOINTS
========================================================

Create:

POST /webhook

GET /api/pull-requests

GET /api/pull-requests/:id

GET /api/reviews/:id

GET /api/dashboard/stats

========================================================
FRONTEND REQUIREMENTS
========================================================

Build a professional responsive frontend dashboard.

========================================================
FRONTEND FOLDER STRUCTURE
========================================================

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── layouts/
│   ├── context/
│   ├── routes/
│   └── utils/
│
├── public/
├── package.json
└── vite.config.js

========================================================
PAGES REQUIRED
========================================================

1. Dashboard Page
2. Pull Request Details Page
3. Review History Page
4. Analytics Page

========================================================
DASHBOARD PAGE
========================================================

Display:
- total pull requests
- reviewed PRs
- pending reviews
- severity distribution
- recent reviews

Each PR card should show:
- repository name
- PR title
- author
- severity badge
- review score
- timestamp

========================================================
PR DETAILS PAGE
========================================================

Display:
- PR metadata
- changed files
- AI summary
- issues detected
- suggestions
- severity level
- review score
- timeline/history

========================================================
ANALYTICS PAGE
========================================================

Display charts for:
- severity counts
- review trends
- PR statistics

Use:
- Recharts

========================================================
UI/UX REQUIREMENTS
========================================================

Design a modern AI SaaS dashboard.

Use:
- Tailwind CSS
- responsive design
- glassmorphism cards
- hover animations
- loading skeletons
- empty states
- error states

Use dark modern theme.

========================================================
BADGES
========================================================

Severity colors:
- Critical → red
- High → orange
- Medium → yellow
- Low → green

========================================================
BONUS FEATURES
========================================================

If possible implement:

1. Auto GitHub PR Comment
2. Search and Filter
3. Pagination
4. Review Timeline
5. PR Quality Score
6. Inline Suggestions
7. Retry Failed Reviews
8. Background Job Queue
9. Rate Limit Handling
10. Repository Analytics

========================================================
ERROR HANDLING
========================================================

Handle:
- invalid payloads
- GitHub rate limits
- AI API failures
- MongoDB connection failures
- missing environment variables
- unsupported files

========================================================
SECURITY REQUIREMENTS
========================================================

- Validate webhook signatures
- Use environment variables
- Secure API keys
- Sanitize AI responses
- Prevent invalid requests

========================================================
ENVIRONMENT VARIABLES
========================================================

Generate .env.example.

Include:
- PORT
- MONGODB_URI
- GITHUB_TOKEN
- GITHUB_WEBHOOK_SECRET
- AI_API_KEY
- AI_BASE_URL

========================================================
README REQUIREMENTS
========================================================

Generate detailed README.md with:
- project overview
- architecture
- setup instructions
- installation steps
- MongoDB Atlas setup
- GitHub webhook setup
- deployment guide
- API documentation
- screenshots section

========================================================
DEPLOYMENT REQUIREMENTS
========================================================

Frontend:
- Vercel deployment steps

Backend:
- Render deployment steps

Database:
- MongoDB Atlas connection setup

========================================================
CODE QUALITY REQUIREMENTS
========================================================

- reusable services
- scalable architecture
- modular structure
- clean imports
- proper naming conventions
- async/await usage
- maintainable codebase

========================================================
OUTPUT REQUIREMENTS
========================================================

Generate:
1. Complete backend code
2. Complete frontend code
3. Mongoose schemas
4. API integration code
5. GitHub integration logic
6. AI review service
7. React components
8. Tailwind UI
9. README.md
10. Deployment guide
11. Environment setup
12. Folder structure

========================================================
FINAL INSTRUCTION
========================================================

The final application must look like a real-world AI-powered developer tool and internship-level SaaS product.

The frontend should feel modern and premium.

The backend should be scalable and modular.

The AI review experience should feel realistic and intelligent.

Generate everything step-by-step with proper organized sections and clean production-style code.