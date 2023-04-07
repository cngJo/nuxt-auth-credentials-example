import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from "#auth";
import { prisma } from '~/lib/prisma';
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret: process.env.NUXT_SECRET,
    providers: [
        // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: 'Email', type: 'email'},
              password: { label: 'Password', type: 'password' }
            },
            async authorize (credentials: any) {
              const email = credentials.email;
              const password = credentials.password;

              const dbUser = await prisma.user.findFirst({
                where: {
                  email: email,
                }
              });

              if (!dbUser) {
                return null;
              }

              if (! bcrypt.compareSync(password, dbUser.password)) {
                return null;
              }

              return dbUser;
            }
        })
    ]
})
