const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");
const Product = require("../models/product.js");
const validateProduct = require("../middlewares.js/ValidateProduct.js"); // Import the validation middleware

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Helper function to process and validate each CSV row
const processRow = (row) => {
  const errors = [];
  if (
    !row["SKU Code"] ||
    !row["Product Name"] ||
    !row["Price"] ||
    !row["HSN Code"]
  ) {
    errors.push("Missing required fields.");
  } else if (isNaN(row["Price"])) {
    errors.push("Price must be a number.");
  }

  return {
    valid: errors.length === 0,
    product: {
      sku_code: row["SKU Code"],
      product_name: row["Product Name"],
      product_description: row["Product Description"] || "",
      price: parseFloat(row["Price"]),
      hsn_code: row["HSN Code"],
    },
    errors,
  };
};

// Route to handle CSV file upload and insert products
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const results = [];
  const errors = [];

  // Process the CSV file stream
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (row) => {
      const { valid, product, errors: rowErrors } = processRow(row);

      if (!valid) {
        errors.push(...rowErrors);
      } else {
        results.push(product);
      }
    })
    .on("end", async () => {
      // Insert valid products into the database
      const insertionErrors = [];
      const successfulInserts = [];

      for (const product of results) {
        try {
          await Product.create(product);
          successfulInserts.push(product);
        } catch (err) {
          insertionErrors.push(`SKU ${product.sku_code} already exists.`);
        }
      }

      // Return response with the number of successful inserts and any errors
      res.json({
        success: `Inserted ${successfulInserts.length} products.`,
        errors: [...errors, ...insertionErrors],
      });
    })
    .on("error", (err) => {
      res
        .status(500)
        .json({ error: "Failed to process the file", details: err.message });
    });
});

// Route to create a product
router.post("/create", validateProduct, async (req, res) => {
  const { sku_code, product_name, product_description, price, hsn_code } =
    req.body;

  try {
    // Check if the SKU Code already exists in the database
    const existingProduct = await Product.findOne({ where: { sku_code } });
    if (existingProduct) {
      console.log(`SKU Code ${sku_code} already exists.`);

      return res
        .status(400)
        .json({ error: `SKU Code ${sku_code} already exists.` });
    }

    // Create and save the product in the database
    const newProduct = await Product.create({
      sku_code,
      product_name,
      product_description: product_description || "", // Default to an empty string if not provided
      price,
      hsn_code,
    });

    // Return success response with the created product details
    return res.status(201).json({
      success: "Product created successfully.",
      product: newProduct,
    });
  } catch (error) {
    // Handle unexpected errors
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to create product.", details: error.message });
  }
});

// Get All Products Endpoint
router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll(); // Fetches all products
    res.json(products); // Returns the list of products as JSON
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Delete Product(s) by SKU Code
router.delete("/products", async (req, res) => {
  console.log("Request Body:", req.body); // Log the entire request body
  const { sku_codes } = req.body;
  console.log("sku_codes:", sku_codes); // Log the sku_codes array

  // Validate sku_codes
  if (!sku_codes || !Array.isArray(sku_codes) || sku_codes.length === 0) {
    return res
      .status(400)
      .json({ error: "Please provide at least one SKU code" });
  }

  try {
    // Delete products with the provided SKU codes
    const deleted = await Product.destroy({
      where: { sku_code: sku_codes },
    });

    // Check if any products were deleted
    if (deleted > 0) {
      res.json({ message: `Deleted ${deleted} product(s) successfully.` });
    } else {
      res
        .status(404)
        .json({ message: "No products found with provided SKU code(s)" });
    }
  } catch (error) {
    console.error("Error deleting products:", error); // Log the error
    res.status(500).json({ error: "Failed to delete product(s)" });
  }
});

module.exports = router;
