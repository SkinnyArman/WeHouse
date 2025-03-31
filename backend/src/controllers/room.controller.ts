import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import { IRoom, RoomStatus } from '../types/room.types';

export class RoomController {
  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  async createRoom(req: Request, res: Response): Promise<void> {
    try {
      const roomData = req.body as Omit<IRoom, 'createdAt' | 'updatedAt'>;
      const room = await this.roomService.createRoom(roomData);
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create room' });
    }
  }

  async getAllRooms(req: Request, res: Response): Promise<void> {
    try {
      const rooms = await this.roomService.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }
  }

  async getRoomById(req: Request, res: Response): Promise<void> {
    try {
      const room = await this.roomService.getRoomById(req.params.id);
      if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch room' });
    }
  }

  async getRoomByColor(req: Request, res: Response): Promise<void> {
    try {
      const room = await this.roomService.getRoomByColor(req.params.color);
      if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch room' });
    }
  }

  async updateRoom(req: Request, res: Response): Promise<void> {
    try {
      const room = await this.roomService.updateRoom(req.params.id, req.body);
      if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update room' });
    }
  }

  async deleteRoom(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.roomService.deleteRoom(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete room' });
    }
  }

  async updateRoomStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.body as { status: RoomStatus };
      const room = await this.roomService.updateRoomStatus(req.params.id, status);
      if (!room) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update room status' });
    }
  }
} 