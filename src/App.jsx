import { useRef } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Note from "./components/Note";

const App = () => {
  const [notes, SetNotes] = useState([]);
  const [sort, SetSort] = useState(false);
  const [currentNoteTitle, SetCurrentNoteTitle] = useState("");
  const [currentNoteBody, SetCurrentNoteBody] = useState("");
  const [currentNoteDate, SetCurrentNoteDate] = useState("");
  const titleRef = useRef("");
  const bodyRef = useRef("");
  const dateRef = useRef("");

  // clear inputs value after creating new note
  const ClearInputs = () => {
    titleRef.current.value = "";
    bodyRef.current.value = "";
    dateRef.current.value = "";
  };

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
          ref={titleRef}
          onChange={(val) =>{
            SetCurrentNoteTitle(val.target.value)
            val.target.value == "" ? val.target.style.borderColor = "red":val.target.style.borderColor = "green" }
          } 
        />
        <textarea
          type="text"
          placeholder="body"
          ref={bodyRef}
          onChange={(val) => SetCurrentNoteBody(val.target.value)}
        />
        <input
          type="date"
          ref={dateRef}
          onChange={(val) => SetCurrentNoteDate(val.target.value)}
        />
      </div>

      <div className="buttons">
        <button
          id="create"
          onClick={() => {
            if (
              titleRef.current.value == "" ||
              bodyRef.current.value == "" ||
              dateRef.current.value == ""
            )
              alert("You Missing Some Details!");
            else {
              CreateNewNote();
              ClearInputs();
            }
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
        <button
        id="clear"
          onClick={() => {
            SetNotes([]);
          }}
        >
          Clear All Notes
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
