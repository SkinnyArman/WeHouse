import { Router } from 'express';
import { BannedCustomerController } from '../controllers/bannedCustomer.controller';

const router = Router();
const bannedCustomerController = new BannedCustomerController();

router.post('/', bannedCustomerController.createBannedCustomer.bind(bannedCustomerController));
router.get('/', bannedCustomerController.getBannedCustomers.bind(bannedCustomerController));
router.delete('/:id', bannedCustomerController.deleteBannedCustomer.bind(bannedCustomerController));

export default router; 