const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
//r:1 get all the note
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("error");
  }
});
//r:2 add a new note using post api/ayth/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 5 }),
    body("description", "enter a valid desc").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error");
    }
  }
);

//r:3 update /api/auth/updatenote

router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //find note to be updated
    let note=await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("not found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
  }
);
//r:4 delete /api/notes/delete
router.delete(
    "/deletenote/:id",
    fetchuser,
  
    async (req, res) => {
      const { title, description, tag } = req.body;
      
  
      //find note to be updated and deleted
      let note=await Note.findById(req.params.id);
      if(!note){ return res.status(404).send("not found")}
      //allowed deletion only if user is owner
      if(note.user.toString()!==req.user.id){
          return res.status(401).send("not allowed");
      }
      note=await Note.findByIdAndDelete(req.params.id)
      res.json({"success":"note has been deleted"})
    }
  );

module.exports = router;
