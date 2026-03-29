import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
@Injectable()
export class AppConfigService {
    constructor(private readonly configService: NestConfigService) { }

    get nodeEnv(): "development" | "production" | "test" {
        return this.configService.get("NODE_ENV") as "development" | "production" | "test";
    }

    get port(): number {
        return Number(this.configService.get("PORT", 3000));
    }

    get databaseUrl(): string {
        return this.configService.get("DATABASE_URL") || "";
    }

    get baseUrl(): string {
        return this.configService.get<string>("BASE_URL") || "";
    }

    get corsOrigins(): string[] {
        const origins = this.configService.get<string>("CORS_ORIGINS") || "http://localhost:3000";
        return origins.split(",").map((origin) => origin.trim());
    }

    get jwtSecret(): string {
        return this.configService.get<string>("JWT_SECRET") || "";
    }

    get jwtRefreshSecret(): string {
        return this.configService.get<string>("JWT_REFRESH_SECRET") || "";
    }

    get jwtExpiresIn(): string {
        return this.configService.get<string>("JWT_EXPIRES_IN", "1d");
    }

    get redisHost(): string | undefined {
        return this.configService.get<string>("REDIS_HOST");
    }

    get redisPort(): number | undefined {
        const port = this.configService.get<string>("REDIS_PORT");
        return port ? parseInt(port, 10) : undefined;
    }

    get swaggerUsername(): string | undefined {
        return this.configService.get<string>("SWAGGER_USERNAME");
    }

    get swaggerPassword(): string | undefined {
        return this.configService.get<string>("SWAGGER_PASSWORD");
    }

    get sentryDsn(): string | undefined {
        return this.configService.get<string>("SENTRY_DSN");
    }

    get sentryEnabled(): boolean {
        return this.configService.get<string>("SENTRY_ENABLED") === "true";
    }

    //pusher configs
    get pusherAppId(): string {
        return this.configService.get<string>("PUSHER_APP_ID") || "";
    }

    get pusherKey(): string {
        return this.configService.get<string>("PUSHER_KEY") || "";
    }

    get pusherSecret(): string {
        return this.configService.get<string>("PUSHER_SECRET") || "";
    }

    get pusherCluster(): string {
        return this.configService.get<string>("PUSHER_CLUSTER") || "";
    }

    get pusherHost(): string {
        return this.configService.get<string>("PUSHER_HOST") || "";
    }

    get pusherPort(): number | undefined {
        const raw = this.configService.get<string>("PUSHER_PORT");
        if (!raw || !raw.trim()) {
            return undefined;
        }
        const parsed = parseInt(raw, 10);
        return Number.isNaN(parsed) ? undefined : parsed;
    }

    get pusherScheme(): "http" | "https" {
        const scheme = this.configService.get<string>("PUSHER_SCHEME") || "https";
        return scheme === "http" ? "http" : "https";
    }

    // EmailJS configs
    get emailjsServiceId(): string {
        return this.configService.get<string>("EMAILJS_SERVICE_ID") || "";
    }

    get emailjsTemplateId(): string {
        return this.configService.get<string>("EMAILJS_TEMPLATE_ID") || "";
    }

    get emailjsPublicKey(): string {
        return this.configService.get<string>("EMAILJS_PUBLIC_KEY") || "";
    }

    get emailjsPrivateKey(): string {
        return this.configService.get<string>("EMAILJS_PRIVATE_KEY") || "";
    }

    // Auth0 (Admin Portal)
    get auth0Domain(): string {
        return this.configService.get<string>("AUTH0_DOMAIN") || "";
    }

    get auth0Audience(): string {
        return this.configService.get<string>("AUTH0_AUDIENCE") || "";
    }

    get rabbitMqUri(): string {
        return this.configService.get<string>("RABBITMQ_URI") || "amqp://localhost:5672";
    }

    // AWS S3
    get awsAccessKeyId(): string {
        return this.configService.get<string>("AWS_ACCESS_KEY_ID") || "";
    }

    get awsSecretAccessKey(): string {
        return this.configService.get<string>("AWS_SECRET_ACCESS_KEY") || "";
    }

    get awsRegion(): string {
        return this.configService.get<string>("AWS_REGION") || "";
    }

    get awsBucketName(): string {
        return this.configService.get<string>("AWS_BUCKET_NAME") || "";
    }

} 