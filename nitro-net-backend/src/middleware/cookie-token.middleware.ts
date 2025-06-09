// src/common/middleware/cookie-token.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    if (token && !req.headers.authorization) {
      req.headers.authorization = `Bearer ${token}`;
    }

    next();
  }
}
