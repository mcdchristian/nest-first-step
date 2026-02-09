import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
// import dotenv from 'dotenv';
import helmet from 'helmet';
import { DurationInterceptor } from './interceptor/duration/duration.interceptor';
import { ConfigService } from '@nestjs/config';

// dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOptions = {
    origin: ['http://localhost:4205'],
  };
  app.enableCors(corsOptions);
  app.use(helmet());
  app.use(morgan('dev'));
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('je suis le middleware global sur toutes les routes');
    next();
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new DurationInterceptor());
  // await app.listen(process.env.APP_PORT!);
  await app.listen(configService.get('APP_PORT')!);
}
bootstrap();
