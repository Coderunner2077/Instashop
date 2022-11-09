// pages/api/card/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {

    const session = await getSession({ req });

    if (!session)
        return res.status(200).json([]);
    if (req.method === "DELETE") {
        let count;
        const { productId } = req.query;
        if (productId) {
            const cartItem = await prisma.cartItem.findFirst({
                where: {
                    shopper: {
                        is: { id: session.user.id }
                    },
                    productId

                },
                select: { id: true }
            });
            if (!cartItem)
                return res.status(404).json({ message: "Cart with such id not found" })
            count = await prisma.cartItem.delete({
                where: {
                    id: cartItem.id
                },
            });
        }
        return res.status(200).json(count);
    } else {
        res.setHeader('Allow', 'DELETE');
        res.status(405).end('Method Not Allowed');
    }
}