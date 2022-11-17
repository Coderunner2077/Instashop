import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let event;

        try {
            const rawBody = await buffer(req);
            const signature = req.headers['stripe-signature'];

            event = stripe.webhooks.constructEvent(
                rawBody.toString(),
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {

        }

        // Successfully constructed event
        console.log('✅ Success:', event.id);

        // Handle event type (add business logic here)
        if (event.type === 'checkout.session.completed') {
            console.log(`💰  Payment received!`);
            // Return a response to acknowledge receipt of the event.
            res.json({ received: true });
        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
            // Return a response to acknowledge receipt of the event.
            res.json({ received: false });
        }


    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}