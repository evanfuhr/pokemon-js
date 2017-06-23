let _ = require('lodash');
let async = require('async');
let bodyParser = require('body-parser');
let cors = require('cors');
let express = require('express');
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./src/assets/pokemon.db');
let port = process.env.Port || 8000;

let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '/assets/pokemon.db'
  }
});

let app = express();

app.use(express.static('src'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname + '/src/index.html'))
})

app.listen(port, function() {
  console.log('Listening on: ', port);
});
