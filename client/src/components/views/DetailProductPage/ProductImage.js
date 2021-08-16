import React, {useEffect, useState} from 'react'
import ImageGallery from 'react-image-gallery'
import { image_SERVER } from '../../Config'

function ProductImage(props) {

  const [Images, setImages] = useState([])

  console.log(props.detail)
  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = []
      props.detail.images.map(item => {
        // console.log(item)
        images.push({
          original: image_SERVER+item,
          thumbnail: image_SERVER+item
        })
      })
      setImages(images)
    }
  }, [props.detail])

  return (
    <div style={{padding:'50px'}}>
      <ImageGallery items={Images} showNav={false} showPlayButton={false} showFullscreenButton={false} showThumbnails={false} showBullets={true} />
    </div>
  )
}

export default ProductImage
