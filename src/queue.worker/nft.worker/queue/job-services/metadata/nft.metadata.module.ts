import { forwardRef, Module } from '@nestjs/common';
import { CachingModule } from 'src/common/caching/caching.module';
import { PersistenceModule } from 'src/common/persistence/persistence.module';
import { NftModule } from 'src/endpoints/nfts/nft.module';
import { NftMetadataService } from './nft.metadata.service';

@Module({
  imports: [
    forwardRef(() => NftModule),
    PersistenceModule,
    CachingModule,
  ],
  controllers: [],
  providers: [
    NftMetadataService,
  ],
  exports: [
    NftMetadataService,
  ],
})
export class NftMetadataModule { }
