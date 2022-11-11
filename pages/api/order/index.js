// pages/api/order/index.js

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {

    const session = await getSession({ req });

    if (!session)
        return res.status(401).json({ message: "This action requires signing in" });

    if (req.method === "GET") {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                orders: true
            }
        });
        return res.status(200).json(user.orders);
    } else if (req.method === "POST") {
        const { cartItems } = req.body;
        const items = cartItems.map(cartItem => ({
            productId: cartItem.slug.current,
            quantity: cartItem.quantity,
        }));

        console.log("items: ", items);

        let order = await prisma.order.create({
            data: {
                customer: {
                    connect: { id: session.user.id }
                },
                items: {
                    create: items

                }
            },
            include: {
                items: true
            }
        });
        return res.status(200).json(order);

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end('Method Not Allowed');
    }
}