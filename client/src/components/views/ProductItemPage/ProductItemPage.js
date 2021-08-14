import ImageSlider from '../../utils/ImageSlider';
import './ProductItemPage.css';

import Axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {Card, Col, Row} from 'antd';
import RadioBox from './Sections/RadioBox';
import { CategoriArray, price } from './Sections/Datas';
import PriceBox from './Sections/PriceBox';
import Grid from 'antd/lib/card/Grid';
import SearchFeature from './Sections/SearchFeature';
const { Meta } = Card;


function ProductPage() {
  const buttonRef = useRef(null);
  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState(0)
  const [Filters, setFilters] = useState({
    clothesCategori : [],
    price : []
  })

  const getProduct = (body) => {
    Axios.post('/api/product/products', body)
    .then(response => {
      if (response.data.success){
        if (body.loadMore = true){
          setProducts([...Products, ...response.data.productInfo])
        } else {
          setProducts(response.data.productInfo)
        }
        setPostSize(response.data.postSize)
      } else{
        alert("상품 정보를 가져오는데 실패했습니다.")
      }
    })
  }

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit
    }

    getProduct(body)

    window.addEventListener('scroll', _infinityScroll, true)
  }, [])

  const _infinityScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      // console.log(PostSize, Limit)
      buttonRef.current.click()
    }
  }

  const loadMoreHandler = () => {
    let skip = Skip + Limit
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true
    }
    getProduct(body)
  }

  const renderCard = Products.map((product, index) => {
    return <Col key={index} xxl={6} lg={8} xs={12}>
      <Card 
        style={{maxWidth:'300px'}}
        hoverable
        cover={
        <ImageSlider images={product.images} />
        }
      >
        <Meta 
          title={product.title}
          description={`₩${product.price}`}
        />
      </Card>
    </Col>
  })

  const showFilteredResults = (filters) => {
    
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters
    }

    console.log(body)

    Axios.post('/api/product/products', body)
    .then(response => {
      if (response.data.success){
        if (body.loadMore = true){
          setProducts(response.data.productInfo)
        } else {
          setProducts(response.data.productInfo)
        }
        setPostSize(response.data.postSize)
      } else{
        alert("상품 정보를 가져오는데 실패했습니다.")
      }
    })
  }

  const handleFilters = (filters, categori) => {
    const newFilters = {...Filters}
    newFilters[categori] = filters
    showFilteredResults(newFilters)
    setFilters(newFilters)
  }
  console.log(Skip)
  return (
    <div style={{width:'80%', margin:'3rem auto', marginTop:'0px'}}>
      {/* Filter */}
      {/* RadioBox */}
      <div style={{display:'grid', gridTemplateColumns:'5fr 1fr', marginBottom: '20px', marginTop: '20px'}}>
        <div></div>
        <SearchFeature/>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'5fr 1fr'}}>
          <RadioBox list={CategoriArray} handleFilters={filters => handleFilters(filters, "clothesCategori")}/>
          <PriceBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
      </div>
      {/* Search */}


      <div style={{marginTop:'30px'}}>
        <Row gutter={[32, 32]}>
          {renderCard}
        </Row>
        {PostSize >= Limit &&
          <div style={{display:'grid', placeItems:'center'}}>
            <button style={{visibility:'hidden'}} ref={buttonRef} onClick={loadMoreHandler}>Load More</button>
          </div>
        }
        {PostSize < Limit &&
          <div style={{display:'grid', placeItems:'center'}}>
            <button ref={buttonRef} style={{visibility:'hidden'}}></button>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductPage
