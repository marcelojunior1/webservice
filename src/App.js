
import { useState } from 'react'
import Filter from './Filter'
import AddPerson from './AddPerson'
import Numbers from './Numbers'
import dbPersons from './dbPersons'


const App = ({data}) => {

  /* UseState --------------------------------------------------------------------- */

  const [persons, setPersons] = useState(data) 
  const [newPersonName, setNewPersonName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  /* Funcoes callback ------------------------------------------------------------- */

  const handleNameChange = (event) => setNewPersonName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  /* Adiciona pessoa -------------------------------------------------------------- */
  
  const addPerson = (event) => 
  {
    event.preventDefault()

    if (newPersonName === '' || newNumber === '') {alert("Null values"); return;}

    let personExists = persons.find(person => (
        person.name.toLocaleLowerCase('pt-br') === 
        newPersonName.toLocaleLowerCase('pt-br')
      )
    )

    if (typeof personExists !== 'undefined')
    {
      let numberExists = personExists.number.find(num => num === newNumber)

      if (typeof numberExists !== 'undefined')
        alert(newPersonName + "and " + newNumber + " is already added to phonebook");
      else
      {
        personExists.number.push(newNumber)
        dbPersons.update(personExists.id, personExists)
        setPersons(persons)
      }
    }
    else
    {
      let newPerson = {name: newPersonName, number: [newNumber]}
      dbPersons.create(newPerson).then(resPerson => {
        setPersons(persons.concat(resPerson))
      })
    }

    setNewPersonName(''); setNewNumber('')
  }

  /* Refresh persons -------------------------------------------------------------- */

  const refreshPersons = (newPersons) => { setPersons(newPersons); console.log(newPersons);}

  /* Return ---------------------------------------------------------------------- */

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onSubmit={null} text={'filter shown with'} value={filter} onChange={handleFilterChange}/>
      
      <h2>add a new</h2>

      <AddPerson 
        onSubmit={addPerson} 
        text1={"name: "}  value1={newPersonName} onChange1={handleNameChange}
        text2={"number: "} value2={newNumber} onChange2={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} refresh={setPersons}/>

    </div>
  )
}

export default App