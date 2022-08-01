const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const express = require('express')
const app = express()
const port = 5000
const serviceAccount = require('./serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

app.get('/posts', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const posts = []
  db.collection('posts').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      posts.push(doc.data())
    })
    res.send(posts)
  })
})

app.listen(process.env.PORT || port)
