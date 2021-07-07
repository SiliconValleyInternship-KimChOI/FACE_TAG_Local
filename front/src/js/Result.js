import react from 'react'
import styled from "styled-components";
import '../css/index.css';
import Logo from '../css/GAGA2.png';
import ReactPlayer from 'react-player'

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

const Result= () => {
    return(
        <Container>
            <img src={Logo} style={{width:"13%", height:"26%", position:"absolute", margin: "2% 44%"}}></img>
            <Box>
                <Text>동영상 인물 태깅 완료! </Text>
            </Box>
            <Box>
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
            </Box> 
        </Container>
    )
}

export default Result;