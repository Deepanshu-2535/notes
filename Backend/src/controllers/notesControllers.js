export function getAllNotes(req,res){
    res.send("All notes fetched");
}
export function postNote(req,res){
    res.json({message : "Note updated"});
}
//new line of code
