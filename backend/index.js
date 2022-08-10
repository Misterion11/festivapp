const path = require('path')
const os = require('os')
const fs = require('fs')
const UUID = require('uuid-v4')
const cors = require('cors')
const {
  getStorage
} = require('firebase-admin/storage')
const { getFirestore } = require('firebase-admin/firestore')
const admin = require('firebase-admin')
const { getAuth } = require('firebase-admin/auth')
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
app.use(express.urlencoded({
  extended: true
}))

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

app.post('/updateName', cors(), (req, res) => {
  const dName = req.body.displayName
  const email = req.body.email
  getAuth()
    .getUserByEmail(email)
    .then((userRecord) => {
      getAuth().updateUser(userRecord.uid, {
        displayName: dName
      })
        .then(() => {
          res.send('Change Done')
        })
    })
    .catch((error) => {
      console.log('Error fetching user data:', error)
    })
})

app.post('/updateImage', (req, res) => {
  const uuid = UUID()

  const bb = busboy({
    headers: req.headers
  })

  const fields = {}
  let fileData = {}

  bb.on('file', (name, file, info) => {
    const {
      filename,
      encoding,
      mimeType
    } = info
    console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType)
    const filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = {
      filepath,
      mimeType
    }
  })
  bb.on('field', (name, val, info) => {
    fields[name] = val
  })
  bb.on('close', () => {
    bucket.upload(
      fileData.filepath, {
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
        } else {
          console.log(err)
        }
      }
    )

    function createDocument (uploadedFile) {
      console.log('je suis là')
      getAuth()
        .getUserByEmail(fields.email)
        .then((userRecord) => {
          getAuth().updateUser(userRecord.uid, {
            photoUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`
          })
        })
        .catch((error) => {
          console.log('Error fetching user data:', error)
        }).then(() => {
          res.send('Post added :' + fields.id)
        })
    }
  })
  req.pipe(bb)
})

app.post('/updatePass', cors(), (req, res) => {
  const pass = req.body.password
  const email = req.body.email
  getAuth()
    .getUserByEmail(email)
    .then((userRecord) => {
      getAuth().updateUser(userRecord.uid, {
        password: pass
      })
        .then(() => {
          res.send('Change Done')
        })
    })
    .catch((error) => {
      console.log('Error fetching user data:', error)
    })
})

app.post('/createPost', (req, res) => {
  const uuid = UUID()

  const bb = busboy({
    headers: req.headers
  })

  const fields = {}
  let fileData = {}

  bb.on('file', (name, file, info) => {
    const {
      filename,
      encoding,
      mimeType
    } = info
    console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType)
    const filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = {
      filepath,
      mimeType
    }
  })
  bb.on('field', (name, val, info) => {
    fields[name] = val
  })
  bb.on('close', () => {
    bucket.upload(
      fileData.filepath, {
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
        } else {
          console.log(err)
        }
      }
    )

    function createDocument (uploadedFile) {
      console.log('je suis là')
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        user: fields.name,
        urlUser: fields.urlUser,
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

app.post('/signUp', (req, res) => {
  const uuid = UUID()

  const bb = busboy({
    headers: req.headers
  })

  const fields = {}
  let fileData = {}

  bb.on('file', (name, file, info) => {
    const {
      filename,
      encoding,
      mimeType
    } = info
    console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType)
    const filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = {
      filepath,
      mimeType
    }
  })
  bb.on('field', (name, val, info) => {
    fields[name] = val
  })
  bb.on('close', () => {
    bucket.upload(
      fileData.filepath, {
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
          createProfil(uploadedFile)
        } else {
          console.log(err)
        }
      }
    )

    function createProfil (uploadedFile) {
      console.log('je suis là')
      admin.auth().createUser({
        email: fields.email,
        password: fields.password,
        displayName: fields.displayName,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
        emailVerified: false,
        disabled: false
      }).then(() => {
        res.send('Post added :' + fields.id)
      })
    }
  })
  req.pipe(bb)
})

app.listen(process.env.PORT || port)
