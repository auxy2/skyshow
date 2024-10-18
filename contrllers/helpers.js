import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const signToken = (Id) =>
  jwt.sign({ Id }, "iwfgiwbvwjkcnd", {
    expiresIn: "1d",
  });

  export const payload = (user) => {

    // console.log(JWT_ISS, JWT_SECRET);
    // console.log(user)
    const token = jwt.sign(
      { Id: user._id, email: user.email },
      "thi you si sth esimp made lep for m  are  secrete eterces",
      {
        expiresIn: "1d",
        issuer: "SkyShow"
      }
    );
  
    return { user, token };
  };

export const correctPass = async (Candidiatepass, userPass) => {
  return await bcrypt.compare(Candidiatepass, userPass);
};
const sendCookie = (token, res) => {
    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIES_EXP * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true,
        secure: true,
    };
    if (process.env.NODE_ENV === "production") cookieOption.secure = true;
    res.cook;
};