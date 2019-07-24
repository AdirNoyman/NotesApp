// jshint esversion: 6
// READ EXISTING NOTES FROM LOCAL STORAGE:
// Check for existing saved data (read data in local storage >>> read it >>> parse it to JS )
"use strict";

const getSavedNotes = () => {

    const notesJSON = localStorage.getItem('notes');

    try {

        return notesJSON ? JSON.parse(notesJSON) : [];

    } catch (e) {

        return [];

    }


};

// Save the notes to locaLstorage
const saveNotes = notes => localStorage.setItem('notes', JSON.stringify(notes));

// Remove a note from the list
const removeNote = id => {

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex > -1) {

        notes.splice(noteIndex, 1);
    }

};

// Generate the DOM structure for a note
const generateNoteDOM = note => {

    const noteElement = document.createElement('a');
    const textElement = document.createElement('p');
    const statusElement = document.createElement('p');
    // const button = document.createElement('button');

    // // Setup the remove note button
    // button.textContent = 'x';
    // noteElement.appendChild(button);
    // button.addEventListener('click', () => {

    //     removeNote(note.id);
    //     saveNotes(notes);
    //     renderNotes(notes, filters);

    // });

    // Setup the note title text
    if (note.title.length > 0) {
        textElement.textContent = note.title;
    } else {

        textElement.textContent = 'Unnamed note';
    }
    textElement.classList.add('list-item__title');
    // textElement.setAttribute('href', `/edit.html#${note.id}`);
    noteElement.appendChild(textElement);

    // Setup the notes link
    noteElement.setAttribute('href', `/edit.html#${note.id}`);
    noteElement.classList.add('list-item');

    // Setup status message
    statusElement.textContent = generateLastEdited(note);
    statusElement.classList.add('list-item__subtitle');
    noteElement.appendChild(statusElement);

    return noteElement;
};

// Sort function
const sortNotes = (notes, filters) => {

    if (filters.sortMethod === 'byEdited') {

        return notes.sort((a, b) => {

            if (a.updatedAt > b.updatedAt) {

                return -1;

            } else if (a.updatedAt < b.updatedAt) {

                return 1;

            } else {

                return 0;
            }



        });

    } else if (filters.sortMethod === 'byCreated') {

        return notes.sort((a, b) => {

            if (a.createdAt > b.createdAt) {

                return -1;

            } else if (a.createdAt < b.createdAt) {

                return 1;

            } else {

                return 0;
            }

        });

    } else if (filters.sortMethod === 'alphabetical') {

        return notes.sort((a, b) => {

            if (a.title[0].toLowerCase() < b.title[0].toLowerCase()) {

                return -1;

            } else if (a.title[0].toLowerCase() > b.title[0].toLowerCase()) {

                return 1;

            } else {

                return 0;
            }

        });

    } else {

        return notes;
    }

};



// Render application notes
const renderNotes = (notes, filters) => {

    const notesBlock = document.querySelector('#notes');

    notes = sortNotes(notes, filters);

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesBlock.innerHTML = '';
    console.log(filteredNotes);

    if (filteredNotes.length) {
        filteredNotes.forEach(note => {

            const noteElement = generateNoteDOM(note);

            notesBlock.appendChild(noteElement);

        });

    } else {

        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No notes to display';
        emptyMessage.classList.add('empty-message');
        notesBlock.appendChild(emptyMessage);

    }
};

// Generate the last edited message
const generateLastEdited = note => `Last edited ${moment(note.updatedAt).from()}`;