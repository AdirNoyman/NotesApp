// jshint esversion: 6
"use strict";
const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const deleteNote = document.querySelector('#delete-note');
const dateElement = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);


if (!note) {

    location.assign('/index.html');

}

noteTitle.value = note.title;
noteBody.value = note.body;
dateElement.textContent = generateLastEdited(note);

noteTitle.addEventListener('input', event => {

    note.title = event.target.value;
    note.updatedAt = moment().valueOf();
    saveNotes(notes);
});

noteBody.addEventListener('input', event => {

    note.body = event.target.value;
    note.updatedAt = moment().valueOf();
    saveNotes(notes);
});

deleteNote.addEventListener('click', () => {

    removeNote(noteId);
    saveNotes(notes);
    location.assign('/index.html');

});

window.addEventListener('storage', event => {

    if (event.key === 'notes') {

        notes = JSON.parse(event.newValue);
        note = notes.find(note => note.id === noteId);

        if (!note) {

            location.assign('/index.html');

        }


        noteTitle.value = note.title;
        noteBody.value = note.body;
        dateElement.textContent = generateLastEdited(note);
    }

});

