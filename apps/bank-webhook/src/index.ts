import express from 'express';
import { z } from 'zod';
import { prisma } from '@repo/db/client';

const app = express();
app.use(express.json());

const paymentSchema = z.object({
    token : z.string(),
    userId : z.string(),
    amount: z.string()
});

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: check whether the request has come from hdfc bank add a webhook secret here
    try {
        const { success } = paymentSchema.safeParse(req.body);
        if(!success){
            throw new Error("invalid inputs from bank api!");
        }

        const { token, userId, amount} = req.body;

        await prisma.$transaction([
            prisma.balance.updateMany({
                where : {userId : Number(userId)},
                data : {
                    amount : {
                        increment : Number(amount) 
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where : { token},
                data : {
                    status : "Success"
                }
            })
        ]);

        res.json({
            message : "Captured"
        })
    } catch (err) {
        console.log(err);
        res.status(411).json({
            message : "Error while processing webhook"
        });
    } 
});

app.listen(3003);