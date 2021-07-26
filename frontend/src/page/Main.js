import React, {useState} from 'react';
// 모듈 설치
import {Link} from 'react-router-dom';   //react link
import ReactPlayer from 'react-player';  //react video tag
import styled from 'styled-components';  //css
import {Form} from 'antd';               //form
import Dropzone from 'react-dropzone';   //file upload
import axios from 'axios';               //post
import Loading from './Loading';

const VideoBox = styled.div`
border: 3px solid #DCDCDC;
background: white;
padding:2%;
float: left;
@media only screen and (min-width: 1300px) {
    width:850px;
    height:500px;
    margin:50px 15px 40px 0;
}
@media only screen and (max-width: 1300px) {   
    width: 95%;
    margin:30px 0 0 0;
}
`
const BtnBox = styled.div`
border: 3px solid #DCDCDC;
background: white;
padding:2%;
float: left;
width:400px;
@media only screen and (min-width: 1300px) {
    height:500px;
    margin:50px 0 40px 15px;
}
@media only screen and (max-width: 1300px) {
    margin:30px 0 40px 0;
}
`
const Div = styled.div`
display:flex;    
justify-content: center;
align-items: center;
@media only screen and (max-width: 1300px) {
    flex-direction: column;
    width:100%;
}
`

const SelectBtn = styled.button`
    width: 300px;
    height: 60px;
    color: white;
    font-size: 1em;
    margin: 0 0 15px 0;
    background-color: black;
    border: 3px solid #DCDCDC;
    border-radius: 15px;
    text-align: center;
    text-decoration-line: none;
    font-family: 'NanumSquare', sans-serif;
    &:hover{
        background: var(--button-hover-bg-color, #404040);
    }
`
const UploadBtn = styled.button`
    width: 300px;
    height: 60px;
    color: #C3C3C3;
    font-size: 1em;
    margin: 0 0 15px 0;
    background-color: white;
    border: 3px solid #DCDCDC;
    border-radius: 15px;
    text-align: center;
    font-family: 'NanumSquare', sans-serif;
    &:hover{
        background: var(--button-hover-bg-color, #404040);
    }
`


const VideoUpload = () => {
    const [uploadedurl, setUploadedurl] = useState(null);  //video url
    const [controlState, setControlState] = useState(false); //video control
    const [name,setName] = useState(null); //video file name
    const [loading,setLoading] = useState(false);
    const [llink,setLlink] = useState('/'); //routing link
    const onDrop = (files) => {  
        setLoading(true);
        let formData = new FormData()
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])
        axios.post('http://localhost:5000/fileUpload', formData, config)
        .then((response) => {
            setLoading(false);
            setUploadedurl(URL.createObjectURL(files[0]));
            setControlState(true);
            console.log(response.data);
            const tempname = JSON.stringify(response.data,['name'],0);
            const tempname2 = JSON.parse(tempname).name;
            setName(tempname2);
            setLlink('/result');
        }).catch(err=>{setLoading(true);})
    }

    return (
        <Div>
            <VideoBox>
                <div className="title">Video</div>
                <ReactPlayer url={uploadedurl} controls={controlState}></ReactPlayer>
                {loading ? <Loading/> : <p></p>}
            </VideoBox>
            <BtnBox>
                <div className="title">Upload</div>
                <div className="button">
                <Form onSubmit>
                    <Dropzone
                        accept='video/*'
                        onDrop={onDrop}
                        multiple={false}    // 한번에 파일을 2개 이상 올릴건지
                        maxSize={100000000}    // 최대 사이즈 
                        >
                    {({getRootProps, getInputProps}) => (
                    <SelectBtn {...getRootProps()}>파일 선택<input {...getInputProps()} /></SelectBtn >)}
                    </Dropzone>
                <Link to = {{pathname: llink, aboutProps: {name}}}><UploadBtn>인물 태깅</UploadBtn></Link>
                </Form> 
                </div>
            </BtnBox>
        </Div>
    );
}

export default VideoUpload;
