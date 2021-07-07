import react from 'react';
import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/GAGA2.png';
import { Route, Link,Switch } from "react-router-dom";
import Result from './Result';

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
  margin-top:15%;
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
          <Link to = "/">
            <img src={Logo} style={{width:"12%", height:"24%", position:"absolute", margin: "1% 45%"}}></img>
            </Link>
            <Box>
                <Text>동영상을 업로드하고, 해당 영상의 등장 인물을 구분해보세요!</Text>
            </Box>
                <Link to="/result"> 
                <Box><UploadBtn>동영상 업로드하기</UploadBtn></Box>
                </Link>

        </Container>
    )
}

export default Main;