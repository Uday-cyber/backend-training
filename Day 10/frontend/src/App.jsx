import { useState, useEffect } from "react";
import { loginUser, registerUser, getAllUsers } from "./services/auth";
import { getNotes, addNote, deleteNote } from "./services/notes";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [users, setUsers] = useState([]);

  // =============================
  // AUTH
  // =============================
  const handleRegister = async () => {
    try {
      await registerUser(username, email, password);
      alert("User Registered ✅");
    } catch (error) {
      alert("Register Error");
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      alert("Login Success ✅");
      fetchNotes();
    } catch (error) {
      alert("Login Error ❌");
    }
  };

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  // =============================
  // NOTES
  // =============================
  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data.data || res.data);
  };

  const handleAddNote = async () => {
    await addNote(title, body);
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Backend + React Integration ✅</h1>

      <h2>Register</h2>
      <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <h2>Login</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      <br /><br />

      <h2>Add Note</h2>
      <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="body" onChange={(e) => setBody(e.target.value)} />
      <button onClick={handleAddNote}>Add Note</button>

      <h2>Notes</h2>
      <ul>
        {notes?.map((n) => (
          <li key={n._id}>
            {n.title}
            <button onClick={() => handleDeleteNote(n._id)}>❌</button>
          </li>
        ))}
      </ul>

      <hr />

      <h2>All Users (Protected)</h2>
      <button onClick={fetchUsers}>Get All Users</button>

      <ul>
        {users?.map((u) => (
          <li key={u._id}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
