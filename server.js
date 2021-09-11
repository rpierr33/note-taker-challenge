

const fs = require('fs');
const path = require('path');
const express = require('express');
const dbJson = require('./db/db.json');
const uuidv1 = require('uuid/v1')



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

app.post('/api/notes',(req, res) => {

    let newNote = {id:uuidv1(), title:req.body.text, text:req.body.title};


    console.log(req.body)
    // console.log('DID WE SMACK IN!! ???', req.body)
    fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", function(err, data) {
        // console.log('PREPARSE', data, err)
      
        // console.log("This is the data id", data);
       
        const parseNotes = JSON.parse(data);
        console.log(parseNotes);

            // console.log('POST PARSE!!', parseNotes)
        parseNotes.push(newNote);
        

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

    //Read the 'file
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err;
          }
        let parseNotes = JSON.parse(data);
        const deletedThisNote = parseNotes.findIndex(note =>note.id === req.params.id);
        parseNotes.splice(deletedThisNote, 1);
        const output = fs.writeFile("./db/db.json", JSON.stringify(parseNotes), (err) => {
            if (err) {
              throw err;
            }
            console.log("Note has been deleted");
          });
          res.send(output); 
    });
});  
    //Get the note through filter
    //remove the note
    //save the file



//     // console.log(uuidv1());
//     console.log('DID WE SMACK IN!! ???', req.body)
//     // console.log("Req.params:", req.params);
//     let deletedNote = objNew.findIndex((newNote) => note.id === req.params.id);
//     console.log('deletedNote');



// for (let i = 0; i < dbJson.length; i++) {
//     if(deletedNote === dbJson[i].id) {
//         dbJson.splice([i], 1);

//         // let noteJson = JSON.stringify(dbJson, null, 2);
//         // writeFileAsync("./db/db.json", noteJson).then(function () {
//         //     console.log("your note has been deleted!");
//         //     });
//      }
//     }
//     res.json(dbJson);


    app.listen(PORT, () => {
        console.log(`API server now on port ${PORT}!`)
    });


