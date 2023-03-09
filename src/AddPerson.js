
const AddPerson = ({onSubmit, text1, value1, onChange1, text2, value2, onChange2}) =>
{
    return (
        
      <form onSubmit={onSubmit}>
        <div>
          {text1} <input value={value1} onChange={onChange1}/>
        </div>

        <div>
          {text2} <input value={value2} onChange={onChange2}/>
        </div>

        <div>
          <button type="submit"> add </button>
        </div>
      </form>
    )
}


export default AddPerson