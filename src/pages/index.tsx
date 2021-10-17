import type {GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { signIn,signOut, useSession } from '../../node_modules/next-auth/client'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { stripe } from '../services/stripe'



  interface HomeProps{
    product:{
      priceId:string;
      amountA:number;
      amountY:number;
    }
  }
  type userProps={
        name:string;
        email:string;
        image:string;
    }


 export default function Home ({product}:HomeProps) {

  const [session]=useSession()
 
 
  return session? (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Olá <a href="https://nextjs.org"> {session.user.name} </a>
        </h1>
          <img src={session.user.image} alt="" />
        <p className={styles.description}>
            
           
        </p>
        <p>
          <button onClick={()=> signOut() } >Sair</button>
        </p>

       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
          
          </span>
        </a>
      </footer>
    </div>

 )
 :(
   <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Faça o login <a href="https://nextjs.org">  </a>
        </h1>
         
        <p className={styles.description}>
           <button onClick={()=>signIn('google')} >Faça o login com o google</button>
          
        </p>

       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
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