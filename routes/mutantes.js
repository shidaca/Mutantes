const express = require('express');
const router = express.Router();
const isMutant = require('../Funcion');

/* GET home page. */
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  let body= req.body;
  console.log(body);
  let dna =body && body.dna;//algo que se llame data y meterlo en var result 
  console.log(dna);
let result = isMutant.isMutant(dna)
  res.send({ 'isMutant': result })
});

module.exports = router;
