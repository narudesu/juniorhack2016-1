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
  res.header('Access-Control-Allow-Origin', '*')
  collection.find({}, {secret: false, _id: false}).toArray((err, docs) => {
    setTimeout(() => {
      res.json(docs)
    }, 1000)
  })
})

let sim = {
  'occ': '01010',
  id: '2',
  sct: 'AHOJ'
}

function parseInit(raw) {
  // console.log('parsing raw', raw)
  let slots = raw.occ.split('').map((x, i) => {
    return {
      state: (x === '1') ? 'available' : 'empty',
      order: i
    }
  })
  let answer = {}
  answer.dockID = raw.id
  answer.secret = raw.sct
  answer.slots = slots

  updateSlots(raw.id, slots)

  return answer
}
setTimeout(function() {
  authSender('2', 'AHOJ')
    .then(() => {
      console.log('authed')
    })
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
  console.log('upslot', slots)
  collection.update({dockID}, {$set: {slots: slots}})
  // getSlotState()
}

function getSlotState() {
  return new Promise((resolve, reject) => {
    collection.find().toArray((err, docs) => {
      console.log('docs', docs.slots)
      resolve(docs)
    })
  })
}

app.get('/init', (req, res) => {
  console.log('got arduino msg', req.query)
  let parsed = parseInit(req.query)
  authSender(parsed.dockID, parsed.secret)
    .then(x => {
      res.send('Hellou')
      updateSlots(parsed.dockID, parsed.slots)
      getSlotState()
    })
    .catch(x => {
      res.send('You are evil')
    })
})




app.listen(3000, () => {console.log('Listening on 3000')})
