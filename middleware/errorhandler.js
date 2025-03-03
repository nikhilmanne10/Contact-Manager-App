const { constants } = require("../constants");

// Middleware to handle errors globally
const errorhandler = (err, req, res, next) => {
    // Set status code, default to 500 (Internal Server Error) if not set
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Handle different types of errors based on status codes
    switch (statusCode) {
        case constants.Validation_error:
            res.json({ 
                title: "Validation failed", 
                message: err.message, 
                stacktrace: err.stack 
            });
            break;

        case constants.Not_found:
            res.json({ 
                title: "Not found", 
                message: err.message, 
                stacktrace: err.stack 
            });
            break;

        case constants.Unauthorized:
            res.json({ 
                title: "Unauthorized", 
                message: err.message, 
                stacktrace: err.stack 
            });
            break; 

        case constants.Forbidden:
            res.json({ 
                title: "Forbidden", 
                message: err.message, 
                stacktrace: err.stack 
            });
            break;

        case constants.Server_error:
            res.json({ 
                title: "Server error", 
                message: err.message, 
                stacktrace: err.stack 
            });
            break; 

        default:
            console.log("No error, all good!"); // Log when no error is encountered
            break;
    }
};

// Export error handler middleware
module.exports = errorhandler;
