import crypto from "node:crypto";

const uuid = crypto.randomUUID();
console.log("uniqueId :", uuid);

const resetToken = crypto.randomBytes(16).toString("hex");
console.log("resetToken :", resetToken);

const hash = crypto
  .createHash("sha256")
  .update("Some text I would like to be hashed")
  .digest("hex");
console.log("hash :", hash);

const secretKey = "really-secret-such-a-key";
const message = "Some random message";

const signature = crypto
  .createHmac("sha256", secretKey)
  .update(message)
  .digest("hex");

console.log("signature :", signature);

const anotherSignature = crypto
  .createHmac("sha256", secretKey)
  .update(message)
  .digest("hex");

console.log("signatureVerify :", anotherSignature);
