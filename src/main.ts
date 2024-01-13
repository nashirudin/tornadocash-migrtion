import {TypeormDatabase} from '@subsquid/typeorm-store';
import {processor,CONTRACT_ADDRESS} from './processor';
import {Deposit, Withdrawal} from './model';
import * as TornadoContractABI from './abi/TornadoContract';



processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
  const deposit: Map<string, Deposit> = new Map();
  const withdrawal: Map<string, Withdrawal> = new Map();
    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            if (log.address === CONTRACT_ADDRESS && [TornadoContractABI.events.Deposit.topic, TornadoContractABI.events.Withdrawal.topic].includes(log.topics[0])) {
              const isdeposit = log.topics[0] === TornadoContractABI.events.Deposit.topic;
              if (isdeposit) {
              const deposit = new Deposit(log.transaction!.hash.concat(log.logIndex.toString()) as any as Partial<Deposit>
            );
              ctx.store.save<Deposit>(deposit);}

      else {const withdrawal = new Withdrawal (log.transaction!.hash.concat(log.logIndex.toString()) as any as Partial<Withdrawal>);
        ctx.store.save<Withdrawal>(withdrawal);
      }

      }
    }
  }
        
    


  ctx.store.upsert([...deposit.values()]),
  ctx.store.upsert([...withdrawal.values()]) 
      
  
})
          
