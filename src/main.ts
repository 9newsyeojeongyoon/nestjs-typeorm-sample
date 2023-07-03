import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT;
  app.use(cookieParser());
  await app.listen(port);
  console.log(`Application listening on port ${port}`);
}
bootstrap();
