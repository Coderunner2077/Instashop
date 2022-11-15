import prisma from '../../../lib/prisma';
import cloudinary from "../../../lib/cloudinary";
import { checkAuth } from '../../../lib/utils';
import { formatError } from '../../../utils';

export default async function handle(req, res) {
    let session;
    let errResponse;
    try {
        session = await checkAuth(req, res);
    } catch (error) { errResponse = res.status(401).json({ message: formatError(error) }) }

    let user = session.user;
    let result;

    if (errResponse) return errResponse;
    if (req.method === "DELETE") {
        result = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(`avatar_${user.id}`, async function (err, result) {
                if (err)
                    return reject(new Error("Something went wrong while deleting the avatar..."));

                result = await prisma.user.delete({
                    where: { id: user.id }
                });

                return resolve(result);
            });
        });
        if (result) return res.status(200).json({ message: "You have successfully deleted your profile" });
        else return errResponse;

    } else {
        res.setHeader('Allow', 'DELETE');
        res.status(405).end('Method Not Allowed');
    }
}