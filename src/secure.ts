import crypto from "crypto"

export const secure = crypto.randomBytes(60).toString("hex")
