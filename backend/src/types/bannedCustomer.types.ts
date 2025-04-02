import { Types } from 'mongoose';

export interface IBannedCustomer {
  _id: Types.ObjectId;
  customerName: string;
  cancellationReason: string;
  createdAt: Date;
}

export interface ICreateBannedCustomer {
  customerName: string;
  cancellationReason: string;
} 