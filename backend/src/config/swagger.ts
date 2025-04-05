import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WeHouse API Documentation',
      version: '1.0.0',
      description: 'API documentation for WeHouse Reservation System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Rooms',
        description: 'Room management endpoints',
      },
      {
        name: 'Banned Customers',
        description: 'Banned customer management endpoints',
      }
    ],
    components: {
      schemas: {
        Room: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              description: 'Room color (case-insensitive)',
              example: 'blue',
            },
            capacity: {
              type: 'number',
              description: 'Room capacity',
              example: 3,
            },
            type: {
              type: 'string',
              enum: ['Private', 'Shared'],
              description: 'Room type',
              example: 'Private',
            },
            twoPersonBeds: {
              type: 'number',
              description: 'Number of two-person beds',
              example: 1,
            },
            onePersonBeds: {
              type: 'number',
              description: 'Number of one-person beds',
              example: 1,
            },
            rentPrice: {
              type: 'number',
              description: 'Room rent price',
              example: 2100,
            },
            status: {
              type: 'string',
              enum: ['ReadyForReservation', 'Reserved', 'Maintenance', 'Full'],
              description: 'Room status',
              example: 'ReadyForReservation',
            },
          },
          required: ['color', 'capacity', 'type', 'twoPersonBeds', 'onePersonBeds', 'rentPrice'],
        },
        BannedCustomer: {
          type: 'object',
          properties: {
            customerId: {
              type: 'string',
              description: 'Customer ID',
              example: '123456789',
            },
            reason: {
              type: 'string',
              description: 'Reason for banning',
              example: 'Repeated late payments',
            },
            bannedUntil: {
              type: 'string',
              format: 'date-time',
              description: 'Ban expiration date',
              example: '2024-12-31T23:59:59Z',
            },
          },
          required: ['customerId', 'reason', 'bannedUntil'],
        },
      },
    },
  },
  apis: [
    './src/routes/*.ts', // All route files
    './src/dtos/*.ts',   // DTO files for request/response schemas
  ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}; 