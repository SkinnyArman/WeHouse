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
 *         bannedUntil:
 *           type: string
 *           format: date-time
 *           description: Ban expiration date
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
 *             $ref: '#/components/schemas/BannedCustomer'
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
 *     responses:
 *       200:
 *         description: List of banned customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BannedCustomerResponse'
 */

/**
 * @swagger
 * /api/banned-customers/{id}:
 *   patch:
 *     summary: Update ban record
 *     tags: [Banned Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ban record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BannedCustomer'
 *     responses:
 *       200:
 *         description: Ban record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannedCustomerResponse'
 *       404:
 *         description: Ban record not found
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