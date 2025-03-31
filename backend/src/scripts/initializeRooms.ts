import { connectDB } from '../config/database';
import { Room } from '../models/Room';
import { IRoom, RoomStatus, RoomType } from '../types/room.types';

const rooms: Omit<IRoom, 'createdAt' | 'updatedAt'>[] = [
  {
    color: 'Yellow',
    capacity: 3,
    type: RoomType.Private,
    twoPersonBeds: 1,
    onePersonBeds: 1,
    rentPrice: 2100,
    status: RoomStatus.ReadyForReservation
  },
  {
    color: 'Blue',
    capacity: 2,
    type: RoomType.Private,
    twoPersonBeds: 0,
    onePersonBeds: 2,
    rentPrice: 1400,
    status: RoomStatus.ReadyForReservation
  },
  {
    color: 'Purple',
    capacity: 2,
    type: RoomType.Private,
    twoPersonBeds: 0,
    onePersonBeds: 2,
    rentPrice: 1200,
    status: RoomStatus.ReadyForReservation
  },
  {
    color: 'Green',
    capacity: 2,
    type: RoomType.Private,
    twoPersonBeds: 1,
    onePersonBeds: 0,
    rentPrice: 1800,
    status: RoomStatus.ReadyForReservation
  },
  {
    color: 'Red',
    capacity: 2,
    type: RoomType.Private,
    twoPersonBeds: 1,
    onePersonBeds: 0,
    rentPrice: 1600,
    status: RoomStatus.ReadyForReservation
  },
  {
    color: 'Orange',
    capacity: 4,
    type: RoomType.Shared,
    twoPersonBeds: 0,
    onePersonBeds: 4,
    rentPrice: 400,
    status: RoomStatus.ReadyForReservation
  }
];

async function initializeRooms() {
  try {
    await connectDB();
    console.log('Starting room initialization...');
    
    for (const roomData of rooms) {
      try {
        const existingRoom = await Room.findOne({ color: roomData.color });
        
        if (existingRoom) {
          console.log(`${roomData.color} room already exists, skipping...`);
          continue;
        }

        const room = new Room(roomData);
        await room.save();
        console.log(`Successfully created ${roomData.color} room`);
      } catch (error) {
        console.error(`Failed to create ${roomData.color} room`);
      }
    }

    console.log('Room initialization completed!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize rooms');
    process.exit(1);
  }
}

initializeRooms(); 