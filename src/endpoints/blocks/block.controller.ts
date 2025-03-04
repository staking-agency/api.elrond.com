import { Controller, DefaultValuePipe, Get, HttpException, HttpStatus, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ParseBlockHashPipe } from "src/utils/pipes/parse.block.hash.pipe";
import { ParseBlsHashPipe } from "src/utils/pipes/parse.bls.hash.pipe";
import { ParseOptionalIntPipe } from "src/utils/pipes/parse.optional.int.pipe";
import { BlockService } from "./block.service";
import { Block } from "./entities/block";
import { BlockDetailed } from "./entities/block.detailed";

@Controller()
@ApiTags('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) { }

  @Get("/blocks")
  @ApiResponse({
    status: 200,
    description: 'The blocks available on the blockchain',
    type: Block,
    isArray: true,
  })
  @ApiQuery({ name: 'shard', description: 'Id of the shard the block belongs to', required: false })
  @ApiQuery({ name: 'proposer', description: 'Filter by proposer', required: false })
  @ApiQuery({ name: 'validator', description: 'Filter by validator', required: false })
  @ApiQuery({ name: 'epoch', description: 'Filter by epoch', required: false })
  @ApiQuery({ name: 'from', description: 'Numer of items to skip for the result set', required: false })
  @ApiQuery({ name: 'size', description: 'Number of items to retrieve', required: false })
  @ApiQuery({ name: 'nonce', description: 'Filter by nonce', required: false })
  getBlocks(
    @Query('shard', ParseOptionalIntPipe) shard: number | undefined,
    @Query('proposer', ParseBlsHashPipe) proposer: string | undefined,
    @Query('validator', ParseBlsHashPipe) validator: string | undefined,
    @Query('epoch', ParseOptionalIntPipe) epoch: number | undefined,
    @Query('from', new DefaultValuePipe(0), ParseIntPipe) from: number,
    @Query("size", new DefaultValuePipe(25), ParseIntPipe) size: number,
    @Query('nonce', ParseOptionalIntPipe) nonce: number | undefined,
  ): Promise<Block[]> {
    return this.blockService.getBlocks({ shard, proposer, validator, epoch, nonce }, { from, size });
  }

  @Get("/blocks/count")
  @ApiResponse({
    status: 200,
    description: 'The number of blocks available on the blockchain',
  })
  @ApiQuery({ name: 'shard', description: 'Id of the shard the block belongs to', required: false })
  @ApiQuery({ name: 'proposer', description: 'Filter by proposer', required: false })
  @ApiQuery({ name: 'validator', description: 'Filter by validator', required: false })
  @ApiQuery({ name: 'epoch', description: 'Filter by epoch', required: false })
  @ApiQuery({ name: 'nonce', description: 'Filter by nonce', required: false })
  getBlocksCount(
    @Query('shard', ParseOptionalIntPipe) shard: number | undefined,
    @Query('proposer', ParseBlsHashPipe) proposer: string | undefined,
    @Query('validator', ParseBlsHashPipe) validator: string | undefined,
    @Query('epoch', ParseOptionalIntPipe) epoch: number | undefined,
    @Query('nonce', ParseOptionalIntPipe) nonce: number | undefined,
  ): Promise<number> {
    return this.blockService.getBlocksCount({ shard, proposer, validator, epoch, nonce });
  }

  @Get("/blocks/c")
  @ApiExcludeEndpoint()
  getBlocksCountAlternative(
    @Query('shard', ParseOptionalIntPipe) shard: number | undefined,
    @Query('proposer', ParseBlsHashPipe) proposer: string | undefined,
    @Query('validator', ParseBlsHashPipe) validator: string | undefined,
    @Query('epoch', ParseOptionalIntPipe) epoch: number | undefined,
    @Query('nonce', ParseOptionalIntPipe) nonce: number | undefined,
  ): Promise<number> {
    return this.blockService.getBlocksCount({ shard, proposer, validator, epoch, nonce });
  }

  @Get("/blocks/:hash")
  @ApiResponse({
    status: 200,
    description: 'The details of a given block',
    type: BlockDetailed,
  })
  @ApiResponse({
    status: 404,
    description: 'Block not found',
  })
  async getBlock(@Param('hash', ParseBlockHashPipe) hash: string): Promise<BlockDetailed> {
    try {
      return await this.blockService.getBlock(hash);
    } catch {
      throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
    }
  }
}