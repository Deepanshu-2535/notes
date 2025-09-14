import express from "express";
import notesRoute from "./routes/notesRoute.js";
const app = express();
app.listen(5001,() =>{
    console.log("Server started");
})
app.get("/",(req,res)=>{
    res.json({message:"Welcome to the home page"})
})
app.use("/notes",notesRoute);

