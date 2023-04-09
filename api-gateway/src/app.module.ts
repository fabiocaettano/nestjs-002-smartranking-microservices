import { Module } from '@nestjs/common';
import { CategoriasModule } from './entity/categorias/categoria.module';
import { ProxyModule } from './proxy/proxy.module';
import { ProxyClient } from './proxy/proxy-client';
import { JogadoresModule } from './entity/jogadores/jogador.module';
import { AwsModule } from './entity/aws/aws.module';
import { AwsService } from './entity/aws/aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CategoriasModule, 
    JogadoresModule, 
    ProxyModule, 
    AwsModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [],
  providers: [ProxyClient, AwsService],
})
export class AppModule {}
