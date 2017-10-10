console.log('Starting app.js')

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];

console.log('Command: ', command);
console.log('Yargs', argv);


if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('You added new note!');
        notes.printNote(note);
    } else {
        console.log('dup-dup-duplicate!');
    }

} else if (command === 'list') {
    var getNotes = notes.getAll();
    if (getNotes) {
        for (var i = 0; i < getNotes.length; i++) {
            console.log(getNotes[i].body + " - " + getNotes[i].title);
        }
    }


} else if (command === 'read') {
    var note = notes.getNote(argv.title, argv.body);
    if (note) {
        console.log('You find the note!');
        notes.printNote(note);
    } else {
        console.log('Note not found');
    }

} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'There is no such note';
    console.log(message);

} else {
    console.log('Command not recognized');
}
