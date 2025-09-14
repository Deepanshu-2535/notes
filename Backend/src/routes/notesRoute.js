import express from "express"
import { getAllNotes,postNote } from "../controllers/notesControllers.js";
const router = express.Router();
router.get("/",getAllNotes);
router.post("/",postNote);
export default router;
