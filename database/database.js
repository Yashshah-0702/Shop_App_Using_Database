// const mysql = require('mysql2')
// const pool = mysql.createPool({
//     host:'127.0.0.1',
//     user:'root',
//     database:'node_complete',
//     password:'root'
// })

// module.exports=pool.promise()

const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_complete','root','root',{dialect:'mysql',host:'localhost'});
module.exports=sequelize