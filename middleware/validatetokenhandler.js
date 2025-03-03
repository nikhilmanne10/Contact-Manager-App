const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware to validate JWT token for authentication
const validatetoken = asyncHandler(async (req, res, next) => {
    let token;
    let authheader = req.headers.authorization || req.headers.Authorization; // Get the Authorization header

    if (authheader && authheader.startsWith("Bearer")) {  // Check if the token exists and starts with "Bearer"
        token = authheader.split(" ")[1];  // Extract the token from the header

        // Verify the token using the secret key
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {  
            if (err) {
                res.status(401); // Unauthorized error
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;  // Store decoded user data in request object
            next();  // Proceed to the next middleware
        });
    } else {
        res.status(401); // Unauthorized error
        throw new Error("Token is missing or invalid");
    }
});

// Export the validation middleware
module.exports = validatetoken;
