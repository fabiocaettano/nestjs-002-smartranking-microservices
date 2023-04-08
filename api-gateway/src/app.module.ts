import { Module } from '@nestjs/common';
import { CategoriaController } from './entity/categorias/categorias.controller';

@Module({
  imports: [],
  controllers: [CategoriaController],
  providers: [],
})
export class AppModule {}
