import React, {useState} from 'react';
// 모듈 설치
import {Link} from "react-router-dom";   //react link
import ReactPlayer from 'react-player';  //react video tag
import styled from 'styled-components';  //css
import {Form} from 'antd';               //form
import Dropzone from 'react-dropzone';   //file upload
import axios from 'axios';               //post
import Loading from './Loading';

const SelectBtn = styled.button`
    width: 48%;
    height: 50%;
    margin : 2%;
    color: white;
    font-size: 3em;
    background-color: black;
    border: 0px;
    border-radius: 15px;
    text-align: center;
    text-decoration-line: none;
    font-family: 'Do Hyeon';
    box-shadow: 1px 4px 0 rgb(0,0,0,0.5);
    &:hover{
        background: var(--button-hover-bg-color, #404040);
    }
    &:active {
        box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
        position: relative;
        top:2px;
    }
`
const UploadBtn = styled.button`
    width: 120%;
    height: 50%;
    margin : 2%;
    color: white;
    font-size: 3em ;
    background-color: black;
    border: 0px;
    border-radius: 15px;
    text-align: center;
    font-family: 'Do Hyeon';
    box-shadow: 1px 4px 0 rgb(0,0,0,0.5);
    &:hover{
        background: var(--button-hover-bg-color, #404040);
    }
    &:active {
        box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
        position: relative;
        top:2px;
    }
`
const Box = styled.div`
    width:100%;
    height:50%;
    border: 0px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
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
        <div>
            <ReactPlayer url={uploadedurl} controls={controlState}></ReactPlayer>
            {loading ? <Loading/> : <p>{name}</p>}
            <Form  onSubmit>
                <Box>
                    <Dropzone
                        accept="video/*"
                        onDrop={onDrop}
                        multiple={false}    // 한번에 파일을 2개 이상 올릴건지
                        maxSize={100000000}    // 최대 사이즈 
                    >
                    {({getRootProps, getInputProps}) => (
                        <SelectBtn {...getRootProps()}>
                        파일 선택
                        <input {...getInputProps()} />
                        </SelectBtn >
                    )}
                    </Dropzone>

                    {/* <div><UploadBtn>동영상 업로드</UploadBtn></div> */}
                    <Link to = {{pathname: llink, aboutProps: {name}}}>
                    <UploadBtn>동영상 업로드</UploadBtn>
                    </Link>
                </Box>
            </Form>
        </div>
    );
}

export default VideoUpload;