import React, {useState} from 'react'
import {Radio} from 'antd';



function RadioBox(props) {

  const [Value, setValue] = useState(0)

  const renderRadioBox = () => (

    props.list && props.list.map(value => (
      <Radio.Button key={value.key} value={value.key}>{value.value}</Radio.Button>
    ))
  )

  const handleChange = (event) => {
    // console.log(event.target.value)
    setValue(event.target.value)
    props.handleFilters(event.target.value)
  }

  return (
    <div>
      <Radio.Group onChange={handleChange} value={Value}>
        {renderRadioBox()}
      </Radio.Group>
    </div>
  )
}

export default RadioBox
