// import
const express = require('express');
const path = require('path');
const File = require('fs');
const generateUniqueId = require('generate-unique-id');

// set express app
const app = express();
const PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// to push data into
let notes;

// id gen
const id = generateUniqueId({
    length: 10,
    useLetters: false
})

// static files
app.use(express.static('public'));

// GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

app.get('/api/notes/:id', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

// POST routes
app.post('/api/notes', (req, res) => {

    newNote = req.body;

    newNote.id = id;

    File.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        notes = JSON.parse(data);

        notes.push(newNote)

        File.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.send(notes)
        })

    })
});

// DELETE route
app.delete('/api/notes/:id', (req, res) => {

    File.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);
        const remainder = notes.filter(note => note.id != req.params.id)

        File.writeFile('./db/db.json', JSON.stringify(remainder), err => {
            if (err) throw err;
            res.send(remainder)
        })
    })
})

// initialize server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));