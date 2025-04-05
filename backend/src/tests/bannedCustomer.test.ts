import mongoose from 'mongoose';
import { BannedCustomerService } from '../services/bannedCustomer.service';
import { CreateBannedCustomerDto } from '../dtos/bannedCustomer.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { MongoIdDto } from '../dtos/id.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('Banned Customer Service', () => {
  let bannedCustomerService: BannedCustomerService;
  const mockBannedCustomer = {
    customerId: 'customer123',
    reason: 'This is a valid reason that is more than 10 characters long'
  };

  beforeAll(async () => {
    const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/test';
    await mongoose.connect(MONGODB_TEST_URI);
    console.log('Connected to MongoDB test database');
  }, 60000);

  beforeEach(async () => {
    if (!mongoose.connection.db) {
      throw new Error('Database connection not established');
    }
    await mongoose.connection.db.dropDatabase();
    bannedCustomerService = new BannedCustomerService();
    console.log('Test database cleaned up');
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  });

  describe('createBannedCustomer', () => {
    it('should create a banned customer successfully', async () => {
      const customerData = plainToClass(CreateBannedCustomerDto, mockBannedCustomer);
      await validateOrReject(customerData);
      
      const result = await bannedCustomerService.createBannedCustomer(customerData);
      expect(result).toBeDefined();
      expect(result.customerId).toBe(mockBannedCustomer.customerId);
      expect(result.reason).toBe(mockBannedCustomer.reason);
    }, 60000);
  });

  describe('getBannedCustomers', () => {
    beforeEach(async () => {
      // Create 15 test banned customers
      const promises = Array.from({ length: 15 }, (_, i) => {
        const customerData = plainToClass(CreateBannedCustomerDto, {
          customerId: `customer${i + 1}`,
          reason: `This is a valid reason for customer ${i + 1} that is more than 10 characters long`
        });
        return bannedCustomerService.createBannedCustomer(customerData);
      });
      await Promise.all(promises);
    });

    it('should return paginated banned customers', async () => {
      const paginationData = plainToClass(PaginationDto, { page: 1, limit: 10 });
      await validateOrReject(paginationData);
      
      const result = await bannedCustomerService.getBannedCustomers(paginationData.page, paginationData.limit);
      expect(result.customers).toHaveLength(10);
      expect(result.total).toBe(15);
      expect(result.totalPages).toBe(2);
    }, 60000);

    it('should handle invalid page number', async () => {
      const paginationData = plainToClass(PaginationDto, { page: -1, limit: 10 });
      await expect(validateOrReject(paginationData)).rejects.toBeDefined();
    }, 60000);

    it('should handle invalid limit', async () => {
      const paginationData = plainToClass(PaginationDto, { page: 1, limit: -1 });
      await expect(validateOrReject(paginationData)).rejects.toBeDefined();
    }, 60000);
  });

  describe('deleteBannedCustomer', () => {
    let createdCustomerId: string;

    beforeEach(async () => {
      const customerData = plainToClass(CreateBannedCustomerDto, mockBannedCustomer);
      const customer = await bannedCustomerService.createBannedCustomer(customerData);
      createdCustomerId = customer._id.toString();
    });

    it('should delete a banned customer successfully', async () => {
      const params = plainToClass(MongoIdDto, { id: createdCustomerId });
      await validateOrReject(params);
      
      const result = await bannedCustomerService.deleteBannedCustomer(params.id);
      expect(result).toBe(true);
    }, 60000);

    it('should handle invalid ID format', async () => {
      const params = plainToClass(MongoIdDto, { id: 'invalid-id' });
      await expect(validateOrReject(params)).rejects.toBeDefined();
    }, 60000);

    it('should handle empty ID', async () => {
      const params = plainToClass(MongoIdDto, { id: '' });
      await expect(validateOrReject(params)).rejects.toBeDefined();
    }, 60000);

    it('should return false when customer not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const params = plainToClass(MongoIdDto, { id: nonExistentId });
      await validateOrReject(params);
      
      const result = await bannedCustomerService.deleteBannedCustomer(params.id);
      expect(result).toBe(false);
    }, 60000);
  });
}); 