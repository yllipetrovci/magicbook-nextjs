import jwt from "jsonwebtoken";

export function generateKlingToken(): string {
    const accessKey = process.env.KLINGAI_ACCESS_KEY;
    const secretKey = process.env.KLINGAI_SECRET_KEY;

    if (!accessKey || !secretKey) {
        throw new Error("Missing KLINGAI_ACCESS_KEY or KLINGAI_SECRET_KEY");
    }

    const now = Math.floor(Date.now() / 1000);

    // Payload typing
    const payload: jwt.JwtPayload = {
        iss: accessKey,         // access key as issuer
        exp: now + 1800,        // 30 min expiration
        nbf: now - 5            // token valid 5 sec earlier
    };

    // Sign JWT using HS256
    return jwt.sign(payload, secretKey, { algorithm: "HS256" });
}
