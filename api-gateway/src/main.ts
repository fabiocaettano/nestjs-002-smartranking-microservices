import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExcpetionsFilter } from './filters/http-exception-filter';
import * as momentTimezone from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new AllExcpetionsFilter());

  Date.prototype.toJSON = function(): any {
    return momentTimezone(this).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  await app.listen(8080);
}
bootstrap();
