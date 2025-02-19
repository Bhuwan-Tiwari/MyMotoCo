const validateProduct = (req, res, next) => {
    console.log('Request Body:', req.body); // Log the request body
    const { sku_code, product_name, product_description, price, hsn_code } = req.body;
    const errors = [];

    // Validate mandatory fields
    if (!sku_code || !product_name || !price || !hsn_code) {
        errors.push('Missing required fields: SKU Code, Product Name, Price, and HSN Code are mandatory.');
    }

    // Convert price to number for validation
    const priceNumber = parseFloat(price);

    // Validate price (must be a number)
    if (isNaN(priceNumber) || priceNumber <= 0) {
        errors.push('Price must be a valid number.');
    }

    // Validate HSN Code format (assuming a simple 8-digit format)
    const hsnRegex = /^[0-9]{8}$/;
    if (!hsnRegex.test(hsn_code?.toString() || '')) {
        errors.push('HSN Code must be a valid 8-digit number.');
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // If validation is successful, move to the next middleware/route handler
    next();
};

module.exports = validateProduct;