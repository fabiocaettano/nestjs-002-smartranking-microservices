import { Module } from '@nestjs/common';
import { JogadoresService } from './jogadores.services';
import { JogadoresController } from './jogadores.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { JogadorSchema } from './schemas/jogador.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'Jogador', schema: JogadorSchema }
      ])],
      providers: [JogadoresService],
      controllers: [JogadoresController]    
})
export class JogadoresModule {}