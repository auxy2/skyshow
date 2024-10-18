import User from "../model/user.js"
import asyncWrapper from "../middlewares/async.js"
import { NotFoundError, BadRequestError } from "../utills/error/custom.js";
import { error, sendResponse, success } from "../helpers/response.js";
import { Email } from "../services/mail.js";
import { generateToken } from "../utills/index.js";
import { addMinutes } from "date-fns";
import { correctPass, payload } from "./helpers.js";

export const signUp = asyncWrapper(async (req, res) => {
    try {
        const {
            body: { email }
        } = req;

        const user = await User.findOne({ email })
        if (user) throw new NotFoundError("User already exist with this email");

        const token = generateToken();
        const tokenExpiresIn = addMinutes(new Date(), 10);
        req.body.token = token;
        req.body.tokenExpiresIn = tokenExpiresIn;
        const newUser = await User.create(req.body);
        
        new Email(newUser, token).sendVerification()
        
        return sendResponse(res, 201, "check your email for Verification code");
    } catch (e) {
        return error(res, e?.statusCode || 500, e);
    }
})

export const verifyOtp = asyncWrapper(async (req, res) => {
    try{
    const {
        body: { otp }
    } = req;

   const user = await User.findOne({
        token: otp,
        tokenExpiresIn: {$gt: Date.now()},
        verified: false
   });
        if (!user) throw new NotFoundError("Invalid token or token expires");

        user.token = 0
        user.tokenExpiresIn = new Date();
        user.verified = true;
        await user.save();

        new Email(user).sendWelcome();
        return sendResponse(res, 200, "token verified successfully")

    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})

export const signIn = asyncWrapper(async (req, res) => {
    try {
        const {
            body: { email, password }
        } = req;
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new NotFoundError("No user Found with the email");
        if (!(await correctPass(password, user.password)))
            throw new BadRequestError("Incorrect password");
        
        return success(res, 200, payload(user))
    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})