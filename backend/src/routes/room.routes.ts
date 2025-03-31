import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';

const router = Router();
const roomController = new RoomController();

// Room CRUD routes
router.post('/', roomController.createRoom.bind(roomController));
router.get('/:color', roomController.getRoomByColor.bind(roomController));
router.get('/:id', roomController.getRoomById.bind(roomController));
router.get('/', roomController.getAllRooms.bind(roomController));
router.put('/:id', roomController.updateRoom.bind(roomController));
router.delete('/:id', roomController.deleteRoom.bind(roomController));

// Room status update route
router.patch('/:id/status', roomController.updateRoomStatus.bind(roomController));

export default router; 