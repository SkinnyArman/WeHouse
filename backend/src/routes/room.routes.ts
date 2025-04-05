import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateRoomDto, UpdateRoomDto, UpdateRoomStatusDto } from '../dtos/room.dto';

const router = Router();
const roomController = new RoomController();

// Create a new room
router.post('/', validateDto(CreateRoomDto), roomController.createRoom.bind(roomController));

// Get a room by color
router.get('/:color', roomController.getRoomByColor.bind(roomController));

// Get a room by ID
router.get('/:id', roomController.getRoomById.bind(roomController));

// Get all rooms
router.get('/', roomController.getAllRooms.bind(roomController));

// Update a room
router.patch('/:id', validateDto(UpdateRoomDto), roomController.updateRoom.bind(roomController));

// Delete a room
router.delete('/:id', roomController.deleteRoom.bind(roomController));

// Update room status
router.patch('/:id/status', validateDto(UpdateRoomStatusDto), roomController.updateRoomStatus.bind(roomController));

export default router; 