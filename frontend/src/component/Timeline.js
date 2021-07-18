import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  margin: 0% 15%;
  width:70%;
  border: 1px solid;
  border-radius: 15px;
  align-items:center;
  text-align:center;
  font-family: 'Do Hyeon';
`
// const Tr = styled.tr`
//   border: 1px solid;
// `

// const Td = styled.td`
//   border-top: 1px solid;
//   font-size: 1.4em;
//`

const Timeline = (props) => {
    const character = props.data;
    const length = props.length;
    console.log(character, length);

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                    </tr>
                </thead>

                <tbody>
                    {character.map(c => {
                        return(
                            <tr key={c}>
                                <td key={c}>{c}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default Timeline;



{/* <Table>
              <thead>
              <Tr>
              <th>Image</th>
              <th>Name</th>
              <th>Timeline</th>
              </Tr>
              </thead>
              <tbody>
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
              </tbody>
              </Table> */}