import uuid from "uuid";
import moment from "moment";

let notes = [];

// read existing notes from localstorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// save notes to localstorage
const saveNotes = function(notesData) {
  localStorage.setItem("notes", JSON.stringify(notesData));
};

// expose notes from module
const getNotes = () => {
  return notes;
};

const createNote = () => {
  const id = uuid();
  const timeStamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timeStamp,
    updatedAt: timeStamp,
  });
  saveNotes(notes); // notes is stringified
};

// remove a note from the list
const removeNote = function(id) {
  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

// sort notes
function sortNotes(notes, sortBy) {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      } else if (a.createdAt < b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabet") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
}

const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return;
  }

  if (typeof updates.title === "string") {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }

  if (typeof updates.body === "string") {
    note.title = updates.body;
    note.updatedAt = moment().valueOf();
  }

  saveNotes();
};

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote };
