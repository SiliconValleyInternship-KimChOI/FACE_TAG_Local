import styled from 'styled-components';

const Box = styled.div`
width:90%;
height:90%;
margin:5% 0 5% 0;
padding:5%;
`

const Profile=styled.div`
    display:flex;    
    justify-content: center;
    align-items: center;
`

const Img = styled.img`
width:70px;
height: 70px;
border-radius: 50%;
margin-right: 10px;
`
const Name = styled.div`
float:left;
font-size: 16px;
font-weight: 700;
weight: 100%;
`
const Time = styled.div`
`
const Timeline = (props) => {
    const data = props.data;
    const data_length = props.data.length;
    const characters = new Array();
    let temp = -1;
    for (let i=0; i<data_length; i++){
        if (i != 0 && data[i][0] == data[i-1][0]){
            characters[temp][2].push([data[i][2],data[i][3]]);
        }
        else{
        temp++;
        characters[temp] = []
        characters[temp].push(data[i][0]);
        characters[temp].push(data[i][1]);
        characters[temp][2] = new Array();
        characters[temp][2].push([data[i][2],data[i][3]]);        
        }
    }
    console.log(characters);


    return(
    <div>
     {characters.map(row => {
        return(
            <Box>
            <tr key={row}>
                <td key={row[1]}>
                    <Profile>
                        <Img src={row[1]}/>
                        <Name>{row[0]}</Name>
                    </Profile>   
                </td>      
            </tr>
            <tr>
                <td colsplan="2"><br/>{row[2].map(time => {
                    return(  
                        <Time>{time[0]}-{time[1]}<br/></Time>)})}</td>
            </tr>
            </Box>
        );})}
    </div>
    );
}

export default Timeline;


{/* <td key={row[0]}>{row[0]}
{row[2].map(time => {
    return(
        {time[0]}-{time[1]}<br/>
    )
})}
</td>  */}



// <Table>
// <thead>
//     <tr>
//         <th>Image</th>
//         <th>Name</th>
//         <th>Timeline</th>
//     </tr>
// </thead>
// <tbody>
//     {characters.map(row => {
//         return(
//             <tr key={row}>
//                 <Td key={row[1]}><img src={row[1]} width='200px' height='200px'/></Td>
//                 <Td key={row[0]}>{row[0]}</Td>
//                 <Td key={row[2]}>
//                 {row[2].map(time => {
//                     return(
//                         <p key={time}>{time[0]}-{time[1]}</p>
//                     )
//                 })}
//                 </Td> 
//             </tr>
//         );
//     })}
// </tbody>
// </Table>