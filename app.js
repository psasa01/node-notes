const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const title = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const body = {
    describe: 'Content of body',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title,
        body
    })
    .command('list', 'Listing all notes')
    .command('read', 'Read individual note', {
        title
    })
    .command('remove', 'Remove individual note', {
        title
    })
    .help()
    .argv;

var command = argv._[0];

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
    console.log(`Printing ${getNotes.length} notes.`);
    getNotes.forEach((note) => {
        console.log(`${getNotes.indexOf(note) + 1}.`);
        notes.printNote(note);
    })

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
    console.log('Command not recognized')
}
