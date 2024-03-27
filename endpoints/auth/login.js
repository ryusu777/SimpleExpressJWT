import express from 'express';
import { findUser } from '../../repositories/userRepositories.js';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

/**
 * @param {express.Router} router
 */
const registerLogin = (router) => {
    router.post(
        '/login', 
        async (req, res) => {
            const foundUser = await findUser(req.body.username, req.body.password)
            console.log(foundUser);

            if (!foundUser) {
                res.status(400).json({
                    message: "Incorrect username or password"
                });
                return;
            }

            const tokenId = randomUUID()

            const token = jwt
                .sign(
                    { username: foundUser.username }, 
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '1h', jwtid: tokenId }
                );

            const refreshToken = jwt
                .sign({ },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1d', jwtid: tokenId})

            res.status(200).json({
                access_token: token,
                refresh_token: refreshToken
            });
        });
};

export {
    registerLogin
}
