const express = require('express')
const app = express()
const body = require('body-parser')
const route = require('./routes/route')
const error = require('./controller/error')
const sequelize = require('./database/database')
const Product = require('./model/model')
const User = require('./model/user')

app.set('view engine','ejs')
app.set('views','views')

app.use(body.urlencoded({extended:false}))
  
app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user=user;
        next()
    }).catch(err=>console.log(err));
})

app.use(route)
app.use(error.page)

// 1st way for one to many relations
Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
// 2nd way for one to many relations
// User.hasMany(Product)

sequelize.sync().then((result)=>{
    return User.findByPk(1);
    // console.log(result)
})
.then(user=>{
    if(!user){
       return User.create({name:"Yash shah",email:"yashshah@gmail.com"})
    }
    return user;
})
.then(user=>{
    // console.log(user)
    app.listen(7400)
})
.catch(err=>console.log(err))
