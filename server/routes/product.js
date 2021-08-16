const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage }).single("file")

router.post("/image", (req, res) => {
  // 가져온 이미지를 저장함.
  upload(req, res, err => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.path, fileName:res.req.file.filename})
  })
});

router.post("/", (req, res) => {
  console.log(req.body)
  const product = new Product(req.body)
  product.save((err) => {
    if(err) return res.status(400).json({success: false, err})
    return res.status(200).json({success: true})
  })
})

router.post("/products", (req, res) => {
  //product collection에 들어 있는 모든 상품 정보를 가져오기

  //parseInt : String -> Int
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.SearchTerm;
  let findArgs = {};

  console.log(req.body)

  for (let key in req.body.filters) {
    if(req.body.filters[key].length > 0) {
      findArgs[key] = {
        $gte: req.body.filters[key][0],
        $lte: req.body.filters[key][1]
      }
    } else if (req.body.filters[key] > 0) {
      findArgs[key] = req.body.filters[key]
    }
  }

  console.log('findArgs', findArgs)

  if(term) {
    Product.find(findArgs)
      .find({ $text: {$search: term} })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
      if(err) return res.status(400).json({success:false, err})
      return res.status(200).json({
        success:true, 
        productInfo, 
        postSize: productInfo.length})
    })
  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
      if(err) return res.status(400).json({success:false, err})
      return res.status(200).json({
        success:true, 
        productInfo, 
        postSize: productInfo.length})
    })
  }

})

router.get("/products_by_id", (req, res) => {
  //productId를 이용해서 productId와 같은 상품의 정보를 가져온다.

  //body가 아니라 쿼리를 이용해서 데이터를 가져올 때는 req.query형태로 씀. query란 주소 뒤에 붙는 형식
  let type = req.query.type
  let productId = req.query.id

  Product.find({_id : productId})
    .populate('writer')
    .exec((err, product) => {
      if(err) return res.status(400).send(err)
      return res.status(200).send({success: true, product})
    })
})

module.exports = router;

