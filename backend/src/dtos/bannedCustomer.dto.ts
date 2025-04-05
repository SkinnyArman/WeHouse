import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBannedCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Customer ID is required' })
  customerId: string;

  @IsString()
  @IsNotEmpty({ message: 'Reason is required' })
  @MinLength(10, { message: 'Reason must be at least 10 characters long' })
  reason: string;
} 