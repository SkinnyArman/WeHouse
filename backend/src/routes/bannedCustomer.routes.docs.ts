/**
 * @swagger
 * components:
 *   schemas:
 *     BannedCustomerResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Ban record ID
 *         customerId:
 *           type: string
 *           description: Customer ID
 *         reason:
 *           type: string
 *           description: Reason for banning
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
 * /api/banned-customers:
 *   post:
 *     summary: Ban a customer
 *     tags: [Banned Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Customer ID
 *               reason:
 *                 type: string
 *                 description: Reason for banning
 *             required:
 *               - customerId
 *               - reason
 *     responses:
 *       201:
 *         description: Customer banned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannedCustomerResponse'
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/banned-customers/{id}:
 *   get:
 *     summary: Get ban record by ID
 *     tags: [Banned Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ban record ID
 *     responses:
 *       200:
 *         description: Ban record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannedCustomerResponse'
 *       404:
 *         description: Ban record not found
 */

/**
 * @swagger
 * /api/banned-customers:
 *   get:
 *     summary: Get all banned customers
 *     tags: [Banned Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of banned customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BannedCustomerResponse'
 *                 total:
 *                   type: integer
 *                   description: Total number of records
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 */

/**
 * @swagger
 * /api/banned-customers/{id}:
 *   delete:
 *     summary: Remove ban record
 *     tags: [Banned Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ban record ID
 *     responses:
 *       204:
 *         description: Ban record removed successfully
 *       404:
 *         description: Ban record not found
 */ 