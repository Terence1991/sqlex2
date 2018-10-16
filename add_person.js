const [first, second, firstName, lastName, dob] = process.argv;
const pg = require('pg');
const settings = require('./settings.json');
const moment = require('moment');

const knex = require('knex')({
    client: 'pg',
    connection: settings
    }); 

    console.log(firstName, lastName, dob);


    knex.insert({first_name: firstName, last_name: lastName , birthdate: dob}).into('famous_people')
    .then(function(id) {
        console.log('created added');
    }).catch(function(error){
        console.log(error);
    })
