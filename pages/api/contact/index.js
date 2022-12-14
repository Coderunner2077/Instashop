// pages/api/contact/index.ts
import mailer from "../../../lib/mailer";

export default async function handle(req, res) {
    if (req.method === "POST") {
        const { name, email, message } = req.body;
        mailer.sendMail({
            from: `${process.env.GMAIL_NAME}<${process.env.GMAIL_ID}>`,
            to: `${process.env.NEXT_PUBLIC_EMAIL}`,
            replyTo: email,
            subject: 'Portfolio App Contact',
            text: `Email from ${name} "${email}": \n ${message}`,
            html: `<h3>Email from ${name} "${email}":</h3><p><pre><b>${message}</b></pre></p>`
        }, (err, info) => {
            if (err)
                res.status(500).send({ message: err.message }); //"Sorry, your message failed to be dilvered"
            else
                res.status(200).send({ message: "Your message has been successfully delivered" });
        });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}