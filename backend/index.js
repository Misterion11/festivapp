const express = require('express')

const app = express()
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

const port = 5000

app.get('/posts', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  const posts = []
  db.collection('posts').orderBy('date', 'desc').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      posts.push(doc.data())
    })
    res.send(posts)
  })
})

app.listen(process.env.PORT || port)
