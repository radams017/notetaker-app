// import
const express = require('express');
const path = require('path');
const File = require('fs');

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


// GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

// static files
app.use(express.static('public'));


// POST routes
app.post('/api/notes', (req, res) => {
    console.log(req.body)

    File.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        notes = JSON.parse(data);

        notes.push(req.body)

        File.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
        })

    })
});

// initialize server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));