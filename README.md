# Hunter Bot Backend

A conversational AI backend service that powers the Hunter Chatbot job search assistant. This Node.js/Express server provides AI-powered job search capabilities, legal information, and resource recommendations through the OpenAI API.

## Features

- **AI-Powered Conversations**: Integrates with OpenAI to provide natural language understanding and responses
- **Multi-language Support**: Handles conversations in English and Spanish
- **Knowledge Base Integration**: Uses a structured JSON database of jobs, legal information, and resources
- **Intent Classification**: Identifies user intent to provide relevant responses
- **Conversation History**: Maintains context across multiple messages in a conversation

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for creating API endpoints
- **OpenAI API**: Provides natural language processing capabilities
- **CORS**: Handles cross-origin resource sharing for frontend integration
- **dotenv**: Manages environment variables

## API Endpoints

### POST /api/openai/chat

Processes user messages and returns AI-generated responses.

**Request Body:**

```json
{
  "message": "I'm looking for construction jobs in San Jose",
  "language": "en",
  "conversation_history": [
    {
      "user": "Hello, I need help finding a job",
      "hunter_bot": "I can help you find job opportunities. What type of work are you looking for?"
    }
  ]
}
```

**Response:**

```json
{
  "response": "San Jose, CA - Job ID 3: Construction Helper. Description: Support carpenters and builders at construction sites. Requirements: Work permit (EAD), physically fit, safety training (can be provided). Would you like to apply or see more details, or should I look for additional opportunities nearby?",
  "intent": "job_search"
}
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/luisarevalo21/hunter-bot-backend.git
   cd hunter-bot-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key
   PORT=8000
   NODE_ENV=development
   ALLOWED_ORIGIN=https://your-production-domain.com
   ```

### Running the Server

#### Development Mode

```bash
npm run dev
```

This will start the server with nodemon for automatic reloading during development.

#### Production Mode

```bash
NODE_ENV=production npm start
```

## Environment Configuration

- **PORT**: The port on which the server will run (default: 8000)
- **NODE_ENV**: Set to 'production' for production environment, otherwise defaults to development
- **OPENAI_API_KEY**: Your OpenAI API key
- **ALLOWED_ORIGIN**: The domain allowed to access this API in production

## CORS Configuration

The server uses environment-aware CORS configuration:

- In development: Allows requests from common local development servers (localhost:5173, localhost:3000)
- In production: Restricts access to the specified ALLOWED_ORIGIN

## Knowledge Base

The server uses a JSON-based knowledge base located at `./mockdata/knowledge.json` which contains:

- Job listings with titles, descriptions, locations, and requirements
- Legal information and resources for job seekers
- Translations for multilingual support

## Error Handling

The API implements robust error handling:

- OpenAI API errors are caught and returned with appropriate status codes
- JSON parsing errors are handled gracefully with fallback responses
- General server errors return standardized error messages

## Development and Contribution

### File Structure

```
backend/
├── controller/
│   └── chat.js       # Chat endpoint controller
├── mockdata/
│   └── knowledge.json # Knowledge base data
├── openai.js         # OpenAI configuration
├── server.js         # Express server setup
├── .env              # Environment variables (not in repo)
├── package.json      # Dependencies and scripts
└── README.md         # Documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- The Express.js team for the web framework
- All contributors to the project
