import {TypeormDatabase} from '@subsquid/typeorm-store';
import {processor,CONTRACT_ADDRESS} from './processor';
import {Deposit, Withdrawal} from './model';
import * as TornadoContractABI from './abi/TornadoContract';






processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    
    let deposit: Deposit[] = []
    let withdrawal: Withdrawal[] = []
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
            if (log.address !== CONTRACT_ADDRESS || log.topics[0] !== TornadoContractABI.events.Deposit.topic, TornadoContractABI.events.Withdrawal.topic)continue
            let {commitment, leafIndex, timestamp} = TornadoContractABI.events.Deposit.decode(log)
            deposit.push(new Deposit({ id: log.id, 
                
              }))
              await ctx.store.save(deposit)


              let {to, nullifierHash, relayer, fee} = TornadoContractABI.events.Withdrawal.decode(log)
            withdrawal.push(new Withdrawal({ id: log.id, 
                
              }))
              await ctx.store.save(withdrawal)



        }
    }   
    
    
})
          