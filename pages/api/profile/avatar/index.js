import prisma from '../../../../lib/prisma';
import cloudinary from "../../../../lib/cloudinary";
import { checkAuth } from '../../../../lib/utils';
import { formatError } from '../../../../utils';

export default async function handle(req, res) {
    let session;
    let errResponse;
    try {
        session = await checkAuth(req, res);
    } catch (error) { errResponse = res.status(401).json({ message: formatError(error) }) }

    let user = session.user;

    if (errResponse) return errResponse;
    if (req.method === "PUT") {
        const { file } = req.body;
        try {
            user = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file, {
                    public_id: `avatar_${user.id}`,
                    ovewrite: true,
                    resource_type: "image",
                    height: 150, width: 150, crop: "fill"
                }, async function (error, result) {
                    if (error || !result)
                        return reject(new Error("Something went wrong with the upload..."))

                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            image: result.secure_url
                        }
                    });

                    return resolve(user);
                });
            });
        } catch (error) { errResponse = res.status(500).json({ message: "Oops, server wasn't able to process your image" }) }

        if (user) return res.status(200).json(user);
        else return errResponse;
    } else if (req.method === "DELETE") {
        user = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(`avatar_${user.id}`, async function (err, result) {
                if (err)
                    return reject(new Error("Something went wrong while deleting the avatar..."));

                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        image: null
                    }
                });

                return resolve(user);
            });
        });
        if (user) return res.status(200).json(user);
        else return errResponse;

    } else {
        res.setHeader('Allow', 'PUT');
        res.status(405).end('Method Not Allowed');
    }
}