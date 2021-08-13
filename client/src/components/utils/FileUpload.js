import Axios from 'axios';
import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import './FileUpload.css';
import {DeleteOutlined} from '@ant-design/icons';

function FileUpload(props) {
  // 나중에 시간되면 사진 여러개 upload 하는 것도 구현해보기, dropzone과 multer 건드려야함.
  const [imageArray, setimageArray] = useState([])
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    Axios.post('/api/product/image', formData, config)
      .then(response => {
        if(response.data.success){
          console.log(response.data)
          setimageArray([...imageArray, response.data.filePath])
          props.refreshFunction([...imageArray, response.data.filePath])
        } else {
          alert('파일을 저장하는데 실패했습니다.')
        }
      })
  }

  const imgDeleteHandler = (index) => {
    let newArray = [...imageArray]
    newArray.splice(index, 1)
    setimageArray(newArray)
    // 상위 컴포넌트로 보낼 때 함수를 사용
    props.refreshFunction(newArray)
  }

  return (
    <div style={{display:'flex', justifyContent: 'space-between'}}>
      <Dropzone onDrop={dropHandler}>
        {({getRootProps, getInputProps}) => (
          <div style={{width:'200px', height:'200px', border:'1px solid lightgray', display:'grid', placeItems:'center'}} {...getRootProps()}>
            <input {...getInputProps()}/>
            <div style={{fontWeight:'700', fontSize:'35px', color:'silver'}}>+</div>
          </div>
        )} 
      </Dropzone>
      <div 
      className={'imageArea'} 
      style={{ display: 'flex', width: '350px', height: '215px', overflowX: 'overlay'}}
      >
        {imageArray[0] &&
        imageArray.map((image, index) => 
        // onclick 함수에 데이터를 보내고 싶을때 이렇게 사용!!
          <span key={index} onClick={() => imgDeleteHandler(index)}>
          <div className={"screenContainer"}>
            <div className={"screen"}>
              <div className={"bottom"}><DeleteOutlined />Delete</div>
              <img 
              style={{ minWidth:'300px', width: '300px', height:'200px'}}
              src={`http://localhost:5000/${image}`}
              />
            </div>
          </div>
          </span>
        )}
      </div>
    </div>
  )
}



export default FileUpload


