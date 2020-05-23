import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";

import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";

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
    subject: "Helloooo",
    html: `Hello! Your login secret is ${secret}. <b>copy paste</b>`
  }
  return sendMail(email);
};