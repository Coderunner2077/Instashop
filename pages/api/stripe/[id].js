import Stripe from 'stripe';
import { getSession } from 'next-auth/react';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session)
        return res.status(401).json({ message: "This action requires signing in" });
    const id = req.query.id;

    try {
        if (!id.startsWith('cs_')) {
            throw Error('Incorrect CheckoutSession ID');
        }
        const checkout_session = await stripe.checkout.sessions.retrieve(id);

        res.status(200).json(checkout_session);
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
}