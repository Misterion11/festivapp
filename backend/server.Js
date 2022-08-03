const express = require('express')
const admin = require('firebase-admin')
const app = express()

const cors = require('cors')

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}))

const { getAuth, signInWithEmailAndPassword } = require('firebase/auth')
const credentials = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const auth = getAuth()

app.post('/signup', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
    /*     url: req.body.url */
  }
  const UserResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false
  })
  console.log(UserResponse)
  res.json(UserResponse)
})

app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
    const user = userCredential.user
    res.json(user)
  })
    .catch((error) => {
      console.log(error)
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('ça marche')
})
