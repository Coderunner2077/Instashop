import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin', // Error code passed in query string as ?error=
    },
    callbacks: {
        session: async ({ session, token, user }) => {
            session = {
                ...session,
                user: {
                    id: user.id,
                    ...session.user
                }
            }
            return session
        },
        redirect: async ({ url, baseUrl }) => {
            // Avoids having callback url passed more than once
            if (baseUrl.match(/(\?|&)callbackUrl=/)) return baseUrl;
            // Allows relative callback URLs
            else if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    secret: process.env.SECRET
}

export default NextAuth(authOptions)