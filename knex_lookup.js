const argument = process.argv[2];
const pg = require('pg');
const settings = require('./settings.json');
const moment = require('moment');

//'SELECT * FROM famous_people WHERE last_name = $1 OR first_name = $1'


const knex = require('knex')({
    client: 'pg',
    connection: settings
    }); 

    knex.select('*').from('famous_people')
     .where('first_name', '=', argument)
    // .limit(10)
    // .offset(x)
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
      rows.forEach(function (item) {
    console.log(`${item.id} : ${item.first_name} ${item.last_name} born '${moment(item.birthdate).format('YYYY-MM-DD')}'`);
      })
    });
    
  