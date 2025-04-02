import { RoomStatus, RoomType } from '../types/room.types';
import { IsString, IsNumber, IsEnum, Min, IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty({ message: 'Color is required' })
  color: string;

  @IsNumber()
  @Min(1, { message: 'Capacity must be greater than 0' })
  capacity: number;

  @IsEnum(RoomType, { message: 'Invalid room type' })
  type: RoomType;

  @IsNumber()
  @Min(0, { message: 'Two person beds count must be non-negative' })
  twoPersonBeds: number;

  @IsNumber()
  @Min(0, { message: 'One person beds count must be non-negative' })
  onePersonBeds: number;

  @IsNumber()
  @Min(0, { message: 'Rent price must be non-negative' })
  rentPrice: number;

  @IsEnum(RoomStatus, { message: 'Invalid room status' })
  status: RoomStatus;
}

export class UpdateRoomStatusDto {
  @IsEnum(RoomStatus, { message: 'Invalid room status' })
  status: RoomStatus;
}

export class UpdateRoomDto {
  @IsString()
  @IsNotEmpty({ message: 'Color is required' })
  color?: string;

  @IsNumber()
  @Min(1, { message: 'Capacity must be greater than 0' })
  capacity?: number;

  @IsEnum(RoomType, { message: 'Invalid room type' })
  type?: RoomType;

  @IsNumber()
  @Min(0, { message: 'Two person beds count must be non-negative' })
  twoPersonBeds?: number;

  @IsNumber()
  @Min(0, { message: 'One person beds count must be non-negative' })
  onePersonBeds?: number;

  @IsNumber()
  @Min(0, { message: 'Rent price must be non-negative' })
  rentPrice?: number;

  @IsEnum(RoomStatus, { message: 'Invalid room status' })
  status?: RoomStatus;
} 