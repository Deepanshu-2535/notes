import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(ratelimiter);
app.get("/",(req,res)=>{
    res.json({message:"Welcome to the home page"})
})
app.use("/notes",notesRoute);
connectDB().then(()=>{
    app.listen(5001,() =>{
        console.log("Server started");
    })
})