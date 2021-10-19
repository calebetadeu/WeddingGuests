import type {GetStaticProps } from 'next'

import React, { useEffect, useState } from 'react'
import {  useSession } from '../../node_modules/next-auth/client'


import { stripe } from '../services/stripe'


import { LoginScreen } from '../components/LoginScreen'
import { Head } from 'next/document'
import { Welcome } from '../components/Welcome'



  interface HomeProps{
    product:{
      priceId:string;
      amountA:number;
      amountY:number;
    }
  }
interface UserProps{
  name:string
}

 export default function Home ({product}:HomeProps) {

  const [session]=useSession()
  const [user,setUser]=useState<UserProps>()



  return session? (
   <Welcome  name={session.user.name} />
  )

 
 :(
  <LoginScreen/>
)
 
}



export const getStaticProps:GetStaticProps  = async()=>{
  const priceA= await stripe.prices.retrieve('price_1JgDedDME4ivVO93wn84L70z')
  const priceY= await stripe.prices.retrieve('price_1JkrdaDME4ivVO93f0j69RwX')
  const product={
    priceId:priceA.id,
  
    amountA:new Intl.NumberFormat('en',{
      style:'currency',
      currency:'USD',
    }).format(priceA.unit_amount/100),
    amountY:new Intl.NumberFormat('en',{
      style:'currency',
      currency:'USD',
    }).format(priceY.unit_amount/100)
  }
    return{
      props:{
        product,
      },
      revalidate:60 *60 *24 //24 hours
    }
}