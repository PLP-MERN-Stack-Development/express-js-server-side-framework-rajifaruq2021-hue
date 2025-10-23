// 1. REQUIRE a bunch of stuff (importing necessary packages)
require('dotenv').config(); // To use the .env file
const express = require('express');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs

// 2. CREATING OUR RESTAURANT (Initializing the Express app)
const app = express();
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000
const API_KEY = process.env.API_KEY; // Our secret handshake for authentication

// AN IN-MEMORY KITCHEN (A simple array of products)
let products = [
    { id: '1', name: 'Laptop', description: 'A powerful laptop', price: 1200, category: 'Electronics', inStock: true },
    { id: '2', name: 'Keyboard', description: 'A mechanical keyboard', price: 100, category: 'Electronics', inStock: true },
    { id: '3', name: 'Book', description: 'A thrilling novel', price: 20, category: 'Books', inStock: false }
];

// OUR FRIENDLY STAFF (Middleware Implementation)

// Middleware to parse JSON bodies (for seasons translator)
app.use(express.json()); 

// Custom Logger Middleware (our diligent receptionist)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request to ${req.url}`);
    next(); // Pass the request to the next staff member in line
});

// Authentication Middleware (our firm but fair security guard)
const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === API_KEY) {
        next(); // The key is correct. You may proceed.
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
    }
};

// Validation Middleware (our meticulous quality checker for new products)
const validateProduct = (req, res, next) => {
    const { name, price, category } = req.body;
    if (name && price && category) {
        next(); // Everything looks good. Proceed.
    } else {
        res.status(400).json({ message: 'Validation Error: Name, price, and category are required.' });
    }
};

// OUR RESTAURANT'S MENU (RESTful API Routes)

// GET all Products (with Filtering, Searching, Pagination)
app.get('/api/products', (req, res) => {
    let filteredProducts = [...products];
    const { category, name, page = 1, limit = 10 } = req.query;

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (name) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }
    
    const startIndex = (page - 1) * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

    res.json(paginatedProducts);
});

// GET a Single Product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// POST - Create a New Product
app.post('/api/products', authenticateApiKey, validateProduct, (req, res) => {
    const newProduct = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description || '',
        price: req.body.price,
        category: req.body.category,
        inStock: req.body.inStock !== undefined ? req.body.inStock : true
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT - Update an Existing Product
app.put('/api/products/:id', authenticateApiKey, validateProduct, (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...req.body };
        res.json(products[productIndex]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE - Delete a Product
app.delete('/api/products/:id', authenticateApiKey, (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// OUR EMERGENCY RESPONSE TEAM (Error Handling)

// This middleware handles routes that don't exist.
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// This is our global error handler. It's the last stop for any errors.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on our end' });
});

// SPRING THE DOORS (Starting the Server)
app.listen(PORT, () => {
    console.log(`Server is running with love on port ${PORT}`);
});