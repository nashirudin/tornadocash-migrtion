import {TypeormDatabase} from '@subsquid/typeorm-store';
import {processor,CONTRACT_ADDRESS} from './processor';
import {Deposit, Withdrawal} from './model';
import * as TornadoContractABI from './abi/TornadoContract';



processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
  const deposit: Map<string, Deposit> = new Map();
  const withdrawal: Map<string, Withdrawal> = new Map();
    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            if (log.topics[0] === TornadoContractABI.events.Deposit.topic) {
              let event = TornadoContractABI.events.Deposit.decode(log);
              let deposit = new Deposit({ 
              id: log.transaction?.hash,
              commitment: event.commitment,
              leafIndex: BigInt(event.leafIndex),
              timestamp: BigInt(event.timestamp),
              blockNumber: BigInt(block.header.height),
              blockTimestamp: BigInt!(block.header.timestamp),
              transactionHash: log.transaction?.hash
              })
             
            }
            if (log.topics[0] === TornadoContractABI.events.Withdrawal.topic) {
              let event = TornadoContractABI.events.Withdrawal.decode(log);
              let withdrawal = new Withdrawal({
                id: log.transaction?.hash,
                to: event.to,
                nullifierHash: event.nullifierHash,
                relayer: event.relayer,
                fee: BigInt(event.fee),
                blockNumber: BigInt(block.header.height),
                blockTimestamp: BigInt(block.header.timestamp),
                transactionHash: log.transaction?.hash

              })
             
            }
          }
        }
            
        ctx.store.upsert([...deposit.values()]),
        ctx.store.upsert([...withdrawal.values()]) 
})
          
