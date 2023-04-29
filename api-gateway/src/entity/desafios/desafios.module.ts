import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { ProxyRmqModule } from 'src/proxy/proxy.module';

@Module({
  controllers: [DesafiosController],
  imports: [ProxyRmqModule]
})
export class DesafiosModule {}
