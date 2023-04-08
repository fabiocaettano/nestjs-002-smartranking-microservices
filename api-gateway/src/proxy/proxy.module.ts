import { Module } from "@nestjs/common";
import { ProxyClient } from "./proxy-client";

@Module({
    providers: [ProxyClient],
    exports: [ProxyClient]
})
export class ProxyModule {}