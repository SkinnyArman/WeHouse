/**
 * @swagger
 * components:
 *   schemas:
 *     RoomResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Room ID
 *         color:
 *           type: string
 *           description: Room color (case-insensitive)
 *         capacity:
 *           type: number
 *           description: Room capacity
 *         type:
 *           type: string
 *           enum: [Private, Shared]
 *           description: Room type
 *         twoPersonBeds:
 *           type: number
 *           description: Number of two-person beds
 *         onePersonBeds:
 *           type: number
 *           description: Number of one-person beds
 *         rentPrice:
 *           type: number
 *           description: Room rent price
 *         status:
 *           type: string
 *           enum: [ReadyForReservation, Reserved, Maintenance, Full]
 *           description: Room status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/rooms/{color}:
 *   get:
 *     summary: Get a room by color
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: color
 *         required: true
 *         schema:
 *           type: string
 *         description: Room color (case-insensitive)
 *     responses:
 *       200:
 *         description: Room found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomResponse'
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   patch:
 *     summary: Update a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Room updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       204:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /api/rooms/{id}/status:
 *   patch:
 *     summary: Update room status
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ReadyForReservation, Reserved, Maintenance, Full]
 *                 description: New room status
 *     responses:
 *       200:
 *         description: Room status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomResponse'
 *       404:
 *         description: Room not found
 */ 