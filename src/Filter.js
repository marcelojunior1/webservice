
const Filter = ({onSubmit, text, value, onChange}) =>
{
    return (
        <form onSubmit={onSubmit}>
            <div>
                {text}  <input value={value} onChange={onChange} />
            </div>
        </form>
    )
}

export default Filter