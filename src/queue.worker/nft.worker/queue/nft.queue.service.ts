import { Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bull";
import { Nft } from "src/endpoints/nfts/entities/nft";
import { NftMedia } from "src/endpoints/nfts/entities/nft.media";
import { ProcessNftSettings } from "src/endpoints/process-nfts/entities/process.nft.settings";
import { NftMediaService } from "./job-services/media/nft.media.service";
import { NftMetadataService } from "./job-services/metadata/nft.metadata.service";
import { NftThumbnailService } from "./job-services/thumbnails/nft.thumbnail.service";

@Injectable()
@Processor('nftQueue')
export class NftQueueService {
  private readonly logger: Logger;

  constructor(
    private readonly nftMetadataService: NftMetadataService,
    private readonly nftMediaService: NftMediaService,
    private readonly nftThumbnailService: NftThumbnailService,
  ) {
    this.logger = new Logger(NftQueueService.name);
  }

  @Process({ concurrency: 4 })
  async onNftCreated(job: Job<{ identifier: string, nft: Nft, settings: ProcessNftSettings }>) {
    this.logger.log({ type: 'consumer', jobId: job.id, identifier: job.data.identifier, attemptsMade: job.attemptsMade });

    const nft = job.data.nft;
    const settings = job.data.settings;

    nft.metadata = await this.nftMetadataService.getMetadata(nft);

    if (settings.forceRefreshMetadata || !nft.metadata) {
      nft.metadata = await this.nftMetadataService.refreshMetadata(nft);
    }

    nft.media = await this.nftMediaService.getMedia(nft) ?? undefined;

    if (settings.forceRefreshMedia || !nft.media) {
      nft.media = await this.nftMediaService.refreshMedia(nft);
    }

    if (nft.media && !settings.skipRefreshThumbnail) {
      await Promise.all(nft.media.map((media: any) => this.generateThumbnail(nft, media, settings.forceRefreshThumbnail)));
    }
  }

  private async generateThumbnail(nft: Nft, media: NftMedia, forceRefresh: boolean = false): Promise<void> {
    try {
      await this.nftThumbnailService.generateThumbnail(nft, media.url, media.fileType, forceRefresh);
    } catch (error) {
      this.logger.error(`An unhandled exception occurred when generating thumbnail for nft with identifier '${nft.identifier}' and url '${media.url}'`);
      this.logger.error(error);
      throw error;
    }
  }
}