import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';

type RequestWithUser = Request & {
  user?: { id: string };
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authorization = request.header('Authorization');

    if (!authorization) {
      throw new UnauthorizedException('Access denied');
    }

    const token = authorization.startsWith('Bearer ')
      ? authorization.slice(7).trim()
      : authorization;

    try {
      const payload = verify(
        token,
        this.configService.getOrThrow<string>('JWT_SECRET'),
      ) as { id: string };

      request.user = { id: payload.id };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid auth token');
    }
  }
}
