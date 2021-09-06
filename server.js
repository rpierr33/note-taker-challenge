const fs = require('fs');
const path = require('path');
const express = require('express');
const dbJson = require('./db/db.json');
var uuidv1 = require('uuidv1')


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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.delete("/api/notes/:id", function (req, res) {
    console.log(uuidv1());
    console.log("Req.params:", req.params);
    let deletedNote = parse.Int(req.params.id);
    console.log(deletedNote);



for (let i = 0; i < dbJson.length; i++) {
    if(deletedNote === dbJson[i].id) {
        dbJson.splice(i, 1);

        let noteJson = JSON.stringify(dbJson, null, 2);
        writeFileAsync("./db/db.json", noteJson).then(function () {
            console.log("your note has been deleted!");
            });
     }
    }
    res.json(dbJson);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});
