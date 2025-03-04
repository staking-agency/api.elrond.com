import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import { PluginModule } from "src/plugins/plugin.module";
import { AccountController } from "./accounts/account.controller";
import { BlockController } from "./blocks/block.controller";
import { CollectionController } from "./collections/collection.controller";
import { DelegationLegacyController } from "./delegation.legacy/delegation.legacy.controller";
import { DelegationController } from "./delegation/delegation.controller";
import { EndpointsServicesModule } from "./endpoints.services.module";
import { HealthCheckController } from "./health-check/health.check.controller";
import { IdentitiesController } from "./identities/identities.controller";
import { KeysController } from "./keys/keys.controller";
import { MexController } from "./mex/mex.controller";
import { MiniBlockController } from "./miniblocks/mini.block.controller";
import { NetworkController } from "./network/network.controller";
import { NftController } from "./nfts/nft.controller";
import { TagController } from "./nfttags/tag.controller";
import { NodeController } from "./nodes/node.controller";
import { ProviderController } from "./providers/provider.controller";
import { ProxyController } from "./proxy/proxy.controller";
import { ProxyModule } from "./proxy/proxy.module";
import { RoundController } from "./rounds/round.controller";
import { SmartContractResultController } from "./sc-results/scresult.controller";
import { ShardController } from "./shards/shard.controller";
import { StakeController } from "./stake/stake.controller";
import { TokenController } from "./tokens/token.controller";
import { TransactionController } from "./transactions/transaction.controller";
import { UsernameController } from "./usernames/username.controller";
import { VmQueryController } from "./vm.query/vm.query.controller";
import { WaitingListController } from "./waiting-list/waiting.list.controller";


@Module({
  imports: [
    CommonModule,
    EndpointsServicesModule,
    ProxyModule,
    PluginModule,
  ],
  controllers: [
    AccountController, BlockController, CollectionController, DelegationController, DelegationLegacyController, IdentitiesController,
    KeysController, MexController, MiniBlockController, NetworkController, NftController, TagController, NodeController,
    ProviderController, ProxyController, RoundController, SmartContractResultController, ShardController, StakeController, StakeController,
    TokenController, TransactionController, UsernameController, VmQueryController, WaitingListController,
    HealthCheckController,
  ],
})
export class EndpointsControllersModule { }