import vine from "@vinejs/vine";
import express from "express";

/**
 * @param {vine.Vine} schema
 * @returns {express.Handler} callback
 */

const bodyValidator = (schema) => {
    return (req, res, next) => { 
        const { error, value } = schema.validate(req.body); 
        const valid = error === undefined; 

        if (valid) {
            request.data = value;
            next();
        }
        else { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',')
            console.log("error", message); 
            res.status(422).json({ error: message }) 
        } 
    }
}

export {
    bodyValidator
}
