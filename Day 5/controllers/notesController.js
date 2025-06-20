let notes = [];

export function getNotes(req, res) {
    if(notes.length === 0) { res.status(404).json({ message: 'Notes not found' }); }
    else { res.status(200).json(notes); }
}

export function addNote(req, res) {
    const newNote = {
        id: notes.length+1,
        ...req.body
    };
    notes.push(newNote);
    res.status(201).json({ message: 'Note added successfully'});
}

export function getNoteById(req, res) {
    const id = parseInt(req.params.id);
    const note = notes.find(n => n.id === id);
    if(!note) { res.status(404).json({ message: 'Note not found'}); }
    else{
        res.status(200).json(note);
    }
}

export function updateNoteById(req, res) {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === id);
    if(noteIndex === -1) { res.status(404).json({ message: 'Note not found'}); }
    else { 
        notes[noteIndex] = {
            ...notes[noteIndex],
            ...req.body
        }
        res.status(200).json({ message: 'Note updated successfully'});
    }
}

export function deleteNoteBydId(req, res) {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === id);
    if(noteIndex === -1) { res.status(404).json({ message: 'Note not found'}); }
    else { notes.splice(noteIndex, 1);
        res.status(200).json({ message: 'Note deleted succeffully'});
    }
}