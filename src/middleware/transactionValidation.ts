import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const detailSchema = Joi.object({
    medicine_id: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
})

const createSchema = Joi.object({
    chasier_name: Joi.string().required(),
    order_date: Joi.date().required(),
    transaction_detail: Joi.array().items(detailSchema).min(1).required()
})

const createValidation = (req: Request, res: Response, next: NextFunction) => {
    const validate = createSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        return res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
    }
    next();
}

export { createValidation }