import mongoose, { Schema } from 'mongoose';
import { IRoom, RoomStatus, RoomType } from '../types/room.types';

const roomSchema = new Schema<IRoom>(
  {
    color: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    type: { type: String, enum: Object.values(RoomType), required: true },
    twoPersonBeds: { type: Number, required: true, default: 0 },
    onePersonBeds: { type: Number, required: true, default: 0 },
    rentPrice: { type: Number, required: true },
    status: { type: String, enum: Object.values(RoomStatus), required: true, default: RoomStatus.ReadyForReservation }
  },
  {
    timestamps: true
  }
);

export const Room = mongoose.model<IRoom>('Room', roomSchema); 