import mongoose, { Schema } from 'mongoose';
import { IRoom, RoomStatus, RoomType } from '../types/room.types';

const roomSchema = new Schema<IRoom>(
  {
    color: { 
      type: String, 
      required: [true, 'color is required'], 
      unique: true,
      trim: true,
      minlength: [1, 'color cannot be empty']
    },
    capacity: { 
      type: Number, 
      required: [true, 'capacity is required'],
      min: [1, 'capacity must be greater than 0']
    },
    type: { 
      type: String, 
      enum: {
        values: Object.values(RoomType),
        message: 'invalid room type'
      }, 
      required: [true, 'room type is required']
    },
    twoPersonBeds: { 
      type: Number, 
      required: [true, 'two person beds count is required'],
      min: [0, 'bed counts must be non-negative'],
      default: 0 
    },
    onePersonBeds: { 
      type: Number, 
      required: [true, 'one person beds count is required'],
      min: [0, 'bed counts must be non-negative'],
      default: 0 
    },
    rentPrice: { 
      type: Number, 
      required: [true, 'rent price is required'],
      min: [0, 'rent price must be non-negative']
    },
    status: { 
      type: String, 
      enum: {
        values: Object.values(RoomStatus),
        message: 'invalid status'
      }, 
      required: [true, 'status is required'],
      default: RoomStatus.ReadyForReservation 
    }
  },
  {
    timestamps: true
  }
);

export const Room = mongoose.model<IRoom>('Room', roomSchema); 