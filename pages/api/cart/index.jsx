// pages/api/card/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {

    const session = await getSession({ req });

    if (!session)
        return res.status(200).json([]);
    if (req.method === "GET") {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                cartItems: true
            }
        });
        return res.status(200).json(user.cartItems);
    } else if (req.method === "PUT") {
        const { productId, action, quantity } = req.body;
        let cartItem = await prisma.cartItem.findFirst({
            where: {
                shopper: { is: { id: session.user.id } },
                productId
            }
        });
        if (cartItem)
            cartItem = await prisma.cartItem.update({
                where: { id: cartItem.id },
                data: {
                    quantity: action === "inc" ? cartItem.quantity + quantity : (cartItem.quantity >= 0 ? cartItem.quantity - quantity : 0)
                }
            });
        return res.status(200).json(cartItem);
    } else if (req.method === "POST") {
        const { productId, quantity } = req.body;

        let cartItem = await prisma.cartItem.create({
            data: {
                productId,
                quantity,
                shopper: {
                    connect: { id: session.user.id }
                }
            },
        });
        return res.status(200).json(cartItem);

    } else if (req.method === "DELETE") {
        let count = await prisma.cartItem.deleteMany({
            where: {
                shopper: {
                    is: { id: session.user.id }
                }
            },
        });
        return res.status(200).json(count);
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
        res.status(405).end('Method Not Allowed');
    }
}