import { NextFunction, Request, Response } from "express";
import Joi from "joi";

// create a rule/schema for adding new medicine
const createSchema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(1).required(),
    exp_date: Joi.date().required(),
    type: Joi.string().valid("Syrup", "Powder", "Tablet").required(),
});

const createValidation = (req: Request, res: Response, next: NextFunction) => {
    const validate = createSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        return res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
    }
    next();
};

// update a rule/schema for adding new medicine
const updateSchema = Joi.object({
    name: Joi.string().optional(), //for optional
    stock: Joi.number().min(0).optional(),
    price: Joi.number().min(1).optional(),
    exp_date: Joi.date().optional(),
    type: Joi.string().valid("Syrup", "Powder", "Tablet").optional(),
});

const updateValidation = (req: Request, res: Response, next: NextFunction) => {
    const validate = updateSchema.validate(req.body, { abortEarly: false }); // To get all errors
    if (validate.error) {
        return res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), // Error messages separated by comma
        });
    }
    next();
};

export { createValidation, updateValidation };