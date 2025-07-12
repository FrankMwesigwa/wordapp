import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import {testConnection, sequelize} from "./config/db.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
 express.urlencoded({
    extended: true,
  })
);

// Test database connection
testConnection();

// Sync database models
const syncDatabase =
  async () => {
    try {
      await sequelize.sync({
        alter:
          process.env
            .NODE_ENV ===
          "development",
      });
      console.log(
        "Database synced successfully"
      );
    } catch (error) {
      console.error(
        "Error syncing database:",
        error
      );
    }
  };

syncDatabase();

app.use("/api/users", userRoutes);

// Error handling middleware
app.use(
  (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message:
        "Something went wrong!",
    });
  }
);

const PORT =
  process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
