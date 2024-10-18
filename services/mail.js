import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import readFileSync from "../helpers/fileReader.js";
import { token } from "morgan";

export const sendMail = "this is not it";

dotenv.config();

const { USER_MAIL, MAIL_PASS, MAIL_PORT, } = process.env;
const year = new Date().getFullYear();

export class Email {
  constructor(user, token) {
    this.to = user.email;
    this.lastName = user.lastName;
    this.token = token;
    this.year = year;
    this.from = `Skyshow <noreply@solutionsplatforms.com>`;
  }

  newTransport() {
    console.log("Mailtrap");
    return nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 465,
      secure: true,
      auth: {
        user: "api",
        pass: "b0203ff88303ffa3eaf6694ab4cbecbf"
      }
    });
  }

  async send(template, subject) {
    try {
      const html = readFileSync(`./mail/${template}.html`);
      const Htmltemplate = Handlebars.compile(html);

      const data = {
        name: this.lastName,
        token: this.token,
        date: this.year
      };
      const emailBody = Htmltemplate(data);

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html: emailBody
      };
      console.log("Sending email to:", this.to);
        await this.newTransport().sendMail(mailOptions);
        console.log("Email Successfully Sent");
    } catch (e) {
      console.error("Error sending email:", e); // Log the error
    }
  }

  async sendWelcome() {
    await this.send("Welcome", "WELCOME TO SOLUTIONS PLATFORMS!");
  }

  async sendVerification() {
    await this.send("Verification", "ACCOUNT VERIFICATION");
  }

  async sendPasswordReset() {
    await this.send("PasswordReset", "PASSWORD RESET");
  }

  async sendSuccessReset() {
    await this.send("PasswordResetSuccess", "PASSWORD RESET SUCCESSFULL");
  }

  async sendToken() {
    await this.send("Verification", "ACCOUNT VERIFICATION");
  }
}
