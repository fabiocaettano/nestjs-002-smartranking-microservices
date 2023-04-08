import { Module } from "@nestjs/common";
import { JogadorController } from "./jogadores.controller";
import { ProxyModule } from "src/proxy/proxy.module";

@Module({
    imports: [ProxyModule],
    controllers: [JogadorController]
})
export class JogadoresModule {}