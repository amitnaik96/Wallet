import { getServerSession } from 'next-auth';
import  { authOptions } from '../../lib/auth';

export const GET = async() => {
    try{
        const session = await getServerSession(authOptions);
        if(session.user){
            return Response.json({
                user : session.user
            });
        }
    } catch (_err) {
        return Response.json({
            message : 'You are not logged in!'
        },{
            status : 403
        });
    }
}