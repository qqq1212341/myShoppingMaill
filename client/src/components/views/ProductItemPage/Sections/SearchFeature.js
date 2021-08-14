import React from 'react'
import { Input } from 'antd';
const { Search } = Input;

function SearchFeature() {
  const onSearch = value => console.log(value);

  return (
    <div>
      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }}  />

    </div>
  )
}

export default SearchFeature
