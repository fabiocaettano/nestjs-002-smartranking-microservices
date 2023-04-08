import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExcpetionsFilter } from './common/filters/http-exception-filter';
import * as momentTimezone from 'moment-timezone';
import { LogginInterceptor } from './common/interceptors/logging.interceptors';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalInterceptors(new LogginInterceptor(), new TimeoutInterceptor());
  app.useGlobalFilters(new AllExcpetionsFilter());

  Date.prototype.toJSON = function(): any {
    return momentTimezone(this).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  await app.listen(8080);
}
bootstrap();
