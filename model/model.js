const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Product = sequelize.define('products',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price:{
     type:Sequelize.DOUBLE,
     allowNull:false
  },
  description:{
    type:Sequelize.TEXT,
    allowNull:false
  }
});


module.exports = Product;
