var express = require('express');
var router = express.Router();
const Image = require('../Mode/Image')
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../db/connect')
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

  } catch (error) {
    console.log(error);
  }
};

start();



/* GET home page. */
router.get('/', function(req, res, next) {
  var test =req.body.nameAnh
  console.log(test)
  res.render('index', { title: 'Express' });
});
router.get('/append', function(req, res, next) {
  res.render('append' , {title: 'trang1'});
})

router.get('/listimage', function(req, res, next) {
  Image.find({}, function (err, data) {
    res.render('listimage', {duLieu: data})
  })
  Image.findOneAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.render('listimage', {duLieu: doc})
      res.end();
    } else {
      console.log('Failed to Delete user Details: ' + err);
    }
    res.render('listimage', {duLieu: doc})
  });

})

router.get('/append', function(req, res, next) {
  res.render('append' , {title: 'trang1'});
})


router.post('/append', async function (req, res) {
  var tenAnh = req.body.nameAnh
  var noiDung = req.body.content
  var linkAnh = req.body.link
  const img = new Image({
    tenAnh : tenAnh,
    noiDung : noiDung,
    linkAnh : linkAnh
  })
  const image = await Image.create(img)
  console.log(image)
  res.render('index' , );
})

router.get('/listimage/edit/:id',   function (req, res, next) {
  Image.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("edit", {
        title: "Update User Details",
        data: doc
      });
    } else {
      res.redirect('/listimage')
      console.log("loix")
    }
    console.log(doc)
  })

})

router.get('/listimage/edit' , async (req, res) => {
  var tenAnh = req.body.nameAnh
  var noiDung = req.body.content
  var linkAnh = req.body.link
  const img = new Image({
    tenAnh: tenAnh,
    noiDung: noiDung,
    linkAnh: linkAnh
  })
 const imge =  await Image.findOneAndUpdate({_id: req.params.id}, img, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ imge });
})





module.exports = router;
