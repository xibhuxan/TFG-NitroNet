import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { CookieTokenMiddleware } from './middleware/cookie-token.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  //app.use(cookieParser());
  //app.use(CookieTokenMiddleware);

   const config = new DocumentBuilder()
  .setTitle('API de NitroNet')
  .setDescription('Endpoints para gestión de nitronet')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Accede en `/api-docs`

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
