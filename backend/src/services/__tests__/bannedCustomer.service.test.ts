import { BannedCustomerService } from '../bannedCustomer.service';
import { BannedCustomer } from '../../models/BannedCustomer';
import mongoose from 'mongoose';

jest.mock('../../models/BannedCustomer');

describe('BannedCustomerService', () => {
  let bannedCustomerService: BannedCustomerService;
  const mockBannedCustomer = {
    _id: new mongoose.Types.ObjectId(),
    customerId: 'customer123',
    reason: 'This is a valid reason that is more than 10 characters long',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    bannedCustomerService = new BannedCustomerService();
    jest.clearAllMocks();
  });

  describe('createBannedCustomer', () => {
    it('should create a new banned customer successfully', async () => {
      const customerData = {
        customerId: 'customer123',
        reason: 'This is a valid reason that is more than 10 characters long'
      };

      (BannedCustomer.prototype.save as jest.Mock).mockResolvedValue(mockBannedCustomer);

      const result = await bannedCustomerService.createBannedCustomer(customerData);

      expect(BannedCustomer.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockBannedCustomer);
    });

    it('should throw error when customer creation fails', async () => {
      const customerData = {
        customerId: 'customer123',
        reason: 'This is a valid reason that is more than 10 characters long'
      };

      (BannedCustomer.prototype.save as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(bannedCustomerService.createBannedCustomer(customerData))
        .rejects
        .toThrow('Database error');
    });
  });

  describe('getBannedCustomers', () => {
    it('should return all banned customers with pagination', async () => {
      const mockCustomers = [mockBannedCustomer, { ...mockBannedCustomer, customerId: 'customer456' }];
      const mockTotal = 2;

      (BannedCustomer.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockCustomers)
          })
        })
      });
      (BannedCustomer.countDocuments as jest.Mock).mockResolvedValue(mockTotal);

      const result = await bannedCustomerService.getBannedCustomers(1, 10);

      expect(result).toEqual({
        customers: mockCustomers,
        total: mockTotal,
        totalPages: 1
      });
    });

    it('should handle database error when fetching customers', async () => {
      (BannedCustomer.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockRejectedValue(new Error('Database error'))
          })
        })
      });

      await expect(bannedCustomerService.getBannedCustomers())
        .rejects
        .toThrow('Database error');
    });
  });

  describe('deleteBannedCustomer', () => {
    it('should delete a banned customer successfully', async () => {
      (BannedCustomer.findByIdAndDelete as jest.Mock).mockResolvedValue(mockBannedCustomer);

      const result = await bannedCustomerService.deleteBannedCustomer(mockBannedCustomer._id.toString());

      expect(BannedCustomer.findByIdAndDelete).toHaveBeenCalledWith(mockBannedCustomer._id.toString());
      expect(result).toBe(true);
    });

    it('should return false when customer not found', async () => {
      (BannedCustomer.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await bannedCustomerService.deleteBannedCustomer('nonexistent-id');

      expect(result).toBe(false);
    });

    it('should handle database error when deleting customer', async () => {
      (BannedCustomer.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(bannedCustomerService.deleteBannedCustomer(mockBannedCustomer._id.toString()))
        .rejects
        .toThrow('Database error');
    });
  });
}); 