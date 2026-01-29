import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    description: Joi.string().allow("").optional(),
    inStock: Joi.boolean().default(true),
});

export const validateProduct = (req, res, next) => {
    // If request is multipart/form-data, req.body fields might be strings, so we may need parsing.
    // However, Joi handles string numbers reasonably well, but boolean strings need care.

    // Create a copy of body to manipulate if necessary (e.g. converting 'true' to true)
    const data = { ...req.body };

    const { error } = productSchema.validate(data);
    if (error) {
        // If there's an uploaded file/image, we might want to delete it since validation failed
        // (Implementation skipped for brevity, but good practice)
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};
