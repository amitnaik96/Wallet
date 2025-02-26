import { prisma } from '@repo/db/client';
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                phone : {label : "Phone number", type: "text", placeholder:"1231231231"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials : any){
                const existingUser = await prisma.user.findFirst({
                    where : {
                        number: credentials.phone,
                    }
                })
                if(existingUser){
                    const validPassword = await bcrypt.compare(credentials.password, existingUser.password);
                    if(validPassword){
                        return {
                            id : existingUser.id.toString(),
                            name : existingUser.name,
                            email : existingUser.email
                        }
                    }
                    return null;
                }

                try {
                    const hashPassword = await bcrypt.hash(credentials.password, 10);
                    const user = await prisma.user.create({
                        data : {
                            number : credentials.phone,
                            password : hashPassword
                        }
                    });

                    return {
                        id : user.id.toString(),
                        name : user.name,
                        email : user.email
                    }
                } catch (err) {
                    console.error(err);
                }
                return null;
            }
        })
    ],
    secret : process.env.JWT_SECRET || "secret",
    callbacks : {
        async session({token, session} : any){
            session.user.id = token.sub;
            return session;
        }
    }
}
