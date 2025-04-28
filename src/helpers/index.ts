import crypto from "crypto";

const SECRET = "YOZEFU-REST-API";

export const random = () => crypto.randomBytes(128).toString("base64");
console.log("digested");
export const authentication = (salt: string, password: string) => {
  return crypto

    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
console.log("password hmac");
