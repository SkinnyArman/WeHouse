import { RoomService } from '../services/room.service';
import { RoomStatus, RoomType } from '../types/room.types';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CreateRoomDto, UpdateRoomStatusDto } from '../dtos/room.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

dotenv.config();

describe('Room Service', () => {
  let roomService: RoomService;

  const mockRoomDto: CreateRoomDto = {
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
      const room = await roomService.createRoom(mockRoomDto);
      
      expect(room).toBeDefined();
      expect(room.color).toBe(mockRoomDto.color);
      expect(room.capacity).toBe(mockRoomDto.capacity);
      expect(room.type).toBe(mockRoomDto.type);
      expect(room.twoPersonBeds).toBe(mockRoomDto.twoPersonBeds);
      expect(room.onePersonBeds).toBe(mockRoomDto.onePersonBeds);
      expect(room.rentPrice).toBe(mockRoomDto.rentPrice);
      expect(room.status).toBe(mockRoomDto.status);
      expect(room._id).toBeDefined();
    });

    it('should not create a room with duplicate color', async () => {
      await roomService.createRoom(mockRoomDto);
      
      await expect(roomService.createRoom(mockRoomDto))
        .rejects
        .toThrow(/duplicate key error/);
    });

    it('should not create a room with invalid capacity', async () => {
      const invalidRoom = plainToClass(CreateRoomDto, { ...mockRoomDto, capacity: 0 });
      await expect(validateOrReject(invalidRoom))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'capacity',
          constraints: expect.objectContaining({
            min: 'Capacity must be greater than 0'
          })
        }));

      const negativeCapacity = plainToClass(CreateRoomDto, { ...mockRoomDto, capacity: -1 });
      await expect(validateOrReject(negativeCapacity))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'capacity',
          constraints: expect.objectContaining({
            min: 'Capacity must be greater than 0'
          })
        }));
    });

    it('should not create a room with invalid bed counts', async () => {
      const invalidTwoPersonBeds = plainToClass(CreateRoomDto, { ...mockRoomDto, twoPersonBeds: -1 });
      await expect(validateOrReject(invalidTwoPersonBeds))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'twoPersonBeds',
          constraints: expect.objectContaining({
            min: 'Two person beds count must be non-negative'
          })
        }));

      const invalidOnePersonBeds = plainToClass(CreateRoomDto, { ...mockRoomDto, onePersonBeds: -1 });
      await expect(validateOrReject(invalidOnePersonBeds))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'onePersonBeds',
          constraints: expect.objectContaining({
            min: 'One person beds count must be non-negative'
          })
        }));
    });

    it('should not create a room with invalid rent price', async () => {
      const invalidPrice = plainToClass(CreateRoomDto, { ...mockRoomDto, rentPrice: -1 });
      await expect(validateOrReject(invalidPrice))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'rentPrice',
          constraints: expect.objectContaining({
            min: 'Rent price must be non-negative'
          })
        }));
    });

    it('should not create a room with empty color', async () => {
      const emptyColor = plainToClass(CreateRoomDto, { ...mockRoomDto, color: '' });
      await expect(validateOrReject(emptyColor))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'color',
          constraints: expect.objectContaining({
            isNotEmpty: 'Color is required'
          })
        }));
    });

    it('should not create a room with invalid status', async () => {
      const invalidStatus = plainToClass(CreateRoomDto, { ...mockRoomDto, status: 'InvalidStatus' as RoomStatus });
      await expect(validateOrReject(invalidStatus))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'status',
          constraints: expect.objectContaining({
            isEnum: 'Invalid room status'
          })
        }));
    });
  });

  describe('getRoomByColor', () => {
    it('should find room by color case-insensitive', async () => {
      await roomService.createRoom(mockRoomDto);
      
      const lowerCase = await roomService.getRoomByColor('yellow');
      expect(lowerCase).toBeDefined();
      expect(lowerCase?.color).toBe(mockRoomDto.color);
      
      const upperCase = await roomService.getRoomByColor('YELLOW');
      expect(upperCase).toBeDefined();
      expect(upperCase?.color).toBe(mockRoomDto.color);
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
      const room = await roomService.createRoom(mockRoomDto);
      const statusDto: UpdateRoomStatusDto = { status: RoomStatus.Full };
      const updated = await roomService.updateRoomStatus(room._id.toString(), statusDto.status);
      
      expect(updated).toBeDefined();
      expect(updated?.status).toBe(RoomStatus.Full);
      expect(updated?.color).toBe(mockRoomDto.color); // Other properties should remain unchanged
    });

    it('should return null when updating non-existent room', async () => {
      const statusDto: UpdateRoomStatusDto = { status: RoomStatus.Full };
      const updated = await roomService.updateRoomStatus(
        new mongoose.Types.ObjectId().toString(),
        statusDto.status
      );
      expect(updated).toBeNull();
    });

    it('should not update status to invalid value', async () => {
      const statusDto = plainToClass(UpdateRoomStatusDto, { status: 'InvalidStatus' as RoomStatus });
      await expect(validateOrReject(statusDto))
        .rejects
        .toContainEqual(expect.objectContaining({
          property: 'status',
          constraints: expect.objectContaining({
            isEnum: 'Invalid room status'
          })
        }));
    });

    it('should handle updating status to same value', async () => {
      const room = await roomService.createRoom(mockRoomDto);
      const statusDto: UpdateRoomStatusDto = { status: mockRoomDto.status };
      const updated = await roomService.updateRoomStatus(
        room._id.toString(),
        statusDto.status
      );
      expect(updated).toBeDefined();
      expect(updated?.status).toBe(mockRoomDto.status);
    });
  });
});
