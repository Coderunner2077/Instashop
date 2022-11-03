import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log("cart items in api: ", req.body.cartItems);
        try {
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1LaptyAeE0eLlgEv1zAwxc2u' },
                    { shipping_rate: "shr_1LapvCAeE0eLlgEvC5u8N0v2" }
                ],
                line_items: req.body.cartItems.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/702b07tr/production/').replace('-webp', '.webp')
                        .replace('-jpeg', '.jpeg').replace('-jpg', '.jpg').replace('-png', '.png');
                    console.log("IMAGE", newImage);
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                id: item._id,
                                name: item.name,
                                images: [newImage],

                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}?cancelled=true`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}