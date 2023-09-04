var express = require('express');
const { render } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    console.log(products);
    
    res.render('admin/view-products',{admin:true,products})
  })
  
});

router.get('/add-product',(req,res) => {
  res.render('admin/add-product')
})
router.post('/add-product',(req,res) => {
  console.log(req.body);
  console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id) => {
    let image=req.files.Image
    console.log(id)
    image.mv('./public/product-images/'+id+'.jpeg',(err,done) => {
      if(!err){
        res.render("admin/add-product")
      }
      else{
        console.log(err)
      }
    })
    res.render("admin/add-product")
  })
})

module.exports = router;
