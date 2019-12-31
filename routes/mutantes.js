const express = require('express');
const router = express.Router();
const isMutant = require('../Funcion');
const pg = require('pg');
const cs = 'postgres://postgres:s$cret@localhost:5432/Mutantes';

const client = new pg.Client(
    {
        host:  'localhost',
        port: 5432,
        database: 'Mutantes',
        user: 'postgres',
        password: '121314',
      }
    
    );
    client.connect()
    const query =  'INSERT INTO estadistica(ismutante,adn) VALUES($1, $2)';
/* GET home page. */
router.post('/', async function(req, res, next) {
  
  //res.render('index', { title: 'Express' });
  let body= req.body;
  console.log(body);
  let dna =body && body.dna;//algo que se llame data y meterlo en var result 
  console.log(dna);
  let result = await isMutant.isMutant(dna);
  if(result){
    await  client.query(query, [result, dna] ,(err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    })
    res.status(200).send({ 'isMutant': result })//mensajes ok
  }
  res.status(403).send({ 'isMutant': result })// mensajer error 
});

module.exports = router;
