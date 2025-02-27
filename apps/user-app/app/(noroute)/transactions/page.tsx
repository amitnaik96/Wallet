import { Center } from '@repo/ui/center';
import { P2PDiv } from '../../../components/p2pdiv';
import { getP2PTransactions } from '../../lib/actions/getP2PTransactions'; 
import { Card } from '@repo/ui/card';


export default async function Transactions() {
    const txns = await getP2PTransactions();

    if(!txns){
        return <div>Loading..</div>
    }

    return <div>
                <Center>
                    <div className="mt-5">
                        <Card title="P2P Transactions">
                            <div>
                                {txns.map((t:any) => (<P2PDiv 
                                    key={Math.random()*10000}
                                    amount={t.amount} 
                                    timestamp={t.timestamp} 
                                    textToDisplay={t.textToDisplay}  
                                    deductOrAdd={t.deductOrAdd}/>
                                ))}
                            </div>
                        </Card>
                    </div>
                </Center>
            </div>
}