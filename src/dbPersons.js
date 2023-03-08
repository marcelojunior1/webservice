

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}


const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


const deleteID = (id) => {
  const request = 
    axios.delete(`${baseUrl}/${id}`).catch(error => {console.log('fail')})
  return request.then(response => response.status)
}


export default { getAll, create, update, deleteID }