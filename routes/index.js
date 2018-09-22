var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://4c69d7f5-8cd5-4681-9602-c6c3090c946f:5230068c-68ba-4513-9766-7c357ea7dc7a@ds111113.mlab.com:11113/parcial1';
const dbName = 'parcial1';

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

//Get graficas
router.get('/graficas', (req, res, next) => {
  MongoClient.connect(url, function (error, client) {
    assert.equal(null, error);
    console.log('Se conecto!');
    const db = client.db(dbName);
    let collection = db.collection('graficas');

    collection.find().limit(20).toArray((err, result) => {
      assert.equal(null, err);
      console.log(result);
      res.status(200).send(result);
      client.close();
    });
  });
});

//Get de una sola grafica
router.get('/graficas/:idGrafica', (req, res, next) => {
  MongoClient.connect(url, function (error, client) {
    assert.equal(null, error);
    console.log('Se conecto');

    const db = client.db(dbName);

    let collection = db.collection('graficas');
    let idGrafica = String(req.params.idGrafica);
    collection.find({},
      {
        _id: new mongo.ObjectID(idGrafica)
      }).toArray((err, result) => {
      assert.equal(null, err);
      console.log(result);
      res.status(200).send(result);
      client.close();
    });
  });

});

//Post graficas
router.post('/graficas', (req, res, next) => {
  MongoClient.connect(url, function (error, client) {
    assert.equal(null, error);
    console.log('Se conecto');

    const db = client.db(dbName);
    let collection = db.collection('graficas');

    collection.insertOne({
      autor: req.body.autor,
      titulo: req.body.titulo,
      grafica: req.body.grafica,
      calificaciones: [],
      timestamp: req.body.timestamp
    },
    (err, result) => {
      assert.equal(null, err);
      res.status(201).json({
        message: 'Grafica guardada',
      });

      client.close();
    });
  });

});

//Add rating
router.post('/graficas/:idGrafica', (req, res, next) => {
  MongoClient.connect(url, function (error, client) {
    assert.equal(null, error);
    console.log('Se conecto');

    const db = client.db(dbName);

    let collection = db.collection('graficas');
    let idGrafica = String(req.params.idGrafica);
    collection.updateOne(
      {
        _id: new mongo.ObjectID(idGrafica)
      },
      {
        $push: { calificaciones : {
          puntaje: req.body.puntaje,
          calificador: req.body.calificador
        }
        }
      },
      (err, result) => {
        assert.equal(null, err);
        res.status(201).json({
          message: 'Se agrego la calificación',
        });

        client.close();
      });
  });

});

module.exports = router;
