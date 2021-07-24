import react from 'react';  
import styled from 'styled-components';
import '../css/index.css';
import Logo from '../css/logo.png';
import Banner from '../css/banner.png'
import {Link} from 'react-router-dom';
import VideoUpload from '../component/VideoUpload';

// #수직정렬
// display:flex;
// align-items:center;
// justify-content:center;

const Header = styled.div`
  width:100%;
  height:10%;
`
const Body = styled.div`
  width: 100%;
  height: 90%;
  background-color: #F5F5F5;
`
const VideoBox = styled.div`
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`
const Img = styled.img`
  width: 17%;
  height: 13%;
  position: absolute;
  margin: 1% 40%
`
const Img2 = styled.img`
  width: 100%;
  height: 20%;
  margin: 9% 0% 3% 0%
`

const Main = () => {
    return(
        <div>
          <Header>
          <Link to = '/'><Img src={Logo} width="30%" height="30%"/></Link>
          <Img2 src={Banner}/>
          </Header>
          <Body>
          <VideoBox><VideoUpload></VideoUpload></VideoBox>
          </Body>
        </div>
    )
}

export default Main;