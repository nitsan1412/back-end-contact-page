const express = require("express");
require("./src/data/database");
const dotenv = require("dotenv");
const db = require("./src/data/database");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const pageRoutes = require("./src/routes/page");
const teacherRoutes = require("./src/routes/teacher");
const kidRoutes = require("./src/routes/kid");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;
app.use(cors());

db.once("open", () => {
  console.log("Connected to MongoDB");
  app.use(express.json());

  app.use("/auth", authRoutes);
  app.use("/page", pageRoutes);
  app.use("/teacher", teacherRoutes);
  app.use("/kid", kidRoutes);

  // app.use((req, res, next) => {
  //   const error = new Error("Not Found");
  //   error.status = 404;
  //   next(error);
  // });

  // app.use((error, req, res, next) => {
  //   res.status(error.status || 500);
  //   res.json({
  //     error: {
  //       message: error.message,
  //     },
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
