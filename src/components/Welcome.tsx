import { Head } from 'next/document'
import styles from '../styles/Home.module.css'


interface User{
    name:string;
}

export function Welcome (props:User){
    return(
    <div className={styles.container}>
     

      <main className={styles.main}>
        <h1 className={styles.title}>
         Obrigado  <a href="https://nextjs.org"> {props.name}, </a> sua presença é uma honra
        </h1>
          
        <p className={styles.description}>
           Esperamos Você no Casamento 
           
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
    </div>)
}