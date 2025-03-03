const mongoose = require("mongoose");

// Function to establish a connection to the MongoDB database
const connectdb = async () => {
    try {
        // Attempt to connect using the connection string from environment variables
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);

        // Log the successful connection details (host and database name)
        console.log("database connected:",
            connect.connection.host,
            connect.connection.name);
    } catch (err) {
        // Log any connection errors
        console.log(err);
        
        // Exit the process with a failure status (1) if the connection fails
        process.exit(1);
    }
};

// Export the connectdb function to be used in other parts of the application
module.exports = connectdb;
