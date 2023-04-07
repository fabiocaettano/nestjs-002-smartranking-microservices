import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
require('dotenv').config({ path: '.env' });

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI],
        noAck: false,
        queue: 'admin-backend',
      },
  });    
  await app.listen().then(() => logger.log('Microservice is listening'));  
}
bootstrap();
