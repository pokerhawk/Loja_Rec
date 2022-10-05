const express = require('express') // remove cors and pg-promise
var cors = require('cors')
const app = express()
const port = 3000;
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

const display = [];

app.use(cors())
app.use(express.json())

////////////////////////////////////// SERVER
app.get('/', (req, res)=>{
  knex.select('*').from('users').then(data=>{
    display.push(data)
    res.json(data)
  }).catch(error=>{console.log(error)})
})

app.post('/', (req, res)=>{
  knex.transaction(trx=>{
    trx.insert({
      nome: 'joao',
      senha: '321',
      divida: 5
    })
  })
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{console.log(err)})
})

// app.delete('/', (req, res)=>{ // CHECK
//   knex('users').dropColumn().where('nome', 'joao');
//   knex('users').where('nome', 'joao').del()
//   .then(res=>{console.log(res)})
//   .catch(err=>{console.log(err)})
// })



////////////////////////////////////// CONSOLE LOG DISPLAYS
knex.select('*').from('users').then(data=>{
  console.log(data)
}).catch(error=>{console.log(error)})

knex.select('*').from('users').where({
  nome: 'eliabe'
})
.then(data=>{
  console.log(data)
})

// knex.schema.alterTable('users',table=>{
//   table.add;
// })


//////////////////////////////////////
app.get("/", (req, res) => {
  res.json(display); //WHAT WILL BE DISPLAYED ON BROWSER
});

app.listen(port, ()=>{
  console.log(`Server running at https:localhost:${port}`)
})