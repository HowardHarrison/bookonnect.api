import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AppConfigService } from './common/config/config.service';
import basicAuth from 'express-basic-auth';
import { setUpSwagger } from "@swagger/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(AppConfigService);
  const configuredOrigins = new Set(configService.corsOrigins);
  const baseUrlOrigin = (() => {
    try {
      return configService.baseUrl ? new URL(configService.baseUrl).origin : null;
    } catch {
      return null;
    }
  })();

  app.use(helmet());
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: 'cross-origin',
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  const swaggerUsername = configService.swaggerUsername;
  const swaggerPassword = configService.swaggerPassword;

  if (swaggerUsername && swaggerPassword) {
    app.use(
      ["/docs", "/docs-json", "/tools"],
      basicAuth({
        users: {
          [swaggerUsername]: swaggerPassword,
        },
        challenge: true,
      }),
    );

    setUpSwagger(app);
  }
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/',
  });

  const port = configService.port;
  await app.listen(port);
  console.log(`🚀 Server running on ${configService.baseUrl}`);
  if (configService.nodeEnv === "development") {
    console.log(`📚 Swagger docs available at ${configService.baseUrl}/docs`);
  }
}

void bootstrap();
