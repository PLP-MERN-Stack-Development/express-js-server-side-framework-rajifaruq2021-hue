________________________________________
Marketplace RESTful API (Week 2 Assignment)
This project is a comprehensive RESTful API for managing marketplace products, built with Node.js and Express.js. It fulfills the requirements for the Week 2 MERN stack development assignment, demonstrating core backend concepts like CRUD operations, middleware, authentication, and error handling.
Features
•	Full CRUD Functionality: Create, Read, Update, and Delete products.
•	Authentication Middleware: Secure POST, PUT, and DELETE routes using a secret API key.
•	Validation Middleware: Ensure that new or updated products contain all required fields (name, price, category).
•	Logging Middleware: Log all incoming requests with a timestamp and URL.
•	Advanced Filtering: Filter products by category using query parameters.
•	Advanced Searching: Search for products by name using query parameters.
•	Pagination: Support for page and limit query parameters to paginate results.
•	Robust Error Handling: Gracefully handles non-existent routes and other server-side errors.
Setup and Installation
Follow these steps to get the project running on your local machine.
1. Prerequisites
Make sure you have Node.js installed on your machine (version 18 or higher is recommended).
2. Clone the Repository
Clone this repository to your local machine:
code Bash
downloadcontent_copy
expand_less
    git clone <github-repository-url>
  
3. Install Dependencies
Navigate into the project directory and install the necessary npm packages:
code Bash
downloadcontent_copy
expand_less
    cd <repository-folder-name>
npm install
  
4. Set Up Environment Variables
Create a new file named .env in the root of the project. This file will hold your secret API key and port number. Add the following content to it:
code Code
downloadcontent_copy
expand_less
    PORT=3000
API_KEY=super-secret-key
  
5. Start the Server
Run the following command to start the Express server:
code Bash
downloadcontent_copy
expand_less
    node server.js
  
You should see a confirmation message in your terminal: Server is running with love on port 3000. The API is now ready to accept requests.
________________________________________
API Endpoints Documentation
Here are the available endpoints and how to use them.
Get All Products
Retrieves a list of all products. Supports filtering, searching, and pagination.
•	Method: GET
•	URL: /api/products
•	Query Parameters (Optional):
o	category (string): Filters products by category. (e.g., /api/products?category=Electronics)
o	name (string): Searches for products whose name contains the provided string. (e.g., /api/products?name=laptop)
o	page (number): The page number for pagination (default: 1).
o	limit (number): The number of items per page (default: 10).
•	Success Response:
o	Code: 200 OK
o	Content: An array of product objects.
Get a Single Product by ID
Retrieves a specific product by its unique ID.
•	Method: GET
•	URL: /api/products/:id
•	Success Response:
o	Code: 200 OK
o	Content: A single product object.
•	Error Response:
o	Code: 404 Not Found
o	Content: { "message": "Product not found" }
Create a New Product
Creates a new product. Requires authentication.
•	Method: POST
•	URL: /api/products
•	Headers (Required):
o	x-api-key: super-secret-key
•	Request Body (Required):
code JSON
downloadcontent_copy
expand_less
    {
  "name": "New Gadget",
  "description": "The latest and greatest gadget.",
  "price": 299,
  "category": "Electronics",
  "inStock": true
}
  
•	Success Response:
o	Code: 201 Created
o	Content: The newly created product object with its unique ID.
Update an Existing Product
Updates an existing product by its unique ID. Requires authentication.
•	Method: PUT
•	URL: /api/products/:id
•	Headers (Required):
o	x-api-key: super-secret-key
•	Request Body (Required):
code JSON
downloadcontent_copy
expand_less
    {
  "name": "Updated Gadget Name",
  "price": 350,
  "category": "Electronics"
}
  
•	Success Response:
o	Code: 200 OK
o	Content: The full, updated product object.
Delete a Product
Deletes a product by its unique ID. Requires authentication.
•	Method: DELETE
•	URL: /api/products/:id
•	Headers (Required):
o	x-api-key: super-secret-key
•	Success Response:
o	Code: 204 No Content

