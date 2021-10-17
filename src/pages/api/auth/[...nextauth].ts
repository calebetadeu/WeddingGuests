import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import{query as q} from 'faunadb'
import { fauna } from "../../../services/fauna"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_API_KEY,
    }),
   
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
              q.Index('user_by_email'),
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