import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenerateCorrelationIdInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.correlationId = request.headers['x-correlation-id'] ?? uuidv4();

    return next.handle();
  }
}
