import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err);

  if (err.message === 'Insufficient credits') {
    return res.status(402).json({ 
      error: 'Insufficient credits',
      message: 'You do not have enough credits to perform this action'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation error',
      message: err.message 
    });
  }

  return res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ 
    error: 'Not found',
    path: req.path 
  });
}
