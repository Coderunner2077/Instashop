import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import { confirmPasswordHash } from "../../../lib/bcrypt";
import { randomUUID } from 'crypto'
import Cookies from 'cookies'
import { encode, decode } from 'next-auth/jwt'

const fromDate = (time, date = Date.now()) => {
    return new Date(date + time * 1000)
}

const adapter = PrismaAdapter(prisma);

export const authOptions = (req, res) => ({
    cookie: {
        secure: process.env.NEXT_PUBLIC_APP_ENV && process.env.NEXT_PUBLIC_APP_ENV === 'production'
    },
    jwt: {
        maxAge: 10 * 60 * 24 * 30,
        encode: async (token, secret, maxAge) => {
            if (req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
                const cookies = new Cookies(req, res)

                const cookie = cookies.get('next-auth.session-token')

                if (cookie) return cookie; else return '';

            }
            // Revert to default behaviour when not in the credentials provider callback flow
            return encode(token, secret, maxAge)
        },
        decode: async (token, secret) => {
            if (req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
                return null
            }

            // Revert to default behaviour when not in the credentials provider callback flow
            return decode(token, secret)
        }
    },
    adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            username: credentials.username
                        }
                    });

                    if (!user) return null;

                    //Compare the hash
                    const res = await confirmPasswordHash(credentials.password, user.password);
                    let userAccount = null;
                    if (res === true) {
                        userAccount = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            username: user.username
                        };
                        return userAccount;
                    }
                    else {
                        console.log("Invalid username and/or password");
                        return null;
                    }

                }
                catch (err) {
                    console.log("Authorize error:", err);
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin', // Error code passed in query string as ?error=
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
            if (req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
                if (user) {
                    const sessionToken = randomUUID()
                    const sessionExpiry = fromDate(10 * 60 * 24 * 30)

                    await adapter.createSession({
                        sessionToken,
                        userId: user.id,
                        expires: sessionExpiry
                    });

                    const cookies = new Cookies(req, res)

                    cookies.set('next-auth.session-token', sessionToken, {
                        expires: sessionExpiry
                    })
                }
            }

            return true;
        },
        session: async ({ session, token, user }) => {
            console.log("token: ", token);
            session = {
                ...session,
                user: {
                    id: user.id,
                    username: user.username,
                    ...session.user
                }
            }
            return session;
        },
        redirect: async ({ url, baseUrl }) => {
            // Avoids having callback url passed more than once
            if (baseUrl.match(/(\?|&)callbackUrl=/)) return baseUrl;
            // Allows relative callback URLs
            else if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    secret: process.env.SECRET
})

export default async function auth(req, res) {
    const options = authOptions(req, res);
    return await NextAuth(req, res, options)
}