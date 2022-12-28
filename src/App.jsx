import { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";

const App = () => {
  const [notes, SetNotes] = useState([]);
  const [sort, SetSort] = useState(false);
  const [currentNoteTitle, SetCurrentNoteTitle] = useState("");
  const [currentNoteBody, SetCurrentNoteBody] = useState("");
  const [currentNoteDate, SetCurrentNoteDate] = useState("");

  // add a new note to arr
  const CreateNewNote = () => {
    SetNotes((prev) => [
      ...prev,
      { title: currentNoteTitle, body: currentNoteBody, date: currentNoteDate },
    ]);
  };

  // sort notes arr by date -> down
  const SortDownFunc = (a, b) => {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
  };

  // sort notes arr by date -> up
  const SortUpFunc = (a, b) => {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    return dateA < dateB ? 1 : -1;
  };

  // when the notes arr get sorted -> render the notes in this order
  useEffect(() => {
    SetNotes(notes);
    SetSort(false);
  }, [sort]);

  
  return (
    <>
      <h1 className="big-title">Notes</h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          onChange={(val) => SetCurrentNoteTitle(val.target.value)}
        />
        <input
          type="textarea"
          placeholder="body"
          onChange={(val) => SetCurrentNoteBody(val.target.value)}
        />
        <input
          type="date"
          onChange={(val) => SetCurrentNoteDate(val.target.value)}
        />
        <button
          onClick={() => {
            CreateNewNote();
          }}
        >
          Create
        </button>
        <button
          onClick={() => {
            SetNotes(notes.sort(SortDownFunc));
            SetSort(true);
          }}
        >
          Sort By Date Down
        </button>
        <button
          onClick={() => {
            SetNotes(notes.sort(SortUpFunc));
            SetSort(true);
          }}
        >
          Sort By Date Up
        </button>
      </div>
      <div className="notes">
        {notes.length == 0 ? (
          <h2 id="noNotes">No Notes Yet!</h2>
        ) : (
          notes.map((n, i) => <Note key={i} {...n} />)
        )}
      </div>
    </>
  );
};

export default App;
