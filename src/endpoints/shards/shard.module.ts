import { forwardRef, Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import { ProtocolModule } from "src/common/protocol/protocol.module";
import { NodeModule } from "../nodes/node.module";
import { ShardService } from "./shard.service";

@Module({
  imports: [
    forwardRef(() => CommonModule),
    forwardRef(() => NodeModule),
    ProtocolModule,
  ],
  providers: [
    ShardService,
  ],
  exports: [
    ShardService,
  ],
})
export class ShardModule { }