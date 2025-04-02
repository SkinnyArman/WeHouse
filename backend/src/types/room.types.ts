import { Types } from 'mongoose';

export enum RoomStatus {
  Full = 'Full',
  PartiallyFull = 'PartiallyFull',
  ReadyForReservation = 'ReadyForReservation'
}

export enum RoomType {
  Shared = 'Shared',
  Private = 'Private'
}

export interface IRoom {
  _id: Types.ObjectId;
  color: string;
  capacity: number;
  type: RoomType;
  twoPersonBeds: number;
  onePersonBeds: number;
  rentPrice: number;
  status: RoomStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRoom {
  color: string;
  capacity: number;
  type: RoomType;
  twoPersonBeds: number;
  onePersonBeds: number;
  rentPrice: number;
  status: RoomStatus;
} 