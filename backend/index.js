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

let sim = {
  'occ': '01100',
  id: '2',
  sct: 'AHOJ'
}

function parseInit(raw) {
  // console.log('parsing raw', raw)
  let slots = raw.occ.split('').map(x => {
    return {state: (x === '1') ? 'available' : 'empty'}
  })
  let answer = {}
  answer.dockID = raw.id
  answer.secret = raw.sct
  answer.slots = slots
  return answer
}
setTimeout(function() {
  authSender('2', 'AHOJ')
    .then(() => {console.log('authed')})
    .catch(() => {console.log('invalid')})
}, 1000)

function authSender(dockID, secret) {
  return new Promise((resolve, reject) => {
    collection.findOne({dockID}, {secret: true}, (err, doc) => {
      if (doc == null) {
        reject()
        return
      }
      if (secret === doc.secret) resolve()
      else reject()
    })
  })
}

function updateSlots(dockID, slots) {
  console.log(slots)
}

let parsed = parseInit(sim)
authSender(parsed.dockID, parsed.secret)
  .then(x => {
    res.send('Hellou')
    updateSlots(parsed.slots)
  })
  .catch(x => {
    res.send('You are evil')
  })

// console.log(parseInit(sim))

app.get('/init', (req, res) => {
  console.log('got arduino msg', req.query)
  let parsed = parseInit(req.query)
  authSender(parsed.dockID, parsed.secret)
    .then(x => {
      res.send('Hellou')
      updateSlots(parsed.slots)
    })
    .catch(x => {
      res.send('You are evil')
    })
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
