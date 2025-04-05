import { Request, Response } from 'express';
import { BannedCustomerController } from '../bannedCustomer.controller';
import { BannedCustomerService } from '../../services/bannedCustomer.service';
import mongoose from 'mongoose';

jest.mock('../../services/bannedCustomer.service');

describe('BannedCustomerController', () => {
  let bannedCustomerController: BannedCustomerController;
  let mockBannedCustomerService: jest.Mocked<BannedCustomerService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockBannedCustomer = {
    _id: new mongoose.Types.ObjectId(),
    customerId: 'customer123',
    reason: 'This is a valid reason that is more than 10 characters long',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    mockBannedCustomerService = new BannedCustomerService() as jest.Mocked<BannedCustomerService>;
    bannedCustomerController = new BannedCustomerController();
    (bannedCustomerController as any).bannedCustomerService = mockBannedCustomerService;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('createBannedCustomer', () => {
    it('should create a banned customer successfully', async () => {
      mockRequest = {
        body: {
          customerId: 'customer123',
          reason: 'This is a valid reason that is more than 10 characters long'
        }
      };

      mockBannedCustomerService.createBannedCustomer.mockResolvedValue(mockBannedCustomer);

      await bannedCustomerController.createBannedCustomer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 201,
        message: 'Customer banned successfully',
        data: mockBannedCustomer
      });
    });

    it('should handle validation error', async () => {
      mockRequest = {
        body: {
          customerId: '',
          reason: 'short'
        }
      };

      await bannedCustomerController.createBannedCustomer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 400,
        message: 'Failed to ban customer'
      });
    });
  });

  describe('getBannedCustomers', () => {
    it('should return all banned customers with pagination', async () => {
      mockRequest = {
        query: {
          page: '1',
          limit: '10'
        }
      };

      const mockResult = {
        customers: [mockBannedCustomer],
        total: 1,
        totalPages: 1
      };

      mockBannedCustomerService.getBannedCustomers.mockResolvedValue(mockResult);

      await bannedCustomerController.getBannedCustomers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Success',
        statusCode: 200,
        message: 'Banned customers retrieved successfully',
        data: mockResult
      });
    });

    it('should handle validation error', async () => {
      mockRequest = {
        query: {
          page: '-1',
          limit: '-10'
        }
      };

      await bannedCustomerController.getBannedCustomers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 500,
        message: 'Failed to fetch banned customers'
      });
    });
  });

  describe('deleteBannedCustomer', () => {
    it('should delete a banned customer successfully', async () => {
      mockRequest = {
        params: { id: mockBannedCustomer._id.toString() }
      };

      mockBannedCustomerService.deleteBannedCustomer.mockResolvedValue(true);

      await bannedCustomerController.deleteBannedCustomer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should handle validation error', async () => {
      mockRequest = {
        params: { id: 'invalid-id' }
      };

      await bannedCustomerController.deleteBannedCustomer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 500,
        message: 'Failed to remove ban record'
      });
    });

    it('should handle customer not found', async () => {
      mockRequest = {
        params: { id: new mongoose.Types.ObjectId().toString() }
      };

      mockBannedCustomerService.deleteBannedCustomer.mockResolvedValue(false);

      await bannedCustomerController.deleteBannedCustomer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'Error',
        statusCode: 404,
        message: 'Ban record not found'
      });
    });
  });
}); 