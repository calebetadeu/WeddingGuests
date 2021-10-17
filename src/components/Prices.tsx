import React, { useEffect, useState } from 'react'
import {signIn,useSession,signOut} from 'next-auth/client'
import { Session } from 'inspector'



interface PriceProps{
    amountA:number;
    amountY:number;
}
interface userProps{
    
        name:string;
        email:string;
        image:string;
}


export default function Prices({amountA,amountY}:PriceProps,{name,email,image}:userProps) {

    const[session]=useSession()    
    const [user,setUser]=useState<userProps>()

   

useEffect(()=>{

    setUser(session?.user)
    }
   )
,[signIn]
console.log(session?.user)
    return (
        <div>
            <div>Bem vindo {user?.name} </div>
            <div>Seu email é : {user?.email} </div>
            <img src={user?.image} alt="" />
            
        

            <button onClick={()=>signIn('google')} >Login com Google</button>
            <button onClick={()=>signOut()} >Sair </button>
        </div>
    )
}
