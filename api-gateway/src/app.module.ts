import { Module } from '@nestjs/common';
import { CategoriaController } from './entity/categorias/categorias.controller';
import { JogadorController } from './entity/jogadores/jogadores.controller';

@Module({
  imports: [],
  controllers: [CategoriaController, JogadorController],
  providers: [],
})
export class AppModule {}
