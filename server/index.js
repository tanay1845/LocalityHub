import express from "express";
import { connectDB } from "./DB/db.js";
import userRoutes from "./routes/User.route.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config({})

connectDB();

app.use(cors({
  origin: "http://localhost:5173",  // 👈 set your frontend origin
  credentials: true                // 👈 allow cookies/headers across origin
}));
app.use(express.json());
app.use(cookieParser())

app.use("/user/api",userRoutes);

app.listen(port, ()=>{
    console.log(`App Listening at port ${port}`)
})

