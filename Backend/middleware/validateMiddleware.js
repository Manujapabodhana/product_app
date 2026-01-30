import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    inStock: Joi.boolean().default(true),
});

export const validateProduct = (req, res, next) => {
    
    const data = { ...req.body };

    const { error } = productSchema.validate(data);
    if (error) {
    
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};
