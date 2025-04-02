import { Room } from '../models/Room';
import { IRoom, ICreateRoom, RoomStatus } from '../types/room.types';

export class RoomService {
  async createRoom(roomData: ICreateRoom): Promise<IRoom> {
    const room = new Room(roomData);
    return await room.save();
  }

  async getAllRooms(): Promise<IRoom[]> {
    return await Room.find().sort({ color: 1 });
  }

  async getRoomById(id: string): Promise<IRoom | null> {
    return await Room.findById(id);
  }

  async getRoomByColor(color: string): Promise<IRoom | null> {
    return await Room.findOne({ color: { $regex: new RegExp(`^${color}$`, 'i') } });
  }

  async updateRoom(id: string, roomData: Partial<IRoom>): Promise<IRoom | null> {
    return await Room.findByIdAndUpdate(id, roomData, { new: true });
  }

  async deleteRoom(id: string): Promise<boolean> {
    const result = await Room.findByIdAndDelete(id);
    return result !== null;
  }

  async updateRoomStatus(id: string, status: RoomStatus): Promise<IRoom | null> {
    return await Room.findByIdAndUpdate(id, { status }, { new: true });
  }
} 