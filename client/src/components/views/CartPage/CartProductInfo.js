import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import { image_SERVER } from '../../Config'
import PriceBox from '../ProductItemPage/Sections/PriceBox'

function CartProductInfo(props) {
  const [Product, setProduct] = useState(0)
  const [ProductImage, setProductImage] = useState(0)

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${props.id}&type=single`)
    .then(response => {
        if (response.data.success){
          // console.log(response.data.product[0])s
          setProduct(response.data.product[0])
          setProductImage(response.data.product[0].images[0])
        }
    })
  }, [])

  

  return (
    <div style={{backgroundColor: 'white', display: 'grid', gridTemplateColumns: '1.2fr 3.5fr 1.2fr 1.3fr', marginBottom:'40px', height:'240px', paddingTop:'35px', fontSize:'22px'}}>
      {ProductImage !== 0 && 
      <img style={{display:'grid', placeItems:'center', objectFit:'cover', height:'180px', width:'220px'}} src={image_SERVER+ProductImage}></img>
      }
      <div style={{display:'grid', gridTemplateRows:'0.6fr 2fr 1fr'}}>
        <div style={{}}>{Product.title}</div>
        <div style={{color:'rgb(136,142,148)', fontSize:'12px', marginTop:'0px'}}>{Product._id}</div>
        <button 
        style={{width:'60px', height:'20px', fontSize:'12px', backgroundColor:'white', border:'none', borderBottom:'1px solid rgb(220,227,234)', color:'rgb(136,142,148)'}}
        onClick={() => props.removeItem(Product._id)}
        >
          상품 삭제
        </button>
      </div>
      <div>{props.quantity}개</div>
      <div>{Number(Product.price * props.quantity).toLocaleString()}원</div>
    </div>
  )
}

export default CartProductInfo
