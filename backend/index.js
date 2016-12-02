'use strict'
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
let collection

MongoClient.connect('mongodb://localhost:27017/smartizen', (err, db) => {
  if (!err) {
    console.log('We are connected to mongodb')
  }
  collection = db.collection('docks')
})

app.use(require('body-parser').urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.json({x: 3})
})

app.get('/docks', (req, res) => {
  collection.find({}).toArray((err, doc) => {
    console.log('bh', doc)
  })
})

app.get('/init', (req, res) => {
  console.log('got arduino msg', req.params)
  res.send('Hellou')
})

app.get('/inid', (req, res) => {
  let slots = [
    { state: 'available', order: 0 },
    { state: 'available', order: 1 },
    { state: 'available', order: 2 },
    { state: 'available', order: 3 },
    { state: 'available', order: 4 }
  ]


})

app.listen(3000, () => {console.log('Listening on 3000')})
