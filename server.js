
let _ = require('lodash');
let async = require('async');

// Express
let express = require('express');
let app = express();
let port = process.env.Port || 3000;

// DB
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./src/assets/pokemon.db');
let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '/assets/pokemon.db'
  }
});

// Middlewares
let bodyParser = require('body-parser');
let cors = require('cors');

app.use(express.static('dist'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
let pokemon = require('./routes/pokemon.route');
let type = require('./routes/type.route');

app.use('/api/pokemon', pokemon);
app.use('/api/pokemon/:pokemon_id/type', type);

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname + './dist/index.html'))
});

app.listen(port, function() {
  console.log('Listening on: ', port);
});

module.exports = app;
