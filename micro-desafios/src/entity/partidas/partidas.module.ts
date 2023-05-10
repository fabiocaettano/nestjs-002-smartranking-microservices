import { Module } from '@nestjs/common';
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidaSchema } from  './schemas/partida.schemas';
import { ProxyRMQModule } from '../../proxyrmq/proxyrmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partida', schema: PartidaSchema }]),
    ProxyRMQModule
  ],
  controllers: [PartidasController],
  providers: [PartidasService]
})
export class PartidasModule {}

