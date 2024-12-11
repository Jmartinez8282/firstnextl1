import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }),
      
      CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
              email: { label: "Email", type: "email", placeholder: "Email" },
              password: { label: "Password", type: "password",placeholder:'Password' }
            },
            async authorize(credentials, req) {
            
              if(!credentials?.email || !credentials?.password) return null;
              // Add logic here to look up the user from the credentials supplied
                const user = await prisma.user.findUnique({where:{email: credentials.email},
                  });
          
                  if(!user) return null;
                  const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword!);
          
                  return passwordMatch ? user:null;
          
                }
              }),
              
              
              
              
            ],
            session: {
              strategy:'jwt'
            },
            callbacks: {
        async signIn({ user, account, profile }) {
          if (account?.provider === 'google') {
            // Allow sign-in
            return true;
          }
          return false;
        },
      }
    }
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}