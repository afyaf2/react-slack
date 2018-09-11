const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')


const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:d0508140-8047-4c95-a45a-1620477f8336',
  key: '1715c377-2cd5-49f7-93da-629090d59e77:CL90vCkplNLfvhasGNak0/mdukHrmBoRgDK5UO2CVyE='
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.post('/users', (req, res) => {
  const { username } = req.body

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})

