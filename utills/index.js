import crypto from "crypto"

export const generateToken = () => {
  const randomBytes = crypto.randomBytes(6);
  const randomInt = parseInt(randomBytes.toString("hex"), 16);
  const token = randomInt % Math.pow(10, 6);
  return token.toString().padStart(6, "0");
};
///////  Create A Bearer Token For Athothorization Headers ////
