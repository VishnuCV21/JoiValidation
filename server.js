const express = require('express');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const productSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().positive().required(),
    category: Joi.string().min(3).max(30).required(),
    inStock: Joi.boolean().required(),
    description: Joi.string().max(200).optional()
});

app.post('/products', (req, res) => {
    const { error } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const product = req.body;
    console.log('Product saved:', product);

    res.status(201).json({ message: 'Product created successfully', product });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
