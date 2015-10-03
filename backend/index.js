'use strict'

const express = require('express')
const cors = require('cors')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const validateToken = jwt => jwt === '123'

const authorized = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    validateToken(req.headers.authorization.split(' ')[1])
  ) {
    next()
    return
  }
  return res.status(401).json({ error: 'unauthorized' })
}

app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/data', authorized, (req, res) => {
  let idx = 0;
  res.json([
    {
      id: ++idx,
      title: 'Albert Einstein',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/330px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg',
      details: 'Is there a constant?'
    },
    {
      id: ++idx,
      title: 'Erwin Schrödinger',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/2/2e/Erwin_Schr%C3%B6dinger_%281933%29.jpg',
      details: 'Have you seen my cat?'
    },
    {
      id: ++idx,
      title: 'Андре́й Андре́евич Ма́рков',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/AAMarkov.jpg/330px-AAMarkov.jpg',
      details: 'Is God a chain?'
    },
    {
      id: ++idx,
      title: 'Ludwig Boltzmann',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Boltzmann2.jpg/338px-Boltzmann2.jpg',
      details: 'Was my dream low entropy reality?'
    },
    {
      id: ++idx,
      title: 'Darth Vader',
      photo: 'https://upload.wikimedia.org/wikipedia/en/7/76/Darth_Vader.jpg',
      details: 'Where is the power?'
    }
  ])
})

app.post('/login', (req, res) => {
  const ok = req.body.email === 'test@example.com'
  if (!ok) res.status(401)
  res.json({ token: '123', refreshToken: '???' })
})

app.post('/refreshToken', (req, res) => {
  // easy :)
  res.json({ token: req.body.token, refreshToken: req.body.refreshToken })
})

app.get('/locale', (req, res) => {
  let l
  switch (req.query.locale) {
    case 'de-DE':
      l = {
        locale: req.query.locale,
        email: 'Mail',
        password: 'Kennwort',
        login: 'Anmeldung',
        logout: 'Abmeldung',
        language: 'Spracheinstellung',
        user: 'Benutzer',
        about: 'Impressum',
        template: 'Vorlage',
        failed: 'Gescheitert!'
      }
      break
  }
  res.json(l)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
