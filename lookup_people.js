const argument = process.argv[2];
const pg = require('pg');
const settings = require('./settings.json')
const moment = require('moment')
const query = 'SELECT * FROM famous_people WHERE last_name = $1 OR first_name = $1'

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    hostname: settings.hotname,
    port: settings.port,
    ssl: settings.true,
});




client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    getdb(query, [argument], (err, result) => {
        console.log(`Found ${result.rowCount} person(s) by the name ${argument}`);
        result.rows.forEach(function (item) {
            const newDate = new Date(item.birthdate);
            console.log(`- ${item.id} ${item.first_name} ${item.last_name} '${moment(item.birthdate).format('YYYY-MM-DD')}'`)
        })
    })
});




function getdb(query, arg, cb) {
    client.query(query, arg, cb)

}