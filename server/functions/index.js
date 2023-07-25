const functions = require('firebase-functions')
const admin = require('firebase-admin')
require('dotenv').config()

const serviceAccountKey = require('./serviceAccountKey.json')

const express = require('express')
const app = express()

// Body parser for our JSON data app.use(express.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cross origin
const cors = require('cors')
app.use(
  cors({
    origin: '*',
    coop: 'same-origin-allow-popups',
  })
)

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/', (req, res) => [res.send('Hello world')])

// firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
})

const userRoute = require('./routes/user')
const productRoute = require('./routes/products')

app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

exports.app = functions.https.onRequest(app)
