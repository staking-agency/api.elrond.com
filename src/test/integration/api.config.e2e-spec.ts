import { ApiConfigService } from "../../common/api-config/api.config.service";
import Initializer from "./e2e-init";
import { Constants } from "../../utils/constants";
import { Test } from "@nestjs/testing";
import { PublicAppModule } from "../../public.app.module";

describe('API Config', () => {
  let apiConfigService: ApiConfigService;

  beforeAll(async () => {
    await Initializer.initialize();

    const moduleRef = await Test.createTestingModule({
      imports: [PublicAppModule],
    }).compile();

    apiConfigService = moduleRef.get<ApiConfigService>(ApiConfigService);
  }, Constants.oneHour() * 1000);

  describe('Get Config values', () => {
    describe('getApiUrls', () => {
      it('should return a list of API urls', async () => {
        const value = apiConfigService.getApiUrls();
        expect(value).toBeInstanceOf(Array);
      });

      it('should return gateway url', async () => {
        const value = apiConfigService.getGatewayUrl();
        expect(value).toBe('https://gateway.elrond.com');
      });

      it('should return elastic url', async () => {
        const value = apiConfigService.getElasticUrl();
        expect(value).toBe('https://index.elrond.com');
      });

      it('should return mex url', async () => {
        const value = apiConfigService.getMexUrl();
        expect(value).toBe('');
      });

      it('should return IPFS URL', async () => {
        const value = apiConfigService.getIpfsUrl();
        expect(value).toBe('https://ipfs.io/ipfs');
      });

      it('should return Esdt Contract Address', async () => {
        const value = apiConfigService.getEsdtContractAddress();
        expect(value).toBe('erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u');
      });

      it('should return auction contract address', async () => {
        const value = apiConfigService.getAuctionContractAddress();
        expect(value).toBe('erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l');
      });

      it('should return staking contract address', async () => {
        const value = apiConfigService.getStakingContractAddress();
        expect(value).toBe('erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqllls0lczs7');
      });

      it('should return delegation contract address', () => {
        const value = apiConfigService.getDelegationContractAddress();
        expect(value).toBe('erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt');
      });

      it('should return delegation contract ShardId', () => {
        const value = apiConfigService.getDelegationContractShardId();
        expect(value).toBe(2);
      });

      it('should return delegation manager contract address', () => {
        const value = apiConfigService.getDelegationManagerContractAddress();
        expect(value).toBe('erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqylllslmq6y6');
      });

      it('should return Vm Query Url', () => {
        const value = apiConfigService.getVmQueryUrl();
        expect(value).toBe('https://gateway.elrond.com');
      });

      it('should return Redis Url', () => {
        const value = apiConfigService.getRedisUrl();
        expect(value).toBe('127.0.0.1');
      });

      it('should return cache Ttl', async () => {
        const value = apiConfigService.getCacheTtl();
        expect(value).toBe(6);
      });

      it('should return network', async () => {
        const value = apiConfigService.getNetwork();
        expect(value).toBe('mainnet');
      });

      it('should return pool limit', async () => {
        const value = apiConfigService.getPoolLimit();
        expect(value).toBe(10);
      });

      it('should return process Ttl', async () => {
        const value = apiConfigService.getProcessTtl();
        expect(value).toBe(600);
      });

      it('should return Axios Timeout', async () => {
        const value = apiConfigService.getAxiosTimeout();
        expect(value).toBe(61000);
      });

      it('should return Server Timeout', async () => {
        const value = apiConfigService.getServerTimeout();
        expect(value).toBe(60000);
      });

      it('should return headers Timeout', async () => {
        const value = apiConfigService.getHeadersTimeout();
        expect(value).toBe(61000);
      });

      it('should return catching flag True', async () => {
        const value = apiConfigService.getUseRequestCachingFlag();
        expect(value).toBeTruthy();
      });

      it('should return logging flag False', async () => {
        const value = apiConfigService.getUseRequestLoggingFlag();
        expect(value).toBeFalsy();
      });

      it('should return agent flag true', async () => {
        const value = apiConfigService.getUseKeepAliveAgentFlag();
        expect(value).toBeTruthy();
      });

      it('should return tracing flag', async () => {
        const value = apiConfigService.getUseTracingFlag();
        expect(value).toBeFalsy();
      });

      it('should return vm query tracing flag', async () => {
        const value = apiConfigService.getUseVmQueryTracingFlag();
        expect(value).toBeFalsy();
      });

      it('should return providers url', async () => {
        const value = apiConfigService.getProvidersUrl();
        expect(value).toBe('https://internal-delegation-api.elrond.com/providers');
      });

      it('should return data url', async () => {
        const value = apiConfigService.getDataUrl();
        expect(value).toBeUndefined();
      });

      it('should return transaction processor cron active', async () => {
        const value = apiConfigService.getIsTransactionProcessorCronActive();
        expect(value).toBeTruthy();
      });

      it('should return transaction processor max look behind', async () => {
        const value = apiConfigService.getTransactionProcessorMaxLookBehind();
        expect(value).toBe(1000);
      });

      it('should return cache warmer cron active', async () => {
        const value = apiConfigService.getIsCacheWarmerCronActive();
        expect(value).toBeTruthy();
      });

      it('should return fast warmer cron active', async () => {
        const value = apiConfigService.getIsFastWarmerCronActive();
        expect(value).toBeFalsy();
      });

      it('should return boolean if Public API is active', async () => {
        const value = apiConfigService.getIsPublicApiActive();
        expect(value).toBeTruthy();
      });

      it('should return boolean if Private API is active', async () => {
        const value = apiConfigService.getIsPrivateApiActive();
        expect(value).toBeTruthy();
      });

      it('should return whether auth is active', async () => {
        const value = apiConfigService.getIsAuthActive();
        expect(value).toBeFalsy();
      });

      it('should return database host', async () => {
        const value = apiConfigService.getDatabaseHost();
        expect(value).toBe('localhost');
      });

      it('should return database port', async () => {
        const value = apiConfigService.getDatabasePort();
        expect(value).toBe(3306);
      });

      it('should return database username', async () => {
        const value = apiConfigService.getDatabaseUsername();
        expect(value).toBe('root');
      });

      it('should return database password', async () => {
        const value = apiConfigService.getDatabasePassword();
        expect(value).toBe('root');
      });

      it('should return database name', async () => {
        const value = apiConfigService.getDatabaseName();
        expect(value).toBe('api');
      });

      it('should return metachain shard id', async () => {
        const value = apiConfigService.getMetaChainShardId();
        expect(value).toBe(4294967295);
      });

      it('should return whether to use legacy elastic', async () => {
        const value = apiConfigService.getUseLegacyElastic();
        expect(value).toBeTruthy();
      });

      it('should return rate limiter secret', async () => {
        const value = apiConfigService.getRateLimiterSecret();
        expect(value).toBeUndefined();
      });

      it('should return array of inflation amounts', async () => {
        const value = apiConfigService.getInflationAmounts();
        expect(value).toBeInstanceOf(Array);
      });

      it('should return media url', async () => {
        const value = apiConfigService.getMediaUrl();
        expect(value).toBe('https://media.elrond.com');
      });

      it('should return media internal url', async () => {
        const value = apiConfigService.getMediaInternalUrl();
        expect(value).toBeUndefined();
      });

      it('should return external media url', async () => {
        const value = apiConfigService.getExternalMediaUrl();
        expect(value).toBe('https://media.elrond.com');
      });

      it('should return nft thumbnails url', async () => {
        const value = apiConfigService.getNftThumbnailsUrl();
        expect(value).toBe('https://media.elrond.com/nfts/thumbnail');
      });

      it('should return access address', async () => {
        const value = apiConfigService.getAccessAddress();
        expect(value).toBe('');
      });
    });
  });
});