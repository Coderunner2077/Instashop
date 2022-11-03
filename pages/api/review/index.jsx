// pages/api/review/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {

    const session = await getSession({ req });

    if (!session)
        return res.status(401).json({ message: "This action requires signing in" });
    if (req.method === "POST") {
        const { comment, productId, score } = req.body;

        const reviewExists = await prisma.review.findFirst({
            where: {
                productId,
                reviewer: { is: { id: session?.user?.id } }
            }
        });
        if (!!reviewExists)
            return res.status(400).json({ message: "You've already reviewed this product" });

        const result = await prisma.review.create({
            data: {
                comment,
                productId,
                score,
                reviewer: {
                    connect: { id: session?.user?.id }
                }
            },
            include: {
                reviewer: {
                    select: { id: true, name: true, image: true }
                }
            }

        });
        return res.status(200).json(result);
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}