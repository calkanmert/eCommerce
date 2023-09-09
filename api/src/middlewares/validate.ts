import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export default (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const messages = error.details.map((detail) => detail.message);
    res.status(422).json({
      status: 'validation-error',
      messages,
    });
    return;
  }
  next();
};
