import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { DesafioSchema } from './schemas/desafio.schema';
import { ProxyRmqModule } from 'src/proxy/proxy.module';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Desafio', schema: DesafioSchema}
  ]),
  ProxyRmqModule
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
