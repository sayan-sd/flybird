const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 3001;

const http = require("http");
const server = http.createServer(app);

// connect to mongodb
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });
