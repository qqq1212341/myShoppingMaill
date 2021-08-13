import React, {useState} from 'react'
import './UploadProductPage.css';
import { Button } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;


function UploadProductPage(props) {

    const CategoriArray = [
        {key: 1, value:"Outer"},
        {key: 2, value:"Top"},
        {key: 3, value:"Bottom"},
        {key: 4, value:"One Piece"},
        {key: 5, value:"Bag"},
        {key: 6, value:"Shoes"},
        {key: 7, value:"Accessary"},
        {key: 8, value:"Etc"},
    ]

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState("")
    const [Categori, setCategori] = useState(1)
    const [Image, setImage] = useState([])

    const inputStyle = {
        width:'100%'
    }

    const titleChangeHandler = (e) => {
        setTitle(e.target.value)
    }

    const descChangeHandler = (e) => {
        setDescription(e.target.value)
    }

    const priceChangeHandler = (e) => {
        setPrice(e.target.value)
    }

    const categoriChangeHandler = (e) => {
        setCategori(CategoriArray[e-1].value)
    }

    // 하위 컴포넌트로부터 데이터를 받아옴
    const updateImages = (newImages) => [
        setImage(newImages)
    ]

    const submitHandler = (e) => {
        e.preventDefault();
        if(!Title || !Description || !Price || !Image) {
            // alert 고치기
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        const body = {
            // 로그인된 사람의 ID를 가져오기, auth에서 user 값을 return했기 때문에 prop으로 항상 받아올 수가 있음.
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Image,
            categori: Categori
        }
        Axios.post('/api/product', body)
        .then(response=> {
            if(response.data.success){
                alert('업로드 했습니다!')
                //랜딩 페이지로 보냄
                console.log(body)
                props.history.push('/')
            } else {
                alert('업로드에 실패했습니다.')
            }
        })
    }

    return (
        <div className={"mainUploadProducPage"}>
            <form 
            className={"form_UploadProductPage"}
            onSubmit={submitHandler}
            >
                {/* 하위 컴포넌트로 험수를 보내 데이터를 받아옴 */}
                <FileUpload refreshFunction = {updateImages}/>
                <div>
                    <div>Title</div>
                    <Input style={inputStyle} onChange={titleChangeHandler}
                    value={Title}/>
                </div>
                <div>
                    <div>Discription</div>
                    <TextArea style={inputStyle} onChange={descChangeHandler}
                    value={Description}/>   
                </div>
                <div>
                    <div>Price(₩)</div>
                    <Input type="number" style={inputStyle} onChange={priceChangeHandler}
                    value={Price}/>
                 </div>
                <Select defaultValue="Outer" style={{ width: 120 }}
                onChange={categoriChangeHandler} value={Categori}>
                    {CategoriArray.map((item) => (
                        <Option key={item.key} value={item.key}>{item.value}</Option>
                    ))}
                </Select>
                <Button 
                style={{width:'80px'}}
                htmlType="submit"
                >Submit</Button>
            </form>
        </div>
    )
}

export default UploadProductPage
