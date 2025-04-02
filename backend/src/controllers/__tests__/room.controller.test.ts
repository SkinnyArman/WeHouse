import { Request, Response } from 'express';
import { RoomController } from '../room.controller';
import { RoomService } from '../../services/room.service';
import { RoomStatus, RoomType } from '../../types/room.types';
import mongoose from 'mongoose';

jest.mock('../../services/room.service');

describe('RoomController', () => {
  let roomController: RoomController;
  let mockRoomService: jest.Mocked<RoomService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
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
    mockRoomService = new RoomService() as jest.Mocked<RoomService>;
    roomController = new RoomController();
    (roomController as any).roomService = mockRoomService;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createRoom', () => {
    it('should create room successfully', async () => {
      mockRequest = {
        body: {
          color: 'Yellow',
          capacity: 3,
          type: RoomType.Private,
          twoPersonBeds: 1,
          onePersonBeds: 1,
          rentPrice: 2100,
          status: RoomStatus.ReadyForReservation
        }
      };

      mockRoomService.createRoom.mockResolvedValue(mockRoom);

      await roomController.createRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 201,
        message: 'Room created successfully',
        data: mockRoom
      });
    });

    it('should handle creation error', async () => {
      mockRequest = {
        body: {
          color: 'Yellow',
          capacity: 3,
          type: RoomType.Private,
          twoPersonBeds: 1,
          onePersonBeds: 1,
          rentPrice: 2100,
          status: RoomStatus.ReadyForReservation
        }
      };

      mockRoomService.createRoom.mockRejectedValue(new Error('Creation failed'));

      await roomController.createRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 400,
        message: 'Failed to create room'
      });
    });
  });

  describe('getAllRooms', () => {
    it('should return all rooms', async () => {
      const mockRooms = [mockRoom];
      mockRoomService.getAllRooms.mockResolvedValue(mockRooms);

      await roomController.getAllRooms(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 200,
        message: 'Rooms retrieved successfully',
        data: mockRooms
      });
    });

    it('should handle fetch error', async () => {
      mockRoomService.getAllRooms.mockRejectedValue(new Error('Fetch failed'));

      await roomController.getAllRooms(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 500,
        message: 'Failed to fetch rooms'
      });
    });
  });

  describe('getRoomById', () => {
    it('should return room by id', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() }
      };

      mockRoomService.getRoomById.mockResolvedValue(mockRoom);

      await roomController.getRoomById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 200,
        message: 'Room retrieved successfully',
        data: mockRoom
      });
    });

    it('should handle room not found', async () => {
      mockRequest = {
        params: { id: 'nonexistent-id' }
      };

      mockRoomService.getRoomById.mockResolvedValue(null);

      await roomController.getRoomById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 404,
        message: 'Room not found'
      });
    });

    it('should handle fetch error', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() }
      };

      mockRoomService.getRoomById.mockRejectedValue(new Error('Fetch failed'));

      await roomController.getRoomById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 500,
        message: 'Failed to fetch room'
      });
    });
  });

  describe('getRoomByColor', () => {
    it('should return room by color', async () => {
      mockRequest = {
        params: { color: 'Yellow' }
      };

      mockRoomService.getRoomByColor.mockResolvedValue(mockRoom);

      await roomController.getRoomByColor(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 200,
        message: 'Room retrieved successfully',
        data: mockRoom
      });
    });

    it('should handle room not found', async () => {
      mockRequest = {
        params: { color: 'nonexistent-color' }
      };

      mockRoomService.getRoomByColor.mockResolvedValue(null);

      await roomController.getRoomByColor(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 404,
        message: 'Room not found'
      });
    });

    it('should handle fetch error', async () => {
      mockRequest = {
        params: { color: 'Yellow' }
      };

      mockRoomService.getRoomByColor.mockRejectedValue(new Error('Fetch failed'));

      await roomController.getRoomByColor(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 500,
        message: 'Failed to fetch room'
      });
    });
  });

  describe('updateRoom', () => {
    it('should update room successfully', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() },
        body: { color: 'Blue' }
      };

      const updatedRoom = { ...mockRoom, color: 'Blue' };
      mockRoomService.updateRoom.mockResolvedValue(updatedRoom);

      await roomController.updateRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 200,
        message: 'Room updated successfully',
        data: updatedRoom
      });
    });

    it('should handle room not found', async () => {
      mockRequest = {
        params: { id: 'nonexistent-id' },
        body: { color: 'Blue' }
      };

      mockRoomService.updateRoom.mockResolvedValue(null);

      await roomController.updateRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 404,
        message: 'Room not found'
      });
    });

    it('should handle update error', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() },
        body: { color: 'Blue' }
      };

      mockRoomService.updateRoom.mockRejectedValue(new Error('Update failed'));

      await roomController.updateRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 400,
        message: 'Failed to update room'
      });
    });
  });

  describe('deleteRoom', () => {
    it('should delete room successfully', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() }
      };

      mockRoomService.deleteRoom.mockResolvedValue(true);

      await roomController.deleteRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 204,
        message: 'Room deleted successfully'
      });
    });

    it('should handle room not found', async () => {
      mockRequest = {
        params: { id: 'nonexistent-id' }
      };

      mockRoomService.deleteRoom.mockResolvedValue(false);

      await roomController.deleteRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 404,
        message: 'Room not found'
      });
    });

    it('should handle delete error', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() }
      };

      mockRoomService.deleteRoom.mockRejectedValue(new Error('Delete failed'));

      await roomController.deleteRoom(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 500,
        message: 'Failed to delete room'
      });
    });
  });

  describe('updateRoomStatus', () => {
    it('should update room status successfully', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() },
        body: { status: RoomStatus.Full }
      };

      const updatedRoom = { ...mockRoom, status: RoomStatus.Full };
      mockRoomService.updateRoomStatus.mockResolvedValue(updatedRoom);

      await roomController.updateRoomStatus(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 200,
        message: 'Room status updated successfully',
        data: updatedRoom
      });
    });

    it('should handle room not found', async () => {
      mockRequest = {
        params: { id: 'nonexistent-id' },
        body: { status: RoomStatus.Full }
      };

      mockRoomService.updateRoomStatus.mockResolvedValue(null);

      await roomController.updateRoomStatus(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 404,
        message: 'Room not found'
      });
    });

    it('should handle status update error', async () => {
      mockRequest = {
        params: { id: mockRoom._id.toString() },
        body: { status: RoomStatus.Full }
      };

      mockRoomService.updateRoomStatus.mockRejectedValue(new Error('Status update failed'));

      await roomController.updateRoomStatus(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 400,
        message: 'Failed to update room status'
      });
    });
  });
}); 