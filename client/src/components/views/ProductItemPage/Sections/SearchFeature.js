import React, {useState} from 'react'
import './SearchFeature.css'

function SearchFeature(props) {
  
  const [InputValue, setInputValue] = useState("")

  const valueChangeHandler = e => {
    console.log(e.target.value)
    setInputValue(e.target.value)
    props.refreshFunction(e.target.value)
  }

  return (
    <div>
      <input
        className={'inputBox'}
        type={'text'}
        placeholder="Search.." 
        onChange={valueChangeHandler}
        value={InputValue}
      />
    </div>
  )
}

export default SearchFeature
