import { Injectable } from "@nestjs/common";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { CachingService } from "src/common/caching/caching.service";
import { CacheInfo } from "src/common/caching/entities/cache.info";
import { DataApiService } from "src/common/external/data.api.service";
import { DataQuoteType } from "src/common/external/entities/data.quote.type";
import { Constants } from "src/utils/constants";
import { TransactionDetailed } from "./entities/transaction.detailed";

@Injectable()
export class TransactionPriceService {

  constructor(
    private readonly cachingService: CachingService,
    private readonly apiConfigService: ApiConfigService,
    private readonly dataApiService: DataApiService,
  ) { }

  async getTransactionPrice(transaction: TransactionDetailed): Promise<number | undefined> {
    const dataUrl = this.apiConfigService.getDataUrl();
    if (!dataUrl) {
      return undefined;
    }

    const transactionDate = transaction.getDate();
    if (!transactionDate) {
      return undefined;
    }

    let price = await this.getTransactionPriceForDate(transactionDate);
    if (price) {
      price = Number(price).toRounded(2);
    }

    return price;
  }

  private async getTransactionPriceForDate(date: Date): Promise<number | undefined> {
    if (date.isToday()) {
      return await this.getTransactionPriceToday();
    }

    return await this.getTransactionPriceHistorical(date);
  }

  private async getTransactionPriceToday(): Promise<number | undefined> {
    return await this.cachingService.getOrSetCache(
      CacheInfo.CurrentPrice.key,
      async () => await this.dataApiService.getQuotesHistoricalLatest(DataQuoteType.price),
      CacheInfo.CurrentPrice.ttl
    );
  }

  private async getTransactionPriceHistorical(date: Date): Promise<number | undefined> {
    return await this.cachingService.getOrSetCache(
      `price:${date.toISODateString()}`,
      async () => await this.dataApiService.getQuotesHistoricalTimestamp(DataQuoteType.price, date.getTime() / 1000),
      Constants.oneDay() * 7
    );
  }
}