import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import "./DetailProductPage.css"
import { Button } from 'antd';
import ProductImage from './ProductImage';



function DetailProductPage(props) {

  const productId = props.match.params.productId
  const [Product, setProduct] = useState(0)
  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
    .then(response => {
      if(response.data.success){
        setProduct(response.data.product[0])
      } else {
        alert('상세 정보를 가져오는데 실패했습니다.')
      }
    })
  }, [])

  function Categori(obj){
    if (obj === 1){
      return "Outer"
    } else if (obj === 2){
      return "Top"
    } else if (obj === 3){
      return "Bottom"
    } else if (obj === 4){
      return "Bag"
    } else if (obj === 5){
      return "Shoes"
    } else if (obj === 6){
      return "Accessary"
    } else if (obj === 7){
      return "Etc"
    }
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'2.5fr 1fr', padding:'2rem 4rem', paddingTop:'10px'}}>
      <div>
        <ProductImage detail={Product}/>
      </div>
      <div style={{display:'grid', gridTemplateRows:'1fr 4fr 1fr 1fr', gap:'20px', marginTop:'70px', marginBottom:'50px'}}>
        <div>
          <div className={"title"}>{Product.title}</div>
          <div className={"categori"}>{Categori(Product.clothesCategori)}</div>
        </div>
        <div className={"desc"}>{Product.description}</div>
        <div className={"price"}>{Number(Product.price).toLocaleString()} 원</div>
        <Button>Add to Cart</Button>
      </div>
    </div>
  )
}

export default DetailProductPage
