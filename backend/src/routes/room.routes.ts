import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateRoomDto, UpdateRoomDto, UpdateRoomStatusDto } from '../dtos/room.dto';

const router = Router();
const roomController = new RoomController();

// Room CRUD routes
router.post('/', validateDto(CreateRoomDto), roomController.createRoom.bind(roomController));
router.get('/:color', roomController.getRoomByColor.bind(roomController));
router.get('/:id', roomController.getRoomById.bind(roomController));
router.get('/', roomController.getAllRooms.bind(roomController));
router.patch('/:id', validateDto(UpdateRoomDto), roomController.updateRoom.bind(roomController));
router.delete('/:id', roomController.deleteRoom.bind(roomController));

// Room status update route
router.patch('/:id/status', validateDto(UpdateRoomStatusDto), roomController.updateRoomStatus.bind(roomController));

export default router; 