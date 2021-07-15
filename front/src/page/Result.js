import React , {useState} from 'react';
import styled from 'styled-components';
import '../css/index.css';
import axios from 'axios';
import Logo from '../css/GAGA2.png';
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player'


//임시로 사진 사용
import harry from "../css/harry.jpg"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
const Img = styled.img`
  width: 12%;
  height: 24%;
  position: absolute;
  margin: 1% 45%;
`
const Table = styled.table`
  margin: 0% 15%;
  width:70%;
  border: 1px solid;
  border-radius: 15px;
  align-items:center;
  text-align:center;
  font-family: 'Do Hyeon';
`
const Tr = styled.tr`
  border: 1px solid;
`

const Td = styled.td`
  border-top: 1px solid;
  font-size: 1.4em;
`

const Result= (props) => {
  const filename = props.location.aboutProps
  //console.log(filename);
  const [uploadedurl, setUploadedurl] = useState(null);  //video url
  const [controlState, setControlState] = useState(false); //video control

  const onClick = () => {
    // let formData = new FormData()
    axios.post('http://localhost:5000/fileDown',{filename}).then(response=>{
     console.log(response.data);
     // setUploadedurl(URL.createObjectURL(response.data));
     setControlState(true);
  })
  }
    return(
        <Container>
            <Link to = "/">
            <Img src={Logo} alt = "logo" />
            </Link>
            <Box>
                <Text>동영상 인물 태깅 완료! </Text>
            </Box>
            <button onClick = {onClick}>click</button>
            
            <ReactPlayer url={uploadedurl} height='200px' controls={controlState}/>
            <Box>
              <Text>등장인물 타임라인</Text>
              </Box>
            <Table>
              <Tr>
              <th>Image</th>
              <th>Name</th>
              <th>Timeline</th>
              </Tr>

              <Tr>
              <Td><img src={harry} height="200px"/></Td>
              <Td>Harry Potter</Td>
              <Td>00:30 00:59 01:22</Td>
              </Tr>

              <Tr>
              <Td><img src={harry} height="200px" /></Td>
              <Td>Ron Weasley</Td>
              <Td>00:11 00:50</Td>
              </Tr>

              <Tr>
              <Td><img src={harry} height="200px" /></Td>
              <Td>Hermione Granger</Td>
              <Td>00:30 00:59 01:22</Td>
              </Tr>
              </Table>
        </Container>
    )
}

export default Result;