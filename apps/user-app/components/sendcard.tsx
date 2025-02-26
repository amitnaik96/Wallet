"use client"
import { TextInput } from '@repo/ui/textinput';
import { useState } from 'react';
import { Card } from '@repo/ui/card';
import { Center } from '@repo/ui/center';
import Button from '@repo/ui/button';
import axios from 'axios';

export const SendCard = () => {
    const [amount, setAmount] = useState(0);
    const [number, setNumber] = useState("");

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder="number" label="Number" onChange={val => setNumber(val)}/>
                    <TextInput placeholder="amount" label="Amount" onChange={val => setAmount(Number(val))}/>
                    <div className="flex justify-center mt-4">
                        <Button onClick={
                            async () => { 
                                const res = await axios.post('/api/p2p', {
                                    to : number,
                                    amount
                                })
                                console.log(res.data);
                            }
                        }>
                            Send
                        </Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}

