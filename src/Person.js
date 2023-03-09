import { all } from "axios";
import dbPersons from "./dbPersons";

const Person = ({person, filter, allPersons, refresh}) => {
    if ( filter !== '' && 
          person.name.toLocaleLowerCase('pt-br') !== 
          filter.toLocaleLowerCase('pt-br')
        )
      return;

    return (
      <li> 
        {person.name}
        {" "}
        {person.number.map(num => (' ' + num + ' '))} 

        <button onClick={ () => {
          if (window.confirm("Delete " + person.name + ' ?')) 
          {
            dbPersons.deleteID(person.id)
            let index = allPersons.indexOf(person)
            allPersons.splice(index, 1)
          }
        }} > Delete </button>
      </li>
    )
  }
  
  export default Person