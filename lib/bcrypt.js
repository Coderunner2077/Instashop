import bcrypt from "bcryptjs";

export const confirmPasswordHash = (plainPassword, hashedPassword) => {
    return new Promise(resolve => {
        bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
            resolve(res);
        });
    })
}
