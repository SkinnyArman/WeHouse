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