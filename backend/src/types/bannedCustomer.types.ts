import { Types } from 'mongoose';

export interface IBannedCustomer {
  _id: Types.ObjectId;
  customerId: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBannedCustomer {
  customerId: string;
  reason: string;
} 