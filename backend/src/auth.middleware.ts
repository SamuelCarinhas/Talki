import { verifyJWT } from "./utils/jwt.util";
import { AccessToken } from "./utils/types.util";
import logger from "./utils/logger.util";

const JWT_ACCESS_SECRET = String(process.env.JWT_ACCESS_SECRET)

const verifyVerificationToken = <T>(token: string) => verifyJWT<T>(token, JWT_ACCESS_SECRET);

const authorize = (decoder: any, token: string, cb: (user: AccessToken) => void) => {
    if (!token) return;
    const decoded = decoder(token);
    if (decoded) cb(decoded)
    return;
}

export function authorizeAccount(token: string, cb: (user: AccessToken) => void) {
    authorize(verifyVerificationToken<AccessToken>, token, cb);
}


export default { authorizeAccount }
