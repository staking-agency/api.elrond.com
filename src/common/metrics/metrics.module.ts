import { Module } from "@nestjs/common";
import { ApiConfigModule } from "../api-config/api.config.module";
import { GatewayModule } from "../gateway/gateway.module";
import { ProtocolModule } from "../protocol/protocol.module";
import { MetricsService } from "./metrics.service";

@Module({
  imports: [
    ApiConfigModule,
    GatewayModule,
    ProtocolModule,
  ],
  providers: [
    MetricsService,
  ],
  exports: [
    MetricsService,
  ],
})
export class MetricsModule { }