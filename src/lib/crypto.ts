import * as crypto from "crypto";

const algorithm = "aes-256-ctr";
const secret = process.env.APP_SECRET || 'fallback-key';

export type EncryptedData = {
    iv: string;
    content: string;
};

export const encrypt = (input: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secret, iv);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
    };
}

export const decrypt = (input: EncryptedData) => {
    const decipher = crypto.createDecipheriv(algorithm, secret, Buffer.from(input.iv, "hex"));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(input.content, "hex")), decipher.final()])

    return decrypted.toString();
}