import { Request, Response } from 'express';
import { BannedCustomerService } from '../services/bannedCustomer.service';
import { CreateBannedCustomerDto } from '../dtos/bannedCustomer.dto';
import { ResponseUtil } from '../utils/response.util';

export class BannedCustomerController {
  private bannedCustomerService: BannedCustomerService;

  constructor() {
    this.bannedCustomerService = new BannedCustomerService();
  }

  async createBannedCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customerData = req.body as CreateBannedCustomerDto;
      const customer = await this.bannedCustomerService.createBannedCustomer(customerData);
      ResponseUtil.success(res, customer, 'Banned customer record created successfully', 201);
    } catch (error) {
      ResponseUtil.error(res, 'Failed to create banned customer record', 400);
    }
  }

  async getBannedCustomers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.bannedCustomerService.getBannedCustomers(page, limit);
      ResponseUtil.success(res, result, 'Banned customers retrieved successfully');
    } catch (error) {
      ResponseUtil.error(res, 'Failed to fetch banned customers');
    }
  }

  async deleteBannedCustomer(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.bannedCustomerService.deleteBannedCustomer(req.params.id);
      if (!success) {
        ResponseUtil.error(res, 'Banned customer record not found', 404);
        return;
      }
      ResponseUtil.success(res, undefined, 'Banned customer deleted successfully', 204);
    } catch (error) {
      ResponseUtil.error(res, 'Failed to delete banned customer record');
    }
  }
} 