import { BannedCustomer } from '../models/BannedCustomer';
import { IBannedCustomer, ICreateBannedCustomer } from '../types/bannedCustomer.types';
import { Types } from 'mongoose';

export class BannedCustomerService {
  async createBannedCustomer(customerData: ICreateBannedCustomer): Promise<IBannedCustomer> {
    const customer = new BannedCustomer(customerData);
    return await customer.save();
  }

  async getBannedCustomers(page: number = 1, limit: number = 10): Promise<{
    customers: IBannedCustomer[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const [customers, total] = await Promise.all([
      BannedCustomer.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      BannedCustomer.countDocuments()
    ]);

    return {
      customers,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  async deleteBannedCustomer(id: Types.ObjectId): Promise<boolean> {
    const result = await BannedCustomer.findByIdAndDelete(id);
    return result !== null;
  }
} 