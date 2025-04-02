import { RoomService } from '../room.service';
import { Room } from '../../models/Room';
import { RoomStatus, RoomType } from '../../types/room.types';
import mongoose from 'mongoose';

jest.mock('../../models/Room');

describe('RoomService', () => {
  let roomService: RoomService;
  const mockRoom = {
    _id: new mongoose.Types.ObjectId(),
    color: 'Yellow',
    capacity: 3,
    type: RoomType.Private,
    twoPersonBeds: 1,
    onePersonBeds: 1,
    rentPrice: 2100,
    status: RoomStatus.ReadyForReservation,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    roomService = new RoomService();
    jest.clearAllMocks();
  });

  describe('createRoom', () => {
    it('should create a new room successfully', async () => {
      const roomData = {
        color: 'Yellow',
        capacity: 3,
        type: RoomType.Private,
        twoPersonBeds: 1,
        onePersonBeds: 1,
        rentPrice: 2100,
        status: RoomStatus.ReadyForReservation
      };

      (Room.prototype.save as jest.Mock).mockResolvedValue(mockRoom);

      const result = await roomService.createRoom(roomData);

      expect(Room.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockRoom);
    });

    it('should throw error when room creation fails', async () => {
      const roomData = {
        color: 'Yellow',
        capacity: 3,
        type: RoomType.Private,
        twoPersonBeds: 1,
        onePersonBeds: 1,
        rentPrice: 2100,
        status: RoomStatus.ReadyForReservation
      };

      (Room.prototype.save as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(roomService.createRoom(roomData)).rejects.toThrow('Database error');
    });
  });

  describe('getAllRooms', () => {
    it('should return all rooms sorted by color', async () => {
      const mockRooms = [mockRoom, { ...mockRoom, color: 'Blue' }];
      (Room.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockRooms)
      });

      const result = await roomService.getAllRooms();

      expect(Room.find).toHaveBeenCalled();
      expect(result).toEqual(mockRooms);
    });

    it('should throw error when fetching rooms fails', async () => {
      (Room.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      await expect(roomService.getAllRooms()).rejects.toThrow('Database error');
    });
  });

  describe('getRoomById', () => {
    it('should return room by id', async () => {
      (Room.findById as jest.Mock).mockResolvedValue(mockRoom);

      const result = await roomService.getRoomById(mockRoom._id.toString());

      expect(Room.findById).toHaveBeenCalledWith(mockRoom._id.toString());
      expect(result).toEqual(mockRoom);
    });

    it('should return null when room not found', async () => {
      (Room.findById as jest.Mock).mockResolvedValue(null);

      const result = await roomService.getRoomById('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  describe('getRoomByColor', () => {
    it('should return room by color', async () => {
      (Room.findOne as jest.Mock).mockResolvedValue(mockRoom);

      const result = await roomService.getRoomByColor('Yellow');

      expect(Room.findOne).toHaveBeenCalledWith({
        color: { $regex: new RegExp('^Yellow$', 'i') }
      });
      expect(result).toEqual(mockRoom);
    });

    it('should return null when room not found', async () => {
      (Room.findOne as jest.Mock).mockResolvedValue(null);

      const result = await roomService.getRoomByColor('nonexistent-color');

      expect(result).toBeNull();
    });
  });

  describe('updateRoom', () => {
    it('should update room successfully', async () => {
      const updateData = { color: 'Blue' };
      const updatedRoom = { ...mockRoom, ...updateData };
      
      (Room.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedRoom);

      const result = await roomService.updateRoom(mockRoom._id.toString(), updateData);

      expect(Room.findByIdAndUpdate).toHaveBeenCalledWith(
        mockRoom._id.toString(),
        updateData,
        { new: true }
      );
      expect(result).toEqual(updatedRoom);
    });

    it('should return null when room not found', async () => {
      (Room.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await roomService.updateRoom('nonexistent-id', { color: 'Blue' });

      expect(result).toBeNull();
    });
  });

  describe('deleteRoom', () => {
    it('should delete room successfully', async () => {
      (Room.findByIdAndDelete as jest.Mock).mockResolvedValue(mockRoom);

      const result = await roomService.deleteRoom(mockRoom._id.toString());

      expect(Room.findByIdAndDelete).toHaveBeenCalledWith(mockRoom._id.toString());
      expect(result).toBe(true);
    });

    it('should return false when room not found', async () => {
      (Room.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await roomService.deleteRoom('nonexistent-id');

      expect(result).toBe(false);
    });
  });

  describe('updateRoomStatus', () => {
    it('should update room status successfully', async () => {
      const newStatus = RoomStatus.Full;
      const updatedRoom = { ...mockRoom, status: newStatus };
      
      (Room.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedRoom);

      const result = await roomService.updateRoomStatus(mockRoom._id.toString(), newStatus);

      expect(Room.findByIdAndUpdate).toHaveBeenCalledWith(
        mockRoom._id.toString(),
        { status: newStatus },
        { new: true }
      );
      expect(result).toEqual(updatedRoom);
    });

    it('should return null when room not found', async () => {
      (Room.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await roomService.updateRoomStatus('nonexistent-id', RoomStatus.Full);

      expect(result).toBeNull();
    });
  });
}); 