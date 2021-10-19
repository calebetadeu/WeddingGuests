import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import{query as q} from 'faunadb'
import { fauna } from "../../../services/fauna"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_API_KEY,
    }),
   Providers.Google({
     clientId:process.env.GOOGLE_ID_CLIENT,
    clientSecret:process.env.GOOGLE_PUBLIC_KEY
   })
   
  ],   
   jwt:{
     secret:process.env.SIGNING_KEY
   },
   callbacks:{
     async signIn( user, account, profile) {

      const {name}=user
      try{
      await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_name'),
                q.Casefold(user.name)
              )
            )
          ),
          q.Create(
            q.Collection('users'),
            {data:{name}}
          ),
          q.Get(
            q.Match(
              q.Index('user_by_name'),
              q.Casefold(user.name)
            )
          )
        )
      )


      return true
    }  catch (err) {
      console.log(err)
      return false
    }
    },
    
  }
})