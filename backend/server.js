const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/user/userRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const cors = require("cors");

dotenv.config();

const app = express();

// Connect Database
dbConnect();

// Middleware
app.use(express.json());

// Cors
app.use(cors());

// User Route
app.use('/api/users', userRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Dynamic PORT - Server
const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server is running on PORT: ${PORT}`));