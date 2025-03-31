# WeHouse Reservation System

A modern reservation system for WeHouse guest house in Anzali, Iran. Built with Node.js, Express, TypeScript, and MongoDB.

## Project Overview

WeHouse is a guest house management system that helps streamline the reservation process and room management. The system allows administrators to manage rooms, handle reservations, and maintain customer records efficiently.

## Features Implemented

### Room Management
- CRUD operations for rooms
- Room properties:
  - Color (Yellow, Orange, Green, Red, Blue, Purple)
  - Name
  - Capacity
  - Type (Shared/Private)
  - Number of two-person beds
  - Number of one-person beds
  - Rent price
  - Status (Full, Partially Full, Ready for Reservation)

### Room Specifications
- Yellow Room: 1 two-person bed, 1 one-person bed, Capacity: 3, Rent: 2100 toman
- Blue Room: 2 one-person beds, Capacity: 2, Rent: 1400 toman
- Purple Room: 2 one-person beds, Capacity: 2, Rent: 1200 toman
- Green Room: 1 two-person bed, Capacity: 2, Rent: 1800 toman
- Red Room: 1 two-person bed, Capacity: 2, Rent: 1600 toman
- Orange Room: Shared room, Capacity: 4, Rent: 400 toman per person

## Technical Stack

- **Backend Framework**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB
- **Architecture**: MVC pattern
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## API Endpoints

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get a specific room
- `POST /api/rooms` - Create a new room
- `PUT /api/rooms/:id` - Update a room
- `DELETE /api/rooms/:id` - Delete a room

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Upcoming Features

- Reservation management system
- Calendar integration for room availability
- Customer management with red-flag system
- Jalali date support
- Search and filter functionality for reservations
- Pagination for reservation lists

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.