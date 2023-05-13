import { Module } from '@nestjs/common';
import { DesafiosModule } from './entity/desafios/desafios.module';

@Module({
  imports: [DesafiosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
