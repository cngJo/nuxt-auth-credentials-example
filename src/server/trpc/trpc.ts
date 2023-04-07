import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

// Middlewares
const isAuthenticated = t.middleware(({ next, ctx }) => {
    if (!ctx.user) {
        throw new TRPCError({code: "UNAUTHORIZED"});
    }

    return next({
        ctx: {
            user: ctx.user,
        },
    });
});


// Define procedures
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);

export const router = t.router;
export const middleware = t.middleware;