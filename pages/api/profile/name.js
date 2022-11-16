import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handle(req, res) {
    let errResponse;
    const session = await getSession({ req });

    if (!session)
        return res.status(401).json({ message: "This action requires signing in" });

    let user = session.user;

    if (errResponse) return errResponse;
    if (req.method === "PUT") {
        const { name } = req.body;

        user = await prisma.user.update({
            where: { id: user.id },
            data: {
                name
            }
        });

        return res.status(200).json(user);
    } else {
        res.setHeader('Allow', 'PUT');
        res.status(405).end('Method Not Allowed');
    }
}