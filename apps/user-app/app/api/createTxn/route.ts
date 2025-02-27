import { createOnRampTxn } from '../../lib/actions/createOnRampTransaction';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bodySchema = z.object({
    provider : z.string(),
    amount: z.number()
});

export async function POST (req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
        const { success } = bodySchema.safeParse(body);
        if(!success){
            throw new Error("invalid inputs!");
        }

        const { provider, amount} = body;
        const res = await createOnRampTxn(provider, amount);
        return NextResponse.json({
            message : res.message
        })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message : 'Could not create transaction!'
        },{ 
            status : 411
        })
    }
}