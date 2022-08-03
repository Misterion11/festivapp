const path = require('path')
const os = require('os')
const fs = require('fs')
const UUID = require('uuid-v4')
const cors = require('cors')
const { getStorage } = require('firebase-admin/storage')
const { getFirestore } = require('firebase-admin/firestore')
const admin = require('firebase-admin')
const busboy = require('busboy')
const express = require('express')
const app = express()
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}))
const port = 5000
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'festivapp-86dcf.appspot.com'
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = getFirestore()
const bucket = getStorage().bucket()
app.options('*', cors())

app.get('/posts', cors(), (req, res) => {
  const posts = []
  db.collection('posts').orderBy('date', 'desc').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      posts.push(doc.data())
    })
    res.send(posts)
  })
})

app.get('/users', cors(), (req, res) => {
  const users = []
  db.collection('users').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      users.push(doc.data())
    })
    res.send(users)
  })
})

app.get('/users/:email/:mdp', cors(), async (req, res) => {
  const user = []
  const users = db.collection('users')
  const snapshot = await users.where('email', '==', req.params.email).where('mdp', '==', req.params.mdp).get()
  snapshot.forEach((doc) => {
    user.push(doc.data())
  })
  res.send(user)
})

app.post('/createPost', (req, res) => {
  const uuid = UUID()

  const bb = busboy({
    headers: req.headers
  })

  const fields = {}
  let fileData = {}

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info
    console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType)
    const filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = { filepath, mimeType }
  })
  bb.on('field', (name, val, info) => {
    fields[name] = val
  })
  bb.on('close', () => {
    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile)
        }
      }
    )
    function createDocument (uploadedFile) {
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        user: 'Misterion',
        userCom: 'Ichigo',
        commentaires: ['Wow incroyable'],
        festival: fields.festival,
        description: fields.description,
        location: fields.location,
        date: parseInt(fields.date),
        url: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`
      }).then(() => {
        res.send('Post added :' + fields.id)
      })
    }
  })
  req.pipe(bb)
})

app.post('/signUp', async (req, res) => {
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

app.listen(process.env.PORT || port)
