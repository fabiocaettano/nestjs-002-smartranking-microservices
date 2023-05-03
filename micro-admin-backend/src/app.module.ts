import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './entity/categorias/categorias.module';
import { JogadoresModule } from './entity/jogadores/jogadores.module';

require('dotenv').config({ path: '.env' })

@Module({
  imports: [

    MongooseModule.forRoot(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true}),    
    CategoriasModule,
    JogadoresModule
  ],
  controllers: [],  
  providers: [],
})
export class AppModule {}