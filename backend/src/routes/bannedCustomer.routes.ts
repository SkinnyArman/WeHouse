import { Router } from 'express';
import { BannedCustomerController } from '../controllers/bannedCustomer.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateBannedCustomerDto } from '../dtos/bannedCustomer.dto';

const router = Router();
const bannedCustomerController = new BannedCustomerController();

// Ban a customer
router.post('/', validateDto(CreateBannedCustomerDto), bannedCustomerController.createBannedCustomer.bind(bannedCustomerController));

// Get ban record by ID
router.get('/:id', bannedCustomerController.getBannedCustomerById.bind(bannedCustomerController));

// Get all banned customers
router.get('/', bannedCustomerController.getBannedCustomers.bind(bannedCustomerController));

// Remove ban record
router.delete('/:id', bannedCustomerController.deleteBannedCustomer.bind(bannedCustomerController));

export default router; 