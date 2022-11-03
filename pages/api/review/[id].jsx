// pages/api/review/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    return new Promise(async (resolve) => {
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ message: "This action requires signing in" })
            return resolve();
        }
        if (req.method === "DELETE") {
            const { id } = req.query;

            const review = await prisma.review.findUnique({
                where: {
                    id
                }
            });
            if (!review) {
                res.status(400).json({ message: "Review with this id doesn't exist" });
                return resolve();
            }
            if (review.reviewerId !== session.user.id) {
                res.status(400).json({ message: "You can't delete someone else's review" });
                return resolve();
            }
            await prisma.review.delete({
                where: {
                    id
                }
            });
            res.status(200).json({ message: "Deleted" })
            resolve();
        } else {
            res.setHeader('Allow', 'DELETE');
            res.status(405).end('Method Not Allowed');
        }
    })



}