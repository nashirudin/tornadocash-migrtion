import { assertNotNull } from '@subsquid/util-internal'
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from '@subsquid/evm-processor';
import { lookupArchive } from '@subsquid/archive-registry'
import { Deposit,Withdrawal } from './model'
import * as TornadoContract from './abi/TornadoContract'

export const CONTRACT_ADDRESS = '0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF'.toLowerCase()

export const processor = new EvmBatchProcessor()
  .setDataSource({
    archive: lookupArchive('eth-mainnet'),
    chain: {
      url: 'https://rpc.ankr.com/eth',
      rateLimit: 10
    }
  })
  .setBlockRange({ from: 17000000 })
  .setFinalityConfirmation(75)
  .setFields({
    transaction: {
      hash: true,
    },
    log: {
      data: true,
      topics: true,
    },
  })
  .addLog({
    address: [ CONTRACT_ADDRESS ],
    topic0: [
      TornadoContract.events.Deposit.topic,
      TornadoContract.events.Withdrawal.topic,
    ],
    transaction: true
  })
export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
