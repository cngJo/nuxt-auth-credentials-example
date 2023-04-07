import { inferAsyncReturnType } from "@trpc/server";
import type { H3Event } from "h3";
import { prisma } from "~/lib/prisma";

import { getServerSession } from "#auth";

export async function createContext(event: H3Event) {
    const session = await getServerSession(event);

    return {
        user: session?.user,
        prisma: prisma,
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;