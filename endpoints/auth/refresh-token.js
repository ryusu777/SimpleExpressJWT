import express from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';

/**
 * @param {express.Router} router
 */
const registerRefreshToken = (router) => {
    router.post(
        '/refresh-token', 
        async (req, res) => {
            const authHeader = req
                .header("Authorization")
                ?.split(' ');

            if (!authHeader || authHeader.length < 2) {
                res.sendStatus(401);
                return;
            }

            if (authHeader[0] !== "Bearer") {
                res.sendStatus(401);
                return;
            }

            if (authHeader[1] === undefined) {
                res.sendStatus(401);
                return;
            }

            const refreshTokenHeader = authHeader[1];

            try {
                const decodedRefreshToken = jwt.verify(
                    refreshTokenHeader, 
                    process.env.JWT_SECRET_KEY);

                const decodedAccessToken = jwt.verify(
                    req.body.access_token, 
                    process.env.JWT_SECRET_KEY,
                    {
                        ignoreExpiration: true
                    });

                if (decodedRefreshToken.jti !== decodedAccessToken.jti) {
                    res.status(400).json({
                        message: "Invalid access token or refresh token"
                    });
                    return;
                }

                const tokenId = randomUUID()

                const token = jwt
                    .sign(
                        { username: decodedAccessToken.username }, 
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
            } catch (e) {
                res.status(400).json({
                    message: e.message
                });
            }
        });
};

export {
    registerRefreshToken
}
