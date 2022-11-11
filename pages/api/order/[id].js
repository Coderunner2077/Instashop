// pages/api/card/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const fetchOrder = async (session, id) => {
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            customer: true
        }
    });
    if (!order)
        throw new Error("Sorry, order with such id not found");
    if (order.customer.id !== session.user.id)
        throw new Error("Sorry, you cannot view someone else's order");

    return order;
}

export default async function handle(req, res) {

    const session = await getSession({ req });

    if (!session)
        return res.status(403).json({ message: "This action requires signing in" });
    const { id } = req.query;
    if (req.method === "GET") {
        let order;
        try {
            order = await fetchOrder(session, id);
        } catch (error) {
            return res.status(error.message.match("found") ? 404 : 403).json({ message: error.message });
        }
        return res.status(200).json(order);
    } else if (req.method === "DELETE") {
        let order;
        try {
            order = await fetchOrder(session, id);
        } catch (error) {
            return res.status(error.message.match("found") ? 404 : 403).json({ message: error.message });
        }
        let count = await prisma.order.delete({
            where: {
                id: order.id
            },
        });

        return res.status(200).json(count);
    } else {
        res.setHeader('Allow', ["GET", 'DELETE']);
        res.status(405).end('Method Not Allowed');
    }
}