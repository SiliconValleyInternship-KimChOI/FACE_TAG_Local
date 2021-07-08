import React, {useState} from 'react';
import styled from 'styled-components';

// 깔아야 할 것.
// antd, react-dropzone, axios
import { Typography, Button, Form} from 'antd';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ReactPlayer from 'react-player';

function VideoUploadPage() {
    const { Title } = Typography;
    const [data, setData] = useState(null);
    const [uploadedurl, setUploadedurl] = useState(null);
    const onDrop = (files) => {
        let formData = new FormData()
        
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])
        axios.post('http://localhost:5000/fileUpload', formData, config)
        .then((response) => {
            setUploadedurl(URL.createObjectURL(files[0]))
            setData(response.data)
        })
    }


    return (
        <Body>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}> Add Original Video</Title>
            </div>
            <Form  onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}    // 한번에 파일을 2개 이상 올릴건지
                        maxSize={100000000}    // 최대 사이즈 
                    >
                    {({getRootProps, getInputProps, isDragActive}) => (
                        <div style= {{width: '500px', height: '240px', border: '1px solid lightgray',
                        alignItems: 'center', justifyContent:'center', display: 'flex', background: "#D8D8D8"}}
                        {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <PlusCircleOutlined style={{fontSize: '2rem', 
                            display: 'flex', justifyContent:'center'
                            }}/>
                        </div>
                    )}
                    </Dropzone>
                </div>
                <br/>
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
                {data}
                <ReactPlayer url={uploadedurl} controls={true}></ReactPlayer>
            </Form>
        </Body>
    )
}

export default VideoUploadPage;

styled(ReactPlayer)

const Body = styled.div`
    position: relative;
    width: 400px;
    height: 100px;
    top: 50%;
    left: 50%;
    margin: auto;
    // transform: translate(-50%, -50%)
`
