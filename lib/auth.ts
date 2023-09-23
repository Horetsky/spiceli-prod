import prisma from "@/prisma/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt"
  },
  jwt: {
    maxAge: 10
  },
  pages: {
    signIn: "/signIn"
  },
  secret: process.env.AUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string }
        if (!email || !password) return null
        
        const user = await prisma.admin.findUnique({
          where: {
            email
          }
        })

        if (!user) return null

        const isPasswordValid: boolean = password === user.password
        if (!isPasswordValid) throw new Error("Неправильний пароль");

        return user
      },
    })
  ]
}