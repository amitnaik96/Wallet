"use server"
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { prisma } from '@repo/db/client';

export async function getP2PTransactions () {
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

    const txns = res.map((t:any) => ({
        amount : t.amount,
        timestamp : t.timestamp,     
        textToDisplay : t.toUserId === userId ? 'Received' : 'Sent',
        deductOrAdd : t.toUserId === userId? '+' : '-'
    }));
    return txns;
}