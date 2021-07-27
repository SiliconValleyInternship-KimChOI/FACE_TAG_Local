import React , {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../css/index.css';
import axios from 'axios';
import Logo from '../css/logo.png';
import Banner from '../css/banner_1.png'
import {Link} from 'react-router-dom';
import ReactPlayer from 'react-player';
import Timeline from '../component/Timeline';
import Loading from '../component/Loading';

const Header = styled.div`
  height:80px;
  position: fixed; top:0;left:0;right:0;
  text-align:center;
  background:white;
  padding:5px 0 0 0;
  border-bottom: 3px solid #DCDCDC;
`
const Body = styled.div`
  background-color: #F5F5F5;
`
const VideoBox = styled.div`
border: 3px solid #DCDCDC;
background: white;
padding:3%;
float: left;
@media only screen and (min-width: 1300px) {
    width:800px;
    height:500px;
    margin:50px 15px 40px 0;
}
@media only screen and (max-width: 1300px) {   
    width: 95%;
    margin:30px 0 0 0;
}
`
const TimeBox = styled.div`
border: 3px solid #DCDCDC;
background: white;
padding:3%;
float: left;
width:325px;
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
const Img = styled.img`
  padding-top:5px;
`
const Img2 = styled.img`
  width: 100%;
  margin: 85px 0% 3% 0%
`

const Timediv = styled.p`
height:90%;
overflow: auto;
`


const Result= (props) => {
  const filename = props.location.aboutProps;
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState(null); //db -> name, image, timeline
  const [uploadedurl, setUploadedurl] = useState(null);  //video url
  const [controlState, setControlState] = useState(false); //video control

    useEffect (() => {
      // video
      axios.post('http://localhost:5000/fileDown', filename).then(response=>{
      console.log(response.data);
      setUploadedurl(response.data.url);
      setControlState(true);
      setData(response.data.timeline);
      setLoading(false);
    }).catch(error=>{
      console.log(error);
      setLoading(true);
    });},[]);

    return(
        <div>
          <Header>
          <Link to = '/'><Img src={Logo} height="80%"/></Link>
          </Header>
          <Img2 src={Banner}/>

          <Body>
          
          {loading ? 
              <div className="loadingbox">
                <Loading/> 
                <br></br>
                processing...
              </div>         
                : 
              <Div>
                <VideoBox>
                  <div className="title">Tagged Video</div>
                  <ReactPlayer url={uploadedurl} height='90%' width='100%' controls={controlState}/>
                  </VideoBox>
                <TimeBox>
                  <div className="title">Video</div>
                  <Timediv><Timeline data={data}/></Timediv>
                </TimeBox>
              </Div>
            } 
            
          </Body>         
        </div>
    )
  };
export default Result;