import prisma from '../../../lib/prisma';
import { checkAuth } from '../../../lib/utils';
import { formatError } from '../../../utils';

export default async function handle(req, res) {
    let session;
    let errResponse;
    try {
        session = await checkAuth(req, res);
    } catch (error) { errResponse = res.status(401).json({ message: formatError(error) }) }

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