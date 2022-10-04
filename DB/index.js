const express = require('express')
const app = express()
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'hubs',
    database : 'loja'
  }
});

// const pgp = require('pg-promise')();
// const db = pgp({
//   host: 'localhost',
//   port: 5432,
//   database: 'loja',
//   user: 'root',
//   password: 'hubs',
//   max: 30
// });

// db.any('SELECT * FROM users')

knex.select('*').from('users').then(data=>{
    console.log(data)
}).catch(error=>{console.log(error)})

knex.schema.table('users', table =>{

})

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

console.log('yay')
app.listen(3000)