import { createNuxtApiHandler } from "trpc-nuxt";
import { protectedProcedure, publicProcedure, router } from "~/server/trpc/trpc";
import { createContext } from "~/server/trpc/context";
import { TRPCError } from "@trpc/server";
import {z} from "zod";
import bcrypt from "bcrypt";

export const appRouter = router({
    registerUser: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(8),
                passwordConfirm: z.string().min(8)
            })
            .refine(data => data.password === data.passwordConfirm, {
                message: "Passwords don't match",
                path: ["passwordConfirm"],
            })
        )
        .mutation(async ({ input, ctx }) => {
            // TODO: load slatRounds from config.
            const encrypted_password = await bcrypt.hash(input.password, 10);
  
            const dbUser = await ctx.prisma.user.create({
                data: {
                    email: input.email,
                    password: encrypted_password,
                }
            });

            return {
                id: dbUser.id
            };
        }),
    hello: publicProcedure
        .query(({ ctx }) => {
            let greeting = "Hello, fellow unknown";

            if (ctx.user) {
                greeting = `Hello ${ctx.user?.email}`;
            }

            return {
                greeting,
            }
        }),
    userId: protectedProcedure
        .query(async ({ ctx }) => {
            const dbUser = await ctx.prisma.user.findFirst({
                where: {
                    email: ctx.user.email,
                }
            });
            if (!dbUser) {
                throw new TRPCError({code: "BAD_REQUEST"});
            }
            return {
                id: dbUser.id,
            };
        })
});

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext,
});
