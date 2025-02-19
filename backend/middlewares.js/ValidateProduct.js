const validateProduct = (req, res, next) => {
    console.log('Request Body:', req.body); 
    const { sku_code, product_name, product_description, price, hsn_code } = req.body;
    const errors = [];

    if (!sku_code || !product_name || !price || !hsn_code) {
        errors.push('Missing required fields: SKU Code, Product Name, Price, and HSN Code are mandatory.');
    }

    const priceNumber = parseFloat(price);

    if (isNaN(priceNumber) || priceNumber <= 0) {
        errors.push('Price must be a valid number.');
    }

    const hsnRegex = /^[0-9]{8}$/;
    if (!hsnRegex.test(hsn_code?.toString() || '')) {
        errors.push('HSN Code must be a valid 8-digit number.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = validateProduct;