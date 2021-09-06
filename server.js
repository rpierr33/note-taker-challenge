const fs = require('fs');
const path = require('path');
const express = require('express');
const dbJson = require('./db/db.json');

const app = express();
const PORT = 4001;

app.use(express.urlencoded({ extended: true }));

app.use(json());

app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const dataNotes = fs.readfileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    res.json(parseNotes);

});

app.post('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db/json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    parseNotes.push(req.body);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), "utf-8");
    res.json("you have successfully added a note!");
});

app.get


