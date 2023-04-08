import { Module } from '@nestjs/common';
import { CategoriasModule } from './entity/categorias/categoria.module';
import { ProxyModule } from './proxy/proxy.module';
import { ProxyClient } from './proxy/proxy-client';
import { JogadoresModule } from './entity/jogadores/jogador.module';

@Module({
  imports: [CategoriasModule, JogadoresModule, ProxyModule],
  controllers: [],
  providers: [ProxyClient],
})
export class AppModule {}
