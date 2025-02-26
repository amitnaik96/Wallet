"use client"
import { Provider } from 'jotai';
import { SessionProvider } from 'next-auth/react';

const Providers = ({children} : {children: React.ReactNode}) => {
 return <Provider>
            <SessionProvider>
                { children }
            </SessionProvider>
        </Provider>   
}

export default Providers;