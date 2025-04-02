import { Request, Response } from 'express';
import { BannedCustomerService } from '../services/bannedCustomer.service';
import { CreateBannedCustomerDto, UpdateBannedCustomerDto } from '../dtos/bannedCustomer.dto';

export class BannedCustomerController {
  private bannedCustomerService: BannedCustomerService;

  constructor() {
    this.bannedCustomerService = new BannedCustomerService();
  }

  async createBannedCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customerData = req.body as CreateBannedCustomerDto;
      const customer = await this.bannedCustomerService.createBannedCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create banned customer record' });
    }
  }

  async getBannedCustomers(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.bannedCustomerService.getBannedCustomers(page, limit);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch banned customers' });
    }
  }

  async getBannedCustomerById(req: Request, res: Response): Promise<void> {
    try {
      const customer = await this.bannedCustomerService.getBannedCustomerById(req.params.id);
      if (!customer) {
        res.status(404).json({ error: 'Banned customer record not found' });
        return;
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch banned customer' });
    }
  }

  async updateBannedCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customerData = req.body as UpdateBannedCustomerDto;
      const customer = await this.bannedCustomerService.updateBannedCustomer(req.params.id, customerData);
      if (!customer) {
        res.status(404).json({ error: 'Banned customer record not found' });
        return;
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update banned customer record' });
    }
  }

  async deleteBannedCustomer(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.bannedCustomerService.deleteBannedCustomer(req.params.id);
      if (!success) {
        res.status(404).json({ error: 'Banned customer record not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete banned customer record' });
    }
  }
} 