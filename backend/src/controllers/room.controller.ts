import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import { CreateRoomDto, UpdateRoomDto } from '../dtos/room.dto';
import { RoomStatus } from '../types/room.types';
import { ResponseUtil } from '../utils/response.util';

export class RoomController {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  async createRoom(req: Request, res: Response): Promise<void> {
    try {
      const roomData = req.body as CreateRoomDto;
      const room = await this.roomService.createRoom(roomData);
      ResponseUtil.success(res, room, 'Room created successfully', 201);
    } catch (error) {
      ResponseUtil.error(res, 'Failed to create room', 400);
    }
  }

  async getAllRooms(_req: Request, res: Response): Promise<void> {
    try {
      const rooms = await this.roomService.getAllRooms();
      ResponseUtil.success(res, rooms, 'Rooms retrieved successfully');
    } catch (error) {
      ResponseUtil.error(res, 'Failed to fetch rooms');
    }
  }

  async getRoomById(req: Request, res: Response): Promise<void> {
    try {
      const room = await this.roomService.getRoomById(req.params.id);
      if (!room) {
        ResponseUtil.error(res, 'Room not found', 404);
        return;
      }
      ResponseUtil.success(res, room, 'Room retrieved successfully');
    } catch (error) {
      ResponseUtil.error(res, 'Failed to fetch room');
    }
  }

  async getRoomByColor(req: Request, res: Response): Promise<void> {
    try {
      const room = await this.roomService.getRoomByColor(req.params.color);
      if (!room) {
        ResponseUtil.error(res, 'Room not found', 404);
        return;
      }
      ResponseUtil.success(res, room, 'Room retrieved successfully');
    } catch (error) {
      ResponseUtil.error(res, 'Failed to fetch room');
    }
  }

  async updateRoom(req: Request, res: Response): Promise<void> {
    try {
      const roomData = req.body as UpdateRoomDto;
      const room = await this.roomService.updateRoom(req.params.id, roomData);
      if (!room) {
        ResponseUtil.error(res, 'Room not found', 404);
        return;
      }
      ResponseUtil.success(res, room, 'Room updated successfully');
    } catch (error) {
      ResponseUtil.error(res, 'Failed to update room', 400);
    }
  }

  async deleteRoom(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.roomService.deleteRoom(req.params.id);
      if (!success) {
        ResponseUtil.error(res, 'Room not found', 404);
        return;
      }
      ResponseUtil.success(res, undefined, 'Room deleted successfully', 204);
    } catch (error) {
      ResponseUtil.error(res, 'Failed to delete room');
    }
  }

  async updateRoomStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body as { status: RoomStatus };
      const room = await this.roomService.updateRoomStatus(req.params.id, status);
      if (!room) {
        ResponseUtil.error(res, 'Room not found', 404);
        return;
      }
      ResponseUtil.success(res, room, 'Room status updated successfully');
    } catch (error) {
      ResponseUtil.error(res, 'Failed to update room status', 400);
    }
  }
} 