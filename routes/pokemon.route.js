let async = require('async');
let express = require('express');
let router = express.Router();
let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./dist/assets/pokemon.db"
  }
});

router.get('/', (req, res, next)=>{
  console.log('Received /pokemon request');

  let pokemons;
  let result = [];

  async.series(
    [
      function getData(callback) {
        knex
          .join('pokemon_species', 'pokemon_types.pokemon_id', 'pokemon_species.id')
          .join('types', 'types.id', 'pokemon_types.type_id')
          .join('pokemon_species_names', 'pokemon_species_names.pokemon_species_id', 'pokemon_species.id')
          .select('pokemon_species.id', 'pokemon_species_names.name', 'pokemon_types.type_id', 'types.identifier', 'pokemon_types.slot', 'types.color')
          .from('pokemon_types')
          .where('pokemon_species_names.local_language_id', '9')
          .then(function(rawPokemons) {
            return rawPokemons;
          }).then(function (rawPokemons) {
          pokemons = rawPokemons;
          callback();
        });
      },
      function parseData(callback) {
        var pokemon;
        for (var i = 0; i < pokemons.length; i++) {
          //Currently breaks if last pokemon is not dual typed
          if ( pokemons[i].id === pokemons[i+1].id ) {
            pokemon = {
              id: pokemons[i].id,
              name: pokemons[i].name,
              types: [
                {
                  id: pokemons[i].type_id,
                  identifier: pokemons[i].identifier,
                  slot: pokemons[i].slot,
                  color: pokemons[i].color
                },
                {
                  id: pokemons[i+1].type_id,
                  identifier: pokemons[i+1].identifier,
                  slot: pokemons[i+1].slot,
                  color: pokemons[i+1].color
                }
              ]
            };
            result.push(pokemon);
            i++;
          } else {
            pokemon = {
              id: pokemons[i].id,
              name: pokemons[i].name,
              types: [
                {
                  id: pokemons[i].type_id,
                  identifier: pokemons[i].identifier,
                  slot: pokemons[i].slot,
                  color: pokemons[i].color
                }
              ]
            };
            result.push(pokemon);
          }
        }
        callback();
      },
      function returnData(callback) {
        console.log('Returned /pokemon response');
        res.json(result);
        callback();
      }
    ]
  );
});

router.get('/:id', function(req, res) {
  console.log('Received /pokemon/' + req.params.id + ' request');

  var pokemon;
  var languageID = 9; // English
  var versionID = 26; // ORAS

  async.series(
    [
      function getData(callback) {
        knex.join('pokemon', 'pokemon_species.id', 'pokemon.species_id')
          .join('pokemon_species_names', 'pokemon_species.id', 'pokemon_species_names.pokemon_species_id')
          .join('pokemon_abilities', 'pokemon_species.id', 'pokemon_abilities.pokemon_id')
          .join('ability_names', 'pokemon_abilities.ability_id', 'ability_names.ability_id')
          .join('pokemon_species_flavor_text', 'pokemon_species.id', 'pokemon_species_flavor_text.species_id')
          .select('pokemon_species.id', 'pokemon_species_names.name', 'pokemon.height', 'pokemon.weight', 'pokemon_species_flavor_text.flavor_text', 'pokemon_abilities.slot', 'ability_names.name', 'pokemon_abilities.ability_id', 'pokemon_abilities.is_hidden')
          .from('pokemon_species')
          .where('pokemon_species.id', req.params.id)
          .andWhere('pokemon_species_flavor_text.version_id', versionID)
          .andWhere('pokemon_species_names.local_language_id', languageID)
          .andWhere('ability_names.local_language_id', languageID)
          .andWhere('pokemon_species_flavor_text.language_id', languageID)
          .andWhere('pokemon.is_default', '1') // Gets default form
          .then(function (rawPokemon) {
            return rawPokemon;
          }).then(function (rawPokemon) {
          pokemon = rawPokemon;
          callback();
        });
      },
      function returnData(callback) {
        console.log('Returned /pokemon/' + req.params.id + ' response');
        res.json(pokemon);
        callback();
      }
    ]
  );


});

module.exports = router;
