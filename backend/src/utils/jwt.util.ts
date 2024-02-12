import jwt from "jsonwebtoken";

export function verifyJWT<T>(token: string, secret: string): T | null {
    const key = Buffer.from(secret, "base64").toString("ascii")
    try {
        return jwt.verify(token, key) as T
    } catch (err) {
        return null
    }
}

export default { verifyJWT }
