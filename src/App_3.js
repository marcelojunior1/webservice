

import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const Hook = () => 
  {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }


  useEffect(Hook, [])
  
  console.log('render', notes.length, 'notes')

    return (
        <div>
            <p> Notas p </p>
        </div>
    )
}

export default App