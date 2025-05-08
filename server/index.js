import express from "express";
import { connect } from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routers/user-routes.js';
import transactionRoutes from './routers/transcation-routes.js';
// import Product from "./models/product.model.js";
// import productRoutes from "./routes/product.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get environment variables
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/banking-system";

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// MongoDB connection
connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Banking System API");
});