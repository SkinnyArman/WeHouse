import { Router } from 'express';
import { BannedCustomerController } from '../controllers/bannedCustomer.controller';
import { validateDto } from '../middleware/validation.middleware';
import { CreateBannedCustomerDto, UpdateBannedCustomerDto } from '../dtos/bannedCustomer.dto';

const router = Router();
const bannedCustomerController = new BannedCustomerController();

router.post('/', validateDto(CreateBannedCustomerDto), bannedCustomerController.createBannedCustomer.bind(bannedCustomerController));
router.get('/', bannedCustomerController.getBannedCustomers.bind(bannedCustomerController));
router.get('/:id', bannedCustomerController.getBannedCustomerById.bind(bannedCustomerController));
router.put('/:id', validateDto(UpdateBannedCustomerDto), bannedCustomerController.updateBannedCustomer.bind(bannedCustomerController));
router.delete('/:id', bannedCustomerController.deleteBannedCustomer.bind(bannedCustomerController));

export default router; 