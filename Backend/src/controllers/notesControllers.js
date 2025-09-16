import Note from "../models/Note.js";
export async function getAllNotes(req,res){
    try{
        const Notes = await Note.find();
        res.status(200).json(Notes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export async function getNoteById(req,res) {
    try{
        const Notes = await Note.findById(req.params.id);
        if(!Notes){
            res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(Notes);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export async function postNote(req,res){
    try{
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error in posting"});
    }
}

export async function updateNote(req,res) {
    try{
        const{title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedNote){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(updatedNote);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error in updating"});
    }
}

export async function deleteNote(req,res) {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id,);
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(deletedNote);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error in deleting"});
    }
}