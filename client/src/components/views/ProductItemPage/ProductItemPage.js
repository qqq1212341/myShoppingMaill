import Axios from 'axios'
import React, {useEffect} from 'react'

function ProductPage() {
  
  useEffect(() => {
    Axios.post('/api/product/products')
    .then(response => {
      if (response.data.success){
        console.log(response.data)
      } else{
        alert("상품 정보를 가져오는데 실패했습니다.")
      }
    })
  }, [])
  
  return (
    <div>
    </div>
  )
}

export default ProductPage
