import express from 'express';
// import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let notes = [];

router.get('/', (req, res) => {
    if(notes.length === 0) { res.status(404).send('Notes not found'); }
    else { res.status(200).json(notes); }
});

router.post('/', (req, res) => {
    const newNote = {
        id: notes.length+1,
        ...req.body
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find(n => n.id === id);
    if(!note) { res.status(404).json({error: 'Note not found'}); }
    else { res.json(note); }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === id);
    if(noteIndex === -1) { res.status(404).json({ error: 'Note not found'}); }
    else {
        notes[noteIndex] = {
            ...notes[noteIndex],
            ...req.body
        };
        res.json(notes[noteIndex]);
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === id);
    if(noteIndex === -1) { res.status(404).json({ error: 'Note not found'}); }
    else {
        notes.splice(noteIndex, 1);
        res.status(204).json('Note deleted successfully');
    }
})

export default router;