"use server"
import { prisma } from '@repo/db/client';
import { authOptions } from '../auth';
import  { getServerSession } from 'next-auth';

export const createOnRampTxn = async (provider: string, amount : number) => {
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id){
        return {
            message : "unauthenticated request"
        }
    }

    const token = (Math.random()*100).toString();
    const txns = await prisma.onRampTransaction.create({
        data : {
            userId : Number(session?.user.id),
            amount : amount*100,
            provider,
            token : token,
            startTime : new Date(),
            status : "Processing"
        }
    });

    return {
        message : "Done"
    }
}