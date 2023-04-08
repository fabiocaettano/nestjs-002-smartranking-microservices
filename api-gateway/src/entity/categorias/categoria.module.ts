import { Module } from "@nestjs/common";
import { CategoriaController } from "./categorias.controller";
import { ProxyModule } from "src/proxy/proxy.module";

@Module({
    imports: [ProxyModule],
    controllers: [CategoriaController]
})
export class CategoriasModule {}