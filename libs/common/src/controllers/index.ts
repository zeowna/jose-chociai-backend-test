import { Request } from 'express';

export interface DecodedJwt {
  sub: string;
  username: string;
  companyId: string;
  exp?: number;
}

export interface CustomRequest extends Request {
  user: DecodedJwt;
  correlationId: string;
}
