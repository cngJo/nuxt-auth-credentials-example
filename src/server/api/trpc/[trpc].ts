import { createNuxtApiHandler } from "trpc-nuxt";
import { protectedProcedure, publicProcedure, router } from "~/server/trpc/trpc";
import { createContext } from "~/server/trpc/context";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
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
