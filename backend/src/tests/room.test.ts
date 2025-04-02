import { RoomService } from '../services/room.service';
import { RoomStatus, RoomType } from '../types/room.types';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Room Service', () => {
  let roomService: RoomService;

  const mockRoom = {
    color: 'Yellow',
    capacity: 3,
    type: RoomType.Private,
    twoPersonBeds: 1,
    onePersonBeds: 1,
    rentPrice: 2100,
    status: RoomStatus.ReadyForReservation
  };

  beforeAll(async () => {
    try {
      // Connect to MongoDB
      const mongoUri = process.env.MONGODB_TEST_URI;
      if (!mongoUri) {
        throw new Error('MONGODB_TEST_URI is not defined in environment variables');
      }
      
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      });
      
      console.log('Connected to MongoDB test database');
      roomService = new RoomService();
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  });

  beforeEach(async () => {
    try {
      // Clean up the database before each test
      const db = mongoose.connection.db;
      if (!db) {
        throw new Error('Database connection not established');
      }
      const collections = await db.collections();
      for (const collection of collections) {
        await collection.deleteMany({});
      }
      console.log('Test database cleaned up');
    } catch (error) {
      console.error('Failed to clean up test database:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Failed to close MongoDB connection:', error);
      throw error;
    }
  });

  describe('createRoom', () => {
    it('should create a new room', async () => {
      const room = await roomService.createRoom(mockRoom);
      
      expect(room).toBeDefined();
      expect(room.color).toBe(mockRoom.color);
      expect(room.capacity).toBe(mockRoom.capacity);
      expect(room.type).toBe(mockRoom.type);
      expect(room.twoPersonBeds).toBe(mockRoom.twoPersonBeds);
      expect(room.onePersonBeds).toBe(mockRoom.onePersonBeds);
      expect(room.rentPrice).toBe(mockRoom.rentPrice);
      expect(room.status).toBe(mockRoom.status);
      expect(room._id).toBeDefined();
    });

    it('should not create a room with duplicate color', async () => {
      await roomService.createRoom(mockRoom);
      
      await expect(roomService.createRoom(mockRoom))
        .rejects
        .toThrow(/duplicate key error/);
    });

    it('should not create a room with invalid capacity', async () => {
      const invalidRoom = { ...mockRoom, capacity: 0 };
      await expect(roomService.createRoom(invalidRoom))
        .rejects
        .toThrow(/capacity must be greater than 0/);

      const negativeCapacity = { ...mockRoom, capacity: -1 };
      await expect(roomService.createRoom(negativeCapacity))
        .rejects
        .toThrow(/capacity must be greater than 0/);
    });

    it('should not create a room with invalid bed counts', async () => {
      const invalidTwoPersonBeds = { ...mockRoom, twoPersonBeds: -1 };
      await expect(roomService.createRoom(invalidTwoPersonBeds))
        .rejects
        .toThrow(/bed counts must be non-negative/);

      const invalidOnePersonBeds = { ...mockRoom, onePersonBeds: -1 };
      await expect(roomService.createRoom(invalidOnePersonBeds))
        .rejects
        .toThrow(/bed counts must be non-negative/);
    });

    it('should not create a room with invalid rent price', async () => {
      const invalidPrice = { ...mockRoom, rentPrice: -1 };
      await expect(roomService.createRoom(invalidPrice))
        .rejects
        .toThrow(/rent price must be non-negative/);
    });

    it('should not create a room with empty color', async () => {
      const emptyColor = { ...mockRoom, color: '' };
      await expect(roomService.createRoom(emptyColor))
        .rejects
        .toThrow(/color is required/);
    });

    it('should not create a room with invalid status', async () => {
      const invalidStatus = { ...mockRoom, status: 'InvalidStatus' as RoomStatus };
      await expect(roomService.createRoom(invalidStatus))
        .rejects
        .toThrow(/invalid status/);
    });
  });

  describe('getRoomByColor', () => {
    it('should find room by color case-insensitive', async () => {
      await roomService.createRoom(mockRoom);
      
      const lowerCase = await roomService.getRoomByColor('yellow');
      expect(lowerCase).toBeDefined();
      expect(lowerCase?.color).toBe(mockRoom.color);
      
      const upperCase = await roomService.getRoomByColor('YELLOW');
      expect(upperCase).toBeDefined();
      expect(upperCase?.color).toBe(mockRoom.color);
    });

    it('should return null for non-existent room', async () => {
      const room = await roomService.getRoomByColor('NonExistent');
      expect(room).toBeNull();
    });

    it('should handle empty color search', async () => {
      const room = await roomService.getRoomByColor('');
      expect(room).toBeNull();
    });

    it('should handle special characters in color search', async () => {
      const room = await roomService.getRoomByColor('Yellow@#$%');
      expect(room).toBeNull();
    });

    it('should handle whitespace-only color search', async () => {
      const room = await roomService.getRoomByColor('   ');
      expect(room).toBeNull();
    });
  });

  describe('updateRoomStatus', () => {
    it('should update room status', async () => {
      const room = await roomService.createRoom(mockRoom);
      const updated = await roomService.updateRoomStatus(room._id, RoomStatus.Full);
      
      expect(updated).toBeDefined();
      expect(updated?.status).toBe(RoomStatus.Full);
      expect(updated?.color).toBe(mockRoom.color); // Other properties should remain unchanged
    });

    it('should return null when updating non-existent room', async () => {
      const updated = await roomService.updateRoomStatus(
        new mongoose.Types.ObjectId(),
        RoomStatus.Full
      );
      expect(updated).toBeNull();
    });

    it('should not update status to invalid value', async () => {
      const room = await roomService.createRoom(mockRoom);
      const updated = await roomService.updateRoomStatus(
        room._id,
        'InvalidStatus' as RoomStatus
      );
      expect(updated).toBeNull();
    });

    it('should handle updating status to same value', async () => {
      const room = await roomService.createRoom(mockRoom);
      const updated = await roomService.updateRoomStatus(
        room._id,
        mockRoom.status
      );
      expect(updated).toBeDefined();
      expect(updated?.status).toBe(mockRoom.status);
    });

    it('should handle invalid ObjectId format', async () => {
      const updated = await roomService.updateRoomStatus(
        'invalid-id' as any,
        RoomStatus.Full
      );
      expect(updated).toBeNull();
    });
  });
});
