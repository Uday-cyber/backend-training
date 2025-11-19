import API from "./api";

// GET ALL NOTES
export const getNotes = () => API.get("/notes");

// CREATE NOTE
export const addNote = (title, body) =>
  API.post("/notes", { title, body });

// DELETE NOTE
export const deleteNote = (id) =>
  API.delete(`/notes/${id}`);
