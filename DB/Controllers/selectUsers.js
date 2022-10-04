const knex = require('knex');

const selectUsers = (req, res) =>{
    knex.select('*').from('users').then(data=>{
        res.json(data)
    })
    .catch(err=>{console.log(err)})
}

module.exports = {
    selectUsers: selectUsers
}