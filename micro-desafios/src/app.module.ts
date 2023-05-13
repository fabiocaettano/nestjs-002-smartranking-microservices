import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [DesafiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
