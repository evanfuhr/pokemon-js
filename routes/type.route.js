let async = require('async');
let express = require('express');
let router = express.Router({
  mergeParams: true
});
let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    // filename: "./dist/assets/pokemon.db" // Single app
    filename: "./src/assets/pokemon.db" // Separate FE and BE app
  }
});

router.get('/', function(req, res){

  let pokemonID = req.params.pokemon_id;

  console.log('Received /pokemon/' + pokemonID + '/type request');

  knex.join('types', 'pokemon_types.type_id', 'types.id')
    .select('pokemon_types.slot', 'pokemon_types.type_id', 'types.color')
    .from('pokemon_types')
    .where('pokemon_types.pokemon_id', pokemonID)
    .then((types)=>{
      console.log('Returned /pokemon/' + pokemonID + '/type response');
      res.json(types);
    });
});

module.exports = router;
