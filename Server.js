
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
  console.error("APP ERRO", error.message)

  switch(error.name)
  {
    case 'CastError':
      return response.status(400).send('<h1 align=center> ERROR 400 </h1>')
      break;

    case 'ValidationError':
      return response.status(400).json({ error: error.message })
      break;
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
  
app.get('/api/persons', (req, res, next) => {
  Person.find({})
  .then(persons=> {res.json(persons)})
  .catch(error => errorHandler(error, req, res, next))
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
  const {name, number} = req.body

  Person.findByIdAndUpdate(
    req.params.id, 
    {name, number}, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => { res.json(updatedPerson)})
    .catch(error => errorHandler(error, req, res, next))

  return req.body
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(result => {
    //console.log('person saved!')
  }).catch(error => errorHandler(error, req, res, next))
})
