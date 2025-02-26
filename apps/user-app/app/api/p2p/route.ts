import { NextRequest, NextResponse } from 'next/server';
import { p2pTransfer } from '../../lib/actions/p2pTransfer';
import { z } from 'zod';

const p2pSchema = z.object({
    to : z.string(),
    amount : z.number()
});

export async function POST (req: NextRequest) {
    try {
        const body = await req.json();
        const { success } = p2pSchema.safeParse(body);
        if(!success){
            console.log('na');
        }
        const res = await p2pTransfer(body.to, body.amount);
        console.log(res);
         return NextResponse.json({
            message : "done"
         });
    } catch (err) {
        // console.log(err);
        return NextResponse.json({
            message : `${err}`
        },{
            status : 403
        });
    }
}