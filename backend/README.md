# WeHouse Backend

A TypeScript-based Express backend for the WeHouse application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (if needed):
```bash
PORT=3000
```

## Available Scripts

- `npm run dev`: Start the development server with hot-reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Data models
├── routes/         # API routes
├── __tests__/      # Test files
└── server.ts       # Main application file
```

## Testing

The project uses Jest for testing. Tests can be found in the `src/__tests__` directory. 