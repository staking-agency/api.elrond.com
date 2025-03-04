import { ApiProperty } from "@nestjs/swagger";
import { Account } from "./account";

export class AccountDetailed extends Account {
    @ApiProperty({ description: 'The source code in hex format' })
    code: string = '';

    @ApiProperty({ description: 'The hash of the source code' })
    codeHash: string = '';

    @ApiProperty({ description: 'The hash of the root node' })
    rootHash: string = '';

    @ApiProperty({ description: 'The number of transactions performed on this account' })
    txCount: number = 0;

    @ApiProperty({ description: 'The number of smart contract results of this account' })
    scrCount: number = 0;

    @ApiProperty()
    username: string = '';

    @ApiProperty()
    developerReward: string = '';

    @ApiProperty()
    ownerAddress: string = '';

    @ApiProperty()
    deployedAt?: number;

    @ApiProperty()
    isUpgradeable?: boolean;

    @ApiProperty()
    isReadable?: boolean;

    @ApiProperty()
    isPayable?: boolean;

    @ApiProperty()
    isPayableBySmartContract?: boolean;
}