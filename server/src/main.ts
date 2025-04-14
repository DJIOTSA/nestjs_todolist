import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Global Pipes for validation (useful with DTOs later)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API documentation for the NestJS Task Manager application')
    .setVersion('1.0')
    .addBearerAuth() // Setup for JWT Bearer tokens (Phase 2)
    // .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'ApiKeyAuth') // Setup for API Key (Phase 3)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Access docs at /api-docs

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger Docs available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();
