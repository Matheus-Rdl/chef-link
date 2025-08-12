// Authentication System Implementation
// ===================================

// Importing required Node.js modules
import express from "express"; // Express web framework
import passport from "passport"; // Authentication middleware
import LocalStrategy from "passport-local"; // Username/password strategy
import crypto from "crypto"; // Cryptographic functions
import jwt from "jsonwebtoken"; // JSON Web Token implementation
import { Mongo } from "../database/mongo.js"; // MongoDB connection handler
import { ObjectId } from "mongodb"; // MongoDB ObjectId constructor

// Defining MongoDB collection name for user data
const collectionName = "users";

// Passport Local Strategy Configuration
// ====================================
passport.use(
  new LocalStrategy(
    // Configures the strategy to use 'username' as the login field
    { usernameField: "username" },

    // Authentication verification function
    async (username, password, callback) => {
      // Query MongoDB for user by username
      const user = await Mongo.db
        .collection(collectionName)
        .findOne({ username: username });

      // Return failure if user not found
      if (!user) {
        return callback(null, false);
      }

      // Get the salt buffer from user document
      const saltBuffer = user.salt.buffer;

      // Hash the provided password using PBKDF2
      crypto.pbkdf2(
        password, // Plaintext password input
        saltBuffer, // User's unique salt
        310000, // Iteration count
        16, // Key length
        "sha256", // Hashing algorithm
        (err, hashedPassword) => {
          // Handle hashing errors
          if (err) {
            return callback(null, false);
          }

          // Convert stored password to Buffer
          const userPasswordBuffer = Buffer.from(user.password.buffer);

          // Compare hashes securely
          if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            return callback(null, false);
          }

          // Remove sensitive fields before returning user
          const { password, salt, ...rest } = user;
          return callback(null, rest);
        }
      );
    }
  )
);

// Express Router Configuration
// ===========================
const authRouter = express.Router();

// User Registration Endpoint
// =========================
authRouter.post("/signup", async (req, res) => {
  // Check for existing username
  const checkUser = await Mongo.db
    .collection(collectionName)
    .findOne({ username: req.body.username });

  // Return error if username exists
  if (checkUser) {
    return res.status(500).send({
      success: false,
      statusCode: 500,
      body: {
        text: "User already exists!",
      },
    });
  }

  // Generate new random salt
  const salt = crypto.randomBytes(16);

  // Hash the provided password
  crypto.pbkdf2(
    req.body.password, // Registration password
    salt, // New salt
    310000, // Iterations
    16, // Key length
    "sha256", // Algorithm
    async (err, hashedPassword) => {
      // Handle hashing errors
      if (err) {
        return res.status(500).send({
          success: false,
          statusCode: 500,
          body: {
            text: "Error on crypto password!",
            err: err,
          },
        });
      }

      // Insert new user document
      const result = await Mongo.db.collection(collectionName).insertOne({
        fullname: req.body.fullname,
        username: req.body.username,
        password: hashedPassword,
        salt,
      });

      // If insertion successful
      if (result.insertedId) {
        // Retrieve the created user
        const user = await Mongo.db
          .collection(collectionName)
          .findOne({ _id: new ObjectId(result.insertedId) });

        // Generate JWT token
        const token = jwt.sign(user, "secret");

        // Return success response
        return res.send({
          success: true,
          statusCode: 200,
          body: {
            text: "User registered correctly!",
            token,
            user,
            logged: true,
          },
        });
      }
    }
  );
});

// User Login Endpoint
// ==================
authRouter.post("/login", (req, res) => {
  // Authenticate using passport local strategy
  passport.authenticate("local", (error, user) => {
    // Handle authentication errors
    if (error) {
      return res.status(500).send({
        success: false,
        statusCode: 500,
        body: {
          text: "Error during authentication",
          error,
        },
      });
    }

    // Handle invalid credentials
    if (!user) {
      return res.status(400).send({
        success: false,
        statusCode: 400,
        body: {
          text: "Credentials are not correct!",
          error,
        },
      });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign(user, "secret");

    // Return success response
    return res.status(200).send({
      success: true,
      statusCode: 200,
      body: {
        text: "User logged correctly!",
        user,
        token,
      },
    });
  })(req, res); // Immediately invoke middleware
});

// Export the auth router
export default authRouter;
