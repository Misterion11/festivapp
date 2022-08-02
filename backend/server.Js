const express = require('express')
const app = express()
const admin = require('firebase-admin')
const credentials = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/signup', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    url: req.body.url
  }
  const UserResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    photoURL: user.url,
    emailVerified: false,
    disabled: false
  })
  res.json(UserResponse)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('ça marche')
})
