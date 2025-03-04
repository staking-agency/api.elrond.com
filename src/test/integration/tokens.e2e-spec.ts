import { Test } from '@nestjs/testing';
import { PublicAppModule } from 'src/public.app.module';
import { TokenService } from 'src/endpoints/tokens/token.service';
import Initializer from './e2e-init';
import { Constants } from 'src/utils/constants';
import { TokenFilter } from 'src/endpoints/tokens/entities/token.filter';

describe('Token Service', () => {
  let tokenService: TokenService;
  let tokenName: string;
  let tokenIdentifier: string;

  beforeAll(async () => {
    await Initializer.initialize();
    const moduleRef = await Test.createTestingModule({
      imports: [PublicAppModule],
    }).compile();

    tokenService = moduleRef.get<TokenService>(TokenService);

    const tokens = await tokenService.getTokens(
      { from: 0, size: 1 },
      new TokenFilter(),
    );
    expect(tokens).toHaveLength(1);

    const token = tokens[0];
    tokenName = token.name;
    tokenIdentifier = token.identifier;
  }, Constants.oneHour() * 1000);

  describe('Tokens list', () => {
    describe('Tokens pagination', () => {
      it(`should return a list with 25 tokens`, async () => {
        const tokensList = await tokenService.getTokens(
          { from: 0, size: 25 },
          new TokenFilter(),
        );

        expect(tokensList).toBeInstanceOf(Array);
        expect(tokensList).toHaveLength(25);
      });

      it(`should return a list with 10 tokens`, async () => {
        const tokensList = await tokenService.getTokens(
          { from: 0, size: 10 },
          new TokenFilter(),
        );
        expect(tokensList).toBeInstanceOf(Array);
        expect(tokensList).toHaveLength(10);
      });
    });

    describe('Tokens filters', () => {
      it(`should return a list of tokens for a collection`, async () => {
        const tokensList = await tokenService.getTokens(
          { from: 0, size: 50 },
          { name: tokenName },
        );
        expect(tokensList).toBeInstanceOf(Array);

        for (const token of tokensList) {
          expect(token.name).toBe(tokenName);
        }
      });

      it(`should return a list with nfts that has identifiers`, async () => {
        const tokenFilter = new TokenFilter();
        tokenFilter.identifiers = ['MSFT-532e00', 'EWLD-e23800', 'invalidIdentifier'];
        const tokensList = await tokenService.getTokens({ from: 0, size: 25 }, tokenFilter);
        expect(tokensList).toBeInstanceOf(Array);

        expect(tokensList.length).toEqual(2);
        const nftsIdentifiers = tokensList.map((nft) => nft.identifier);
        expect(nftsIdentifiers.includes('MSFT-532e00')).toBeTruthy();
        expect(nftsIdentifiers.includes('EWLD-e23800')).toBeTruthy();
      });

      it(`should return an empty tokens list`, async () => {
        const tokenFilter = new TokenFilter();
        tokenFilter.identifiers = ['LKFARM-9d1ea8-8fb5', 'LKFARM-9d1ea8-8fb6'];
        const tokensList = await tokenService.getTokens({ from: 0, size: 25 }, tokenFilter);
        expect(tokensList).toBeInstanceOf(Array);

        expect(tokensList.length).toEqual(0);
      });
    });
  });

  describe('Token count', () => {
    it(`should return a number`, async () => {
      const tokensCount: Number = new Number(
        await tokenService.getTokenCount(new TokenFilter()),
      );

      expect(tokensCount).toBeInstanceOf(Number);
    });
  });

  describe('Specific token', () => {
    it(`should return a token for a specific identifier`, async () => {
      const token = await tokenService.getToken(tokenIdentifier);

      if (token) {
        expect(token.identifier).toBe(tokenIdentifier);
        expect(token.name).toBe(tokenName);
      }
    });

    it(`should throw 'Token not found' error`, async () => {
      expect(await tokenService.getToken(tokenIdentifier + 'a')).toBeUndefined();
    });
  });
});
