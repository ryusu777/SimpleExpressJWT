import express from 'express';

/**
 * @param {express.Response} res
 */
const success = (res, message) => {
    res.status(200).json({
        message: message
    })
}

/**
 * @param {express.Response} res
 */
const internalServerError = (res, message) => {
    res.status(500).json({
        message: message
    })
}

export default {
    success,
    internalServerError
}
