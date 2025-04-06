import mongoose, { Schema } from 'mongoose';
import { IBannedCustomer } from '../types/bannedCustomer.types';

const bannedCustomerSchema = new Schema<IBannedCustomer>(
  {
    customerId: { type: String, required: true, unique: true },
    reason: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const BannedCustomer = mongoose.model<IBannedCustomer>('BannedCustomer', bannedCustomerSchema); 