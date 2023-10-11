import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["http://localhost:5173", "http://localhost:8000", "http://localhost:4200"]
  })
  await app.listen(process.env.PORT);
}
bootstrap();
