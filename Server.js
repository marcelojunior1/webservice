
const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(express.static('build'))
app.use(cors())

require('dotenv').config()

const Person = require('./models/person')

/* ----------------------------------------------------------------------------------- */

const errorHandler = (error, request, response, next) => {
  //console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send('<h1 align=center> ERROR 400 </h1>')
  } 
  next(error)
}
app.use(errorHandler)

/* ----------------------------------------------------------------------------------- */

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {res.send('<h1>Olá! </h1>')})
  
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons=> {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.find({_id: id})
      .then( p => {res.json(p)} )
      .catch( error => { errorHandler(error, req, res, next) })
})


app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
      .then(result => { res.status(204).end()})
      .catch(error => errorHandler(error, req, res, next))
})

app.put ('/api/persons/:id', (req, res, next) => {
  const id = Number(req.params.id)

  const upPerson = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, upPerson, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))

  return req.body
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(result => {
    console.log('person saved!')
  })
})
