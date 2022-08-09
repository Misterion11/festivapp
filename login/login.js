const cors = require('cors')
const { initializeApp } = require('firebase/app')
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth')
const express = require('express')
const { doc, updateDoc, arrayUnion, getFirestore } = require('firebase/firestore')
const appExpress = express()
appExpress.use(express.json())
appExpress.use(express.urlencoded({
  extended: true
}))
const port = 8000

const firebaseConfig = {
  apiKey: 'AIzaSyCuRuniuH2HibyCAR7OelymPa01xKzrwLM',
  authDomain: 'festivapp-86dcf.firebaseapp.com',
  projectId: 'festivapp-86dcf',
  storageBucket: 'festivapp-86dcf.appspot.com',
  messagingSenderId: '86170867078',
  appId: '1:86170867078:web:0454a819252b4b89cd0807'
}

appExpress.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}))

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

appExpress.use(express.json())
appExpress.use(express.urlencoded({
  extended: true
}))

appExpress.post('/login', cors(), (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user
      console.log(user)
      res.json(user)
    // ...
    })
    .catch((error) => {
      console.log(error)
    })
})

appExpress.post('/com', cors(), async (req, res) => {
  const id = req.body.id
  const postRef = doc(db, 'posts', id)
  const com = req.body.com
  const store = req.body.store
  await updateDoc(postRef, {
    commentaires: arrayUnion(`${store} : ${com}`)
  }).then(() => {
    res.send('Com added')
  }).catch((e) => {
    console.log(e)
  })
})

appExpress.listen(process.env.PORT || port)
