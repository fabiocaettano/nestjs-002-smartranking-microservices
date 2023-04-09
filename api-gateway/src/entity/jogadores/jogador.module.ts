import { Module } from "@nestjs/common";
import { JogadorController } from "./jogadores.controller";
import { ProxyModule } from "src/proxy/proxy.module";
import { AwsModule } from "../aws/aws.module";
import { AwsService } from "../aws/aws.service";

@Module({
    imports: [ProxyModule, AwsModule],
    controllers: [JogadorController],
    providers: [AwsService]
})
export class JogadoresModule {}