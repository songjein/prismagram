import { adjectives, nouns } from "./words";

import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor((Math.random()* adjectives.length));
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mg(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "jein@prismagram.com",
    to: address,
    subject: "Login Secret for prismagram",
    html: `Hello! Your login secret is <strong>${secret}</strong>. <br/>copy paste on the website/app to login.`
  }
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);