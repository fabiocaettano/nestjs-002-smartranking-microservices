import { Module } from "@nestjs/common";
import { JogadorController } from "./jogadores.controller";
import { ProxyRmqModule } from "src/proxy/proxy.module";
import { AwsModule } from "../aws/aws.module";
import { AwsService } from "../aws/aws.service";

@Module({
    imports: [ProxyRmqModule, AwsModule],
    controllers: [JogadorController],
    providers: [AwsService]
})
export class JogadoresModule {}