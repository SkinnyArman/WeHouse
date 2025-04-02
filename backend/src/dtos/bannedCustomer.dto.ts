import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateBannedCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Customer name is required' })
  @MinLength(2, { message: 'Customer name must be at least 2 characters long' })
  customerName: string;

  @IsString()
  @IsNotEmpty({ message: 'Cancellation reason is required' })
  @MinLength(10, { message: 'Cancellation reason must be at least 10 characters long' })
  cancellationReason: string;
}

export class UpdateBannedCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Customer name is required' })
  @MinLength(2, { message: 'Customer name must be at least 2 characters long' })
  customerName?: string;

  @IsString()
  @IsNotEmpty({ message: 'Cancellation reason is required' })
  @MinLength(10, { message: 'Cancellation reason must be at least 10 characters long' })
  cancellationReason?: string;
} 