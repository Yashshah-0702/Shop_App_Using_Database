const express = require('express')
const app = express()
const body = require('body-parser')
const route = require('./routes/route')
const error = require('./controller/error')
const sequelize = require('./database/database')
// const db = require('./database/database')

app.set('view engine','ejs')
app.set('views','views')

app.use(body.urlencoded({extended:false}))

app.use(route)
app.use(error.page)

sequelize.sync().then((result)=>{
    // console.log(result)
    app.listen(7400)
}).catch(err=>console.log(err))
