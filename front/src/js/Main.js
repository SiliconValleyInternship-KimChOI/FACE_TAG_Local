import React from 'react';
import styled from 'styled-components';
import VideoUploadPage from './components/VideoUploadPage';


const Main = () => {
    return(
        <Container>
            <Element>
                <VideoUploadPage></VideoUploadPage>
            </Element>
        </Container>
    )
}


export default Main;

const Container = styled.div`
    // width: 100%;
`
const Element = styled.div`
    position: relative;
    width: 300px;
    height: 100px;
`


// const onDrop = (pictureFiles, pictureBase64) => {
//     // picutreFiles에 boundery 정보가 return 되고,
//     // pictureBase64 에 base64 정보가 return 된다. 기본 array로 return
    
//     this.setState({
//         files: this.state.files.concat(pictureFiles),
//     });
//     // 여기에 ajax를 넣을 수 있다.
// };


/* < ImageUploader
    withIcon={true}
    buttonText='이미지를 선택하세요'
    onChange={onDrop}
    imgExtension={['.jpg', '.gif', '.png', '.gif']}
    maxFileSize={5242880}
    withPreview={true}
/> */