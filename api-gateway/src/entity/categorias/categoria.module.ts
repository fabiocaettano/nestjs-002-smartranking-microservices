import { Module } from "@nestjs/common";
import { CategoriaController } from "./categorias.controller";
import { ProxyRmqModule } from "src/proxy/proxy.module";

@Module({
    imports: [ProxyRmqModule],
    controllers: [CategoriaController]
})
export class CategoriasModule {}