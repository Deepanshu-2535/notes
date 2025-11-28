import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import path from "path"

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV!=='production'){
    app.use(cors());
}

app.use(express.json());

app.use("/api/notes",notesRoute);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })
}

connectDB().then(()=>{
    app.listen(PORT,() =>{
        console.log("Server started on port",PORT);
    })
})

