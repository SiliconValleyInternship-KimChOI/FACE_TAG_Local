import react from 'react';
import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/GAGA2.png';

// #수직정렬
// display:flex;
// align-items:center;
// justify-content:center;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
//   background-color: #e1f1e7;
  background-size: cover;
`;

const Box = styled.div`
  width:100%;
  height:50%;
  border: 0px;
  display:flex;
  align-items:center;
  justify-content:center;
`
const Text = styled.p`
  color: black;
  font-size:2em;
  margin-top:22%;
//   background-color:white;
  font-family: 'Do Hyeon';
`

const UploadBtn = styled.button`
  width: 30%;
  height: 50%;
  margin : 2%;
  color:white;
  //color:#97C1A9;
  font-size: 3em;
  background-color: black;
  border: 0px;
  border-radius: 15px;
  text-align: center;
  font-family: 'Do Hyeon';
`


const Main = () => {
    return(
        <Container>
            <img src={Logo} style={{width:"13%", height:"26%", position:"absolute", margin: "2% 44%"}}></img>
            <Box>
                <Text>동영상을 업로드하고, 해당 영상의 등장 인물을 구분해보세요!</Text>
            </Box>
            <Box>
                {/* <UploadBtn>동영상 선택</UploadBtn> */}
                <UploadBtn>동영상 업로드하기</UploadBtn>
            </Box>
            <input type="file"/> 
        </Container>
    )
}

export default Main;