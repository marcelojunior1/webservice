
import Person from "./Person"

const Numbers = ({persons, filter, refresh}) =>
{
    return (
        <ul>
        {
          persons.map(person => 
            <Person  
              key={person.id} 
              person={person} 
              filter={filter}
              allPersons={persons}
            />
          )
        }
      </ul>
    )
}

export default Numbers
