const Product = require('../model/model')
const cart = require('../model/cart')

exports.process = (req,res)=>{
    res.render('editing',{editing:false})
}

// Adding a Product (Create)
exports.items = (req,res) =>{
    Product.create({
        title:req.body.title,
        price:req.body.price,
        description:req.body.description
    }).then((result)=>{console.log("Added Product")
       res.redirect('/products')
}).catch(err=>console.log(err));
}

// Reading A Single Product (Read)
exports.getProduct = (req,res) =>{
    const prodId = req.params.productId
    Product.findAll({where:{id:prodId}}).then(product=>{
      res.render('details',{product:product[0]})}).catch(err=>console.log(err))
    // Product.findByPk(prodId).then(product=>{
    //     res.render('details',{product:product})
    // }).catch(err=>console.log(err))
}

// Reading All Product (Read)
exports.output = (req,res) =>{
    Product.findAll().then((row)=>{
    res.render('products',{products:row,editing:false})    
})
    .catch(err=>console.log(err))
    
}


// Editing A product(Update) 
exports.postEditProduct=(req,res)=>{
    const prodId = req.body.productId
    const updateTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedDesc = req.body.description
    Product.findByPk(prodId).then(product=>{
        product.title = updateTitle;
        product.description = updatedDesc;
        product.price = updatedPrice;
        return product.save();
    })
    .then(result=>{console.log("Updated...")
    res.redirect('/products')
})
    .catch(err=>console.log(err))
    
}

exports.editProduct=(req,res)=>{
    const editMode = req.query.edit;
    if(!editMode){
       return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(product=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('editing',{
            editing:editMode,
            product:product
        })
    }).catch(err=>console.log(err))
    
}


// Deleting A product(Delete)
exports.postDeleteProduct=(req,res) =>{
    const prodId = req.body.productId
    Product.findByPk(prodId).then(product=>{
        return product.destroy()
    }).then(result=>{console.log("Product Deleted")
    res.redirect('/products')
})
    .catch(err=>console.log(err))
}

// Cart Side

exports.postcart=(req,res) =>{
    const prodId = req.body.productId
    Product.findById(prodId,(products)=>{
        console.log(products.price)
        cart.addProducts(prodId,products.price)
    })
    res.redirect('/cart')
}


exports.getCarts=(req,res)=>{
    cart.getCart(Cart=>{
        Product.fetchAll(products=>{
            const cartProducts=[]
            for(let product of products){
                const cartProductsData=Cart.products.find(prod=>prod.id===product.id)
                if(cartProductsData){
                    cartProducts.push({productData:product,qty:cartProductsData.qty})
                }
            }
            res.render('cart',{products:cartProducts})
        })
    })
}

exports.postcartdelete=(req,res)=>{
    const prodId = req.body.productId
    Product.findById(prodId,product=>{
    cart.deleteProduct(prodId,product.price)
    res.redirect('/cart')
    })
}