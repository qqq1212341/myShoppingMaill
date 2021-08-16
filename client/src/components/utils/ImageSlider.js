import React, {useState} from 'react'
import {Carousel} from 'antd';
import { image_SERVER } from '../Config';
import './ImageSlider.css'

function ImageSlider(props) {
  const [dotsState, setdotsState] = useState(true)

  const mouseEnterHandler = () => {
    setdotsState(false)
  }

  const mouseLeaverHandler = () => {
    setdotsState(true)
  }

  return (
    <div className={"img_box"}>
      <div className={"Image"} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaverHandler}>
        <Carousel autoplay={true} dots={dotsState}>
          {props.images.map((image, index)=>
            <div key={index}>
              <img 

              style={{width:'100%', maxHeight:'250px', objectFit:'contain'}}
              src={image_SERVER+image}/>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default ImageSlider
