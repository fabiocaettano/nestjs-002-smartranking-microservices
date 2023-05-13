import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosModule } from './entity/desafios/desafios.module';
import { ProxyRmqModule } from './proxy/proxy.module';
import { ConfigModule } from '@nestjs/config';
import { ProxyClient } from './proxy/proxy.client';
require('dotenv').config({ path: '.env' })

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true}),
    DesafiosModule,
    ProxyRmqModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [],
  providers: [ProxyClient],
})
export class AppModule {}
