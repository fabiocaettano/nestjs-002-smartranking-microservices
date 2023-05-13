import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//require('dotenv').config({ path: '.env' });
//urls: [process.env.RABBITMQ_URI],

const logger = new Logger('Main');

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [configService.get<string>('RABBITMQ_URI')],
        noAck: false,
        queue: 'admin-backend',
      },
  });    

  await app.listen().then(() => logger.log('Microservice is listening'));  

}
bootstrap();
