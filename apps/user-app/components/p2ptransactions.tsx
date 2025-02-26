import { Card } from '@repo/ui/card';
import { Center } from '@repo/ui/center';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/lib/auth';
import { prisma } from '@repo/db/client';

async function getP2PTransactions () {
    const session = await getServerSession(authOptions); 
    const userId = Number(session?.user?.id);
    const res = await prisma.p2pTransfer.findMany({
        where : { 
            OR : [
                {fromUserId : userId},
                {toUserId : userId}
            ]
        },
        include : {
            toUser : {
                    select : {
                            number : true
                        }
                    },
            fromUser : {
                select : {
                    number : true
                }
            }
        }
    });

    const txns = res.map(t => ({
        amount : t.amount,
        timestamp : t.timestamp,     
        textToDisplay : t.toUserId === userId ? 'Received' : 'Sent',
        deductOrAdd : t.toUserId === userId? '+' : '-'
    }));
    return txns;
}


export const P2PTransactions = async () => {
    const txns = await getP2PTransactions();
    return <div>
                <Center>
                    <div className="mt-5">
                        <Card title="P2P Transactions">
                            <div>
                                {txns.map(t => {
                                    return <P2PDiv 
                                    key={Math.random()*10000}
                                    amount={t.amount} 
                                    timestamp={t.timestamp} 
                                    textToDisplay={t.textToDisplay}  
                                    deductOrAdd={t.deductOrAdd}/>
                                })}
                            </div>
                        </Card>
                    </div>
                </Center>
            </div>
}

const P2PDiv = ({amount, timestamp, textToDisplay, deductOrAdd} : {
    amount : number,
    timestamp : Date,
    textToDisplay : string,
    deductOrAdd : string
}) =>{
    return <div className="flex justify-between w-96 m-5">
                <div>
                    <div className="text-lg font-semibold">{textToDisplay} INR</div>
                    <div className="text-sm font-semibold text-slate-600">{timestamp.toString().slice(0, 15)}</div>
                </div>
                <div className="flex flex-col justify-center text-xl font-semibold">{deductOrAdd} Rs {amount / 100}</div>
            </div>
}