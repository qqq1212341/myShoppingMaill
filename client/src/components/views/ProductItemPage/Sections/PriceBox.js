import React, {useState} from 'react'
import { Cascader } from 'antd';

function PriceBox(props) {
  const [Value, setValue] = useState(0)
  const cascaderChangeHandler = (value) => {
    
    console.log(value)
    setValue(value[0])
    props.handleFilters(value[0])
  }

  
  return (
    <div>
        <Cascader options={props.list} placeholder="Price select" expandTrigger="hover"
        onChange={cascaderChangeHandler}/>
    </div>
  )
}

export default PriceBox
