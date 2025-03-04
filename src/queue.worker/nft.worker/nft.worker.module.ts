import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NftWorkerService } from './nft.worker.service';
import { NftMediaModule } from './queue/job-services/media/nft.media.module';
import { NftMetadataModule } from './queue/job-services/metadata/nft.metadata.module';
import { NftThumbnailModule } from './queue/job-services/thumbnails/nft.thumbnail.module';

@Module({
  imports: [
    NftMediaModule,
    NftMetadataModule,
    NftThumbnailModule,
    BullModule.registerQueue({
      name: 'nftQueue',
    }),
    NftThumbnailModule,
  ],
  providers: [NftWorkerService],
  exports: [NftWorkerService],
})
export class NftWorkerModule { }
