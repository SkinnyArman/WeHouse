import { Request, Response } from 'express';
import { BannedCustomerService } from '../services/bannedCustomer.service';
import { CreateBannedCustomerDto } from '../dtos/bannedCustomer.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { MongoIdDto } from '../dtos/id.dto';
import { ResponseUtil } from '../utils/response.util';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class BannedCustomerController {
  private bannedCustomerService: BannedCustomerService;

  constructor() {
    this.bannedCustomerService = new BannedCustomerService();
  }

  async createBannedCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customerData = plainToClass(CreateBannedCustomerDto, req.body);
      await validateOrReject(customerData);
      
      const customer = await this.bannedCustomerService.createBannedCustomer(customerData);
      ResponseUtil.success(res, customer, 'Customer banned successfully', 201);
    } catch (error) {
      ResponseUtil.error(res, 'Failed to ban customer', 400);
    }
  }

  async getBannedCustomers(req: Request, res: Response): Promise<void> {
    try {
      const paginationData = plainToClass(PaginationDto, req.query);
      await validateOrReject(paginationData);
      
      const result = await this.bannedCustomerService.getBannedCustomers(
        paginationData.page,
        paginationData.limit
      );
      ResponseUtil.success(res, result, 'Banned customers retrieved successfully', 200);
    } catch (error) {
      ResponseUtil.error(res, 'Failed to fetch banned customers', 500);
    }
  }

  async deleteBannedCustomer(req: Request, res: Response): Promise<void> {
    try {
      const params = plainToClass(MongoIdDto, req.params);
      await validateOrReject(params);

      const success = await this.bannedCustomerService.deleteBannedCustomer(params.id);
      if (!success) {
        ResponseUtil.error(res, 'Ban record not found', 404);
        return;
      }
      res.status(204).send();
    } catch (error) {
      ResponseUtil.error(res, 'Failed to remove ban record', 500);
    }
  }
} 