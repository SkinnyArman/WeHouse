import { Response } from 'express';

export type ResponseStatus = 'Success' | 'Error';

interface ApiResponse<T = any> {
  status: ResponseStatus;
  statusCode: number;
  message: string;
  data?: T;
}

export class ResponseUtil {
  static success<T>(res: Response, data?: T, message: string = 'Operation successful', statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      status: 'Success',
      statusCode,
      message,
      data
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, message: string = 'Operation failed', statusCode: number = 500): void {
    const response: ApiResponse = {
      status: 'Error',
      statusCode,
      message
    };
    res.status(statusCode).json(response);
  }
} 