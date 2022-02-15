import { NftFilter } from '../../endpoints/nfts/entities/nft.filter';
import { EsdtAddressService } from 'src/endpoints/esdt/esdt.address.service';
import { Test } from "@nestjs/testing";
import { PublicAppModule } from "src/public.app.module";
import { Constants } from "src/utils/constants";
import Initializer from "./e2e-init";
import { EsdtDataSource } from 'src/endpoints/esdt/entities/esdt.data.source';

describe('EsdtAddressService', () => {
  let esdtAddressService: EsdtAddressService;

  beforeAll(async () => {
    await Initializer.initialize();

    const moduleRef = await Test.createTestingModule({
      imports: [PublicAppModule],
    }).compile();

    esdtAddressService = moduleRef.get<EsdtAddressService>(EsdtAddressService);
  }, Constants.oneHour() * 1000);

  describe('getEsdtsForAddress', () => {
    it('should return one esdt from address with source "GATEWAY"', async () => {
      const address: string = 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3';
      const filter = new NftFilter();
      filter.identifiers = ['EGLDMEXF-5bcc57-0b63a1'];
      const gatewayNft = await esdtAddressService.getEsdtsForAddress(address, filter, { from: 0, size: 1 }, EsdtDataSource.gateway);

      expect(gatewayNft).toHaveLength(1);
      expect(gatewayNft).toBeInstanceOf(Array);

      for (const result of gatewayNft) {
        expect(result).toBeInstanceOf(Object);
        expect(result.identifier).toStrictEqual('EGLDMEXF-5bcc57-0b63a1');
      }
    });
  });

  it('should return one esdt from address with source "ELASTIC"', async () => {
    const address: string = 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3';
    const filter = new NftFilter();
    filter.identifiers = ['EGLDMEXF-5bcc57-0b63a1'];
    const elasticNft = await esdtAddressService.getEsdtsForAddress(address, filter, { from: 0, size: 1 }, EsdtDataSource.elastic);

    expect(elasticNft).toHaveLength(1);
    expect(elasticNft).toBeInstanceOf(Array);

    for (const result of elasticNft) {
      expect(result).toBeInstanceOf(Object);
      expect(result.identifier).toStrictEqual('EGLDMEXF-5bcc57-0b63a1');
    }
  });

  it('gateway & elastic esdts of address should be the same', async () => {
    const address: string = 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3';
    const filter = new NftFilter();
    filter.identifiers = ['EGLDMEXF-5bcc57-0b63a1'];

    const gatewayNfts = await esdtAddressService.getEsdtsForAddress(address, new NftFilter(), { from: 0, size: 25 }, EsdtDataSource.gateway);
    const elasticNfts = await esdtAddressService.getEsdtsForAddress(address, new NftFilter(), { from: 0, size: 25 }, EsdtDataSource.elastic);

    expect(gatewayNfts).toStrictEqual(elasticNfts);
  });

  it('should return one esdt from address if "isWhiteListed" from "ELASTCIC" source', async () => {
    const address: string = 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3';
    const filter = new NftFilter();
    filter.isWhitelistedStorage = false;

    const elasticNft = await esdtAddressService.getEsdtsForAddress(address, new NftFilter(), { from: 0, size: 2 }, EsdtDataSource.gateway);
    expect(elasticNft).toHaveLength(2);

    for (const nft of elasticNft) {
      expect(nft.isWhitelistedStorage).toStrictEqual(false);
    }
  });

  describe('getEsdtsCountForAddressFromElastic', () => {
    it('should return esdts count for address form "ELASTIC"', async () => {
      const address: string = 'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3';
      const filter = new NftFilter();
      filter.identifiers = ['EGLDMEXF-5bcc57-0b63a1'];
      const elasticNft = await esdtAddressService.getEsdtsCountForAddressFromElastic(address, filter);

      expect(typeof elasticNft).toBe('number');
    });
  });
});
