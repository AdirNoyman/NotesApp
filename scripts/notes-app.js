// jshint esversion: 6
"use strict";
let notes = getSavedNotes();

const filters = {

    searchText: '',
    sortMethod: 'byEdited'
};

renderNotes(notes, filters);


document.querySelector('#create-note').addEventListener('click', event => {

    const id = uuidv4();
    const timeStamp = moment().valueOf();
    const createdAt = timeStamp;
    const updatedAt = timeStamp;

    notes.push({

        id,
        title: '',
        body: '',
        createdAt,
        updatedAt

    });

    saveNotes(notes);
    location.assign(`/edit.html#${id}`);

});


document.querySelector('#search-text').addEventListener('input', event => {

    filters.searchText = event.target.value;
    renderNotes(notes, filters);

});

document.querySelector('#filter-by').addEventListener('change', event => {

    filters.sortMethod = event.target.value;
    renderNotes(notes, filters);

});


window.addEventListener('storage', event => {

    if (event.key === 'notes') {

        notes = JSON.parse(event.newValue);

        renderNotes(notes, filters);

    }
});
