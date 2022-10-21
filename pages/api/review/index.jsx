// pages/api/review/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const { comment, productId, score } = req.body;

    const session = await getSession({ req });
    console.log("session is: ", session);
    if (!session)
        res.status(401).json({ message: "You have to sign in to review a product" });
    const reviewExists = await prisma.review.findFirst({
        where: {
            productId,
            reviewer: { is: { id: session?.user?.id } }
        }
    });
    if (!!reviewExists)
        res.status(400).json({ message: "You've already reviewed this product" });

    const result = await prisma.review.create({
        data: {
            comment,
            productId,
            score,
            reviewer: {
                connect: { id: session?.user?.id }
            }
        },
    });
    res.status(200).json(result);
}