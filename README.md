# GMAO CMMS API

Modern Computerized Maintenance Management System API built with Node.js, TypeScript, and TypeORM.

## Features

- RESTful API with TypeScript
- MySQL database with TypeORM
- JWT Authentication
- File upload support
- Real-time WebSocket support
- Mobile-optimized endpoints
- Docker containerization

## Quick Start

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment:
\`\`\`bash
cp .env.example .env
# Edit .env with your database credentials
\`\`\`

3. Start development:
\`\`\`bash
npm run dev
\`\`\`

4. Or use Docker:
\`\`\`bash
docker-compose up
\`\`\`

## API Documentation

Access Swagger UI at: http://localhost:3000/api-docs

## Project Structure

\`\`\`
src/
├── core/           # Domain entities and business logic
├── infrastructure/ # Database and external services
├── application/    # Use cases and DTOs
├── presentation/   # REST controllers and routes
├── shared/         # Utilities and middleware
└── config/         # Configuration files
\`\`\`
