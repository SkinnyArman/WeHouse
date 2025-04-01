import mongoose, { Schema } from 'mongoose';
import { IBannedCustomer } from '../types/bannedCustomer.types';

const bannedCustomerSchema = new Schema<IBannedCustomer>(
  {
    customerName: { type: String, required: true },
    cancellationReason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

export const BannedCustomer = mongoose.model<IBannedCustomer>('BannedCustomer', bannedCustomerSchema); 