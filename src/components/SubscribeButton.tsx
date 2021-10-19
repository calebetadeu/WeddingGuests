import React, { useState } from 'react'
import { signIn, useSession } from '../../node_modules/next-auth/client'
import { api } from '../services/api'
import { getStripeJs } from '../services/stripe-js'


interface SubscribeButton{
    price: number
}
interface UserProps{
    name: string;
    email:string
}


export default function SubscribeButton({price}:SubscribeButton) {

    const [session]=useSession()
    const [user,setUser]=useState()


   async function handleSubscribe(){
        if(!session){
            signIn('github')
            return
        }
        try{ 
            const response= await api.post('/subscribe')
            const {sessionId } = response.data
            const stripe = await getStripeJs()
                
            await stripe.redirectToCheckout({sessionId})
        }catch(err){
            alert(err.message)
        }
    }
   

    return (
        <div>
            <h1>Faça o seu Cadastro</h1>
            <form action="get"  >
             <p>Nome:     <input type="text"    /></p> 
             <p>Email:  <input type="email"  />        </p>
            
            </form>
            <h1> Saindo por {price} </h1>
            <button type="button" onClick={handleSubscribe}  >Assinar</button>
        </div>
    )
}
