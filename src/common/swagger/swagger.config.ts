import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from "@nestjs/common"
import { AppConfigService } from '../config/config.service';

/**
 * Sets up Swagger documentation for the API
 * Only enabled in non-production environments by default
 */
export const setUpSwagger = (app: INestApplication): void => {
    const configService = app.get(AppConfigService);
    const nodeEnv = configService.nodeEnv;
    const isProduction = nodeEnv === 'production';

    // Only enable Swagger in non-production environments unless explicitly configured
    //   if (isProduction && ) {
    //     return;
    //   }

    const baseUrl = configService.baseUrl;

    const options = new DocumentBuilder()
        .setTitle('Bookonnect API Documentation')
        .setVersion('1.0.0')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addServer(
            `${baseUrl}`,
            'Development Server',
        )
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .addApiKey(
            {
                type: 'apiKey',
                name: 'X-API-KEY',
                in: 'header',
                description: 'API Key for authentication',
            },
            'api-key',
        )
        .build();

    const document = SwaggerModule.createDocument(app, options, {
        deepScanRoutes: true,
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    });

    //Add Custom Swagger Configuration
    SwaggerModule.setup('/docs', app, document, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            docExpansion: 'list',
            filter: true,
            showCommonExtensions: true,
            syntaxHighlight: {
                theme: 'monokai',
            },
            tryItOutEnabled: true,
            defaultModelsExpandDepth: 3,
            defaultModelExpandDepth: 3,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
        // customSiteTitle: 'NestJS Starter Kit API Documentation',
        // customfavIcon: 'https://nestjs.com/img/favicon.png',
        // customJs: [
        //   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.8/swagger-ui-bundle.min.js',
        // ],
        // customCssUrl: [
        //   'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.8/swagger-ui.min.css',
        // ],
    })
}