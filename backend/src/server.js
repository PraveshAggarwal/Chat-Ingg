import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser()); // to use cookie gor token

app.use("/api/auth", authRoutes)
app.use("api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    });