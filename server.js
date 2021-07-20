// import
const express = require('express');
const path = require('path');

// set express app
const app = express();
const PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// GET routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


// static files
app.use(express.static('public'));


// initialize server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));