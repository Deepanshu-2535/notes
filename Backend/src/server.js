import express from "express";
import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.listen(5001,() =>{
    console.log("Server started");
})
app.get("/",(req,res)=>{
    res.json({message:"Welcome to the home page"})
})
app.use("/notes",notesRoute);