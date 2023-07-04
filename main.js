const express = require('express')
const app = express()
const body = require('body-parser')
const route = require('./routes/route')
const error = require('./controller/error')
const sequelize = require('./database/database')
const Product = require('./model/model')
const User = require('./model/user')
const Cart = require('./model/cart')
const CartItem = require('./model/cart-item')
const Order = require('./model/order')
const OrderItem = require('./model/order-items')

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
// Many To one
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
// Many to many
Cart.belongsToMany(Product,{through: CartItem})
Product.belongsToMany(Cart,{through: CartItem})
 
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product,{through:OrderItem})

sequelize
// .sync({force:true})
.sync()
.then((result)=>{
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
    return user.createCart()
})
.then(cart=>{
    app.listen(7400)
})
.catch(err=>console.log(err))
