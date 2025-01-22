/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH={
    providers:[
       CredentialsProvider({
           name:"Email",
           credentials:{
               username:{label:'email' , type:'text' , placeholder:'Email'},
               password:{label:'password' , type:'password' , placeholder:'Password'}
           },
           async authorize(credentials:any){
               console.log(credentials);
               
               return{
                   id:"1", 
                   name:credentials.username,
                   password:credentials.password
               }
           }
       }),
       GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID || "",
        clientSecret:process.env.GOOGLE_CLIENT_SECRET || "",

       }),
       Github({
        clientId:process.env.GOOGLE_CLIENT_ID || "",
        clientSecret:process.env.GOOGLE_CLIENT_SECRET || "",
    
       })
    ]
    ,
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid
          }
          return session
      }
    }
   }