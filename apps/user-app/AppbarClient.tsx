"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Appbar } from '@repo/ui/Appbar';


const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();

    return (
        <Appbar 
            onSignin={signIn} 
            onSignout={ async () => {
                await signOut();
                router.push("/api/auth/signin");
            }}
            user={session.data?.user}
        />
    )
}

export default AppbarClient;