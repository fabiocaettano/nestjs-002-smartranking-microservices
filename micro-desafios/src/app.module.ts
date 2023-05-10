import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosModule } from './entity/desafios/desafios.module';
import { PartidasModule } from './entity/partidas/partidas.module';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { ConfigModule } from '@nestjs/config'
require('dotenv').config({ path: '.env' })

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    DesafiosModule,
    PartidasModule,
    ProxyRMQModule,
    ConfigModule.forRoot({isGlobal: true}),
],
})
export class AppModule {}

