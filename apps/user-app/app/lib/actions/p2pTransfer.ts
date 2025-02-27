"use server"
import { prisma } from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { Prisma } from '@prisma/client';

export async function p2pTransfer(to: string, amount: number) {
    amount *= 100;
    console.log(to);
    console.log(amount);
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx: any) => {
        // Lock solution
        const query = Prisma.sql`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        await tx.$queryRaw(query);
        // await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`; //here sql injection can happen

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
        });

        // simulating multiple requests(add delay aroud 2sec) at a time for negative balance
        // console.log("before sleep");
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // console.log("after sleep");

        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
        }
        
        
        
        
        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
        });
        
        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
        });

        await tx.p2pTransfer.create({
            data : {
                toUserId : toUser.id,
                fromUserId : Number(from),
                amount,
                timestamp: new Date()
            }
        })
    });
    return {
        message : "Done"
    }
}