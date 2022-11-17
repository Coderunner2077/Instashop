import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
    service: "Gmail",
    secure: process.env.NEXT_PUBLIC_APP_ENV === "production" ? true : false,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_SECRET
    },
    tls: {
        rejectUnauthorized: process.env.NEXT_PUBLIC_APP_ENV === "production" ? true : false
    },
    port: process.env.NEXT_PUBLIC_APP_ENV === "production" ? 465 : 587
});

export default mailer;