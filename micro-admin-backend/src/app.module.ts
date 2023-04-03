import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/categorias/categoria.schema';
import { JogadorSchema } from './interfaces/jogadores/jogador.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
require('dotenv').config({ path: '.env' })

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      {name: 'Categoria', schema: CategoriaSchema},
      {name: 'Jogador', schema: JogadorSchema}
    ]
    )],
  controllers: [AppController],  
  providers: [AppService],
})
export class AppModule {}