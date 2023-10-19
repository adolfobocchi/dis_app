


function TextArea ({label, fieldData}) {
    console.log(fieldData)
    return (
        <span>{`${label} ${fieldData !== undefined ?  fieldData : ''}`}</span>
    )
}

export default TextArea;