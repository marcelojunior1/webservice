import ReactDOM from 'react-dom/client'
import App from './App'
import dbPersons from './dbPersons'

dbPersons.getAll().then(data => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App data={
    data.map((obj) => ({...obj, number: [obj.number]}))
  } />)
})