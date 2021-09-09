const fs = require('fs');
const path = require('path');
const express = require('express');
const dbJson = require('./db/db.json');
var uuidv1 = require('uuidv1')

const sequelize = require('./config/config')

const BookModel = require('./models/book')
const productModel = require('./models/product')


const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.log('GETTIN SMACKED ON RELOAD!!')
    fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", function(err, data) {
        const parseNotes = JSON.parse(data);
        res.json(parseNotes);
    });
});

app.post('/api/notes', (req, res) => {
    console.log('DID WE SMACK IN!! ???', req.body)
    fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", function(err, data) {
        console.log('PREPARSE', data, err)
        const parseNotes = JSON.parse(data);
        

            console.log('POST PARSE!!', parseNotes)
        parseNotes.push(req.body);

        fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), "utf-8");
        res.json("you have successfully added a note!");
    });
    
});

// app.get('/homepage', (req, res) => {
//     console.log('WE HIT THE HOMEPAGE ROUTE!')
//     res.sendFile(path.join(__dirname, './public/homepage.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/about.html'));
// });

// app.get('/api/findBook', (req,res) => {
//     BookModel.findAll({}).then((BooksWeFoundDB) => {
//         res.json(BooksWeFoundDB)
//     })
// })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.delete("/api/notes/:id", function (req, res) {
    // console.log(uuidv1());
    console.log('DID WE SMACK IN!! ???', req.body)
    // console.log("Req.params:", req.params);
    let deletedNote = parse.Int(req.params.id);
    console.log(deletedNote);



for (let i = 0; i < dbJson.length; i++) {
    if(deletedNote === dbJson[i].id) {
        dbJson.splice([i], 1);

        let noteJson = JSON.stringify(dbJson, null, 2);
        writeFileAsync("./db/db.json", noteJson).then(function () {
            console.log("your note has been deleted!");
            });
     }
    }
    res.json(dbJson);
});


// sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`API server now on port ${PORT}!`)
    });
// })

