import ReactDOM from 'react-dom/client'
import App from './App'
import notes from './services/notes'

notes.getAll().then(data => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App data={data} />)
})