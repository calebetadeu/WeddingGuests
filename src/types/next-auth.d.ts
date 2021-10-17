import {Session} from 'next-auth/client'

declare module "next-auth"{
    interface Session{
        user:{
            name: string;
            email: string;
            image: string;
        }     
    }
}