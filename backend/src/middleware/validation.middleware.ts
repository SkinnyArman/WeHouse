import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validateDto = (dtoClass: any): ((req: Request, res: Response, next: NextFunction) => Promise<void | Response>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const validationErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));
      
      return res.status(400).json({
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    req.body = dtoObject;
    return next();
  };
}; 