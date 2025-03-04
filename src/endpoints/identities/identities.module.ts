import { forwardRef, Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import { NetworkModule } from "../network/network.module";
import { NodeModule } from "../nodes/node.module";
import { IdentitiesService } from "./identities.service";

@Module({
  imports: [
    forwardRef(() => CommonModule),
    forwardRef(() => NodeModule),
    forwardRef(() => NetworkModule),
  ],
  providers: [
    IdentitiesService,
  ],
  exports: [
    IdentitiesService,
  ],
})
export class IdentitiesModule { }