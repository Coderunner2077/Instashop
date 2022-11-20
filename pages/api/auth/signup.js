import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    try {
        switch (req.method) {
            case "POST":
                const { name, username, password } =
                    req.body

                if (!((name && username && password) && password.length >= 1)) {
                    res.status(400).json({
                        message: "Invalid user parameters",
                    })
                    break
                }

                const userExists = await prisma.user.findFirst({
                    where: {
                        username,
                    },
                })

                if (userExists) {
                    res.status(403).json({
                        message: "User already exists",
                    })
                    break
                }

                const user = await prisma.user.create({
                    data: {
                        name: name,
                        username: username,
                        password: bcrypt.hashSync(password, 8)
                    },
                });

                if (!user) {
                    res.status(500).json({
                        message: "Unable to create user account",
                    })
                }

                const account = await prisma.account.create({
                    data: {
                        userId: user.id,
                        type: "credentials",
                        provider: "credentials",
                        providerAccountId: user.id,
                    },
                })

                if (user && account) {
                    res.status(201).json({
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    });
                } else {
                    res.status(500).json({
                        message: "Unable to link account to created user profile",
                    })
                }
                break
            default:
                res.setHeader("Allow", ["POST"]);
                res.status(405).json({
                    message: `Method ${req.method} Not Allowed`,
                })
        }
    } catch (err) {
        res.status(500).json({
            message: err.toString()//"Sorry, a server error has prevented creating your account",
        })
    }
}