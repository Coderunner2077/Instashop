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
        const { username } = req.body;

        const userExists = await prisma.user.findFirst({
            where: { username }
        });
        if (userExists)
            return res.status(403).json({ message: "Such username already exists" })

        user = await prisma.user.update({
            where: { id: user.id },
            data: {
                username
            }
        });

        return res.status(200).json(user);
    } else {
        res.setHeader('Allow', 'PUT');
        res.status(405).end('Method Not Allowed');
    }
}