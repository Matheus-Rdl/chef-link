import express from "express"; // Import the Express framework
import cors from "cors"; // Import CORS to allow cross-origin requests
import { config } from "dotenv"; // Import dotenv to load environment variables
import { Mongo } from "./database/mongo.js"; // Import custom MongoDB connection module
import authRouter from "./auth/auth.js";
import usersRouter from "./modules/users/usersRoutes.js";
import platesRouter from "./modules/plates/platesRoutes.js";
import tablesRouter from "./modules/tables/tablesRoutes.js";
import ordersRouter from "./modules/orders/ordersRoutes.js";

config(); // Load environment variables from .env into process.env

// Main function to start the server
async function main() {
  const hostname = "localhost";
  const port = 3001;

  const app = express(); // Create an instance of the Express application

  // Connect to MongoDB using custom module
  const mongoConnection = await Mongo.connect({
    mongoConnectionString: process.env.MONGO_CS,
    mongoDbName: process.env.MONGO_DB_NAME,
  });

  // Print the connection result (success message or error)
  console.log(mongoConnection);

  // Middleware to parse JSON bodies in requests
  app.use(express.json());

  // Middleware to allow requests from other origins
  app.use(cors());

  // Root route - responds with a welcome message
  app.get("/", (req, res) => {
    res.send({
      success: true,
      statusCode: 200,
      body: "Welcome to ChefLink!",
    });
  });

  // Routes
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/plates", platesRouter);
  app.use("/tables", tablesRouter);
  app.use("/orders", ordersRouter);

  // Start the server and listen on the defined port
  app.listen(port, () => {
    //console.log(`Server running on: http://${hostname}:${port}`);
  });
}

main(); // Run the main function
