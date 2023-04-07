import { prisma } from "~/lib/prisma";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
	const data: {
		email: string,
		password: string,
    } = body;

    const encrypted_password = await bcrypt.hash(data.password, saltRounds);
  
    return await prisma.user.create({
        data: {
            email: data.email,
            password: encrypted_password,
        }
    })
});