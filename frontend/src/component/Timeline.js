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
const Td = styled.td`
  font-size: 1.4em;
`

const Timeline = (props) => {
    const character = props.data;

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Timeline</th>
                    </tr>
                </thead>

                <tbody>
                    {character.map(row => {
                        return(
                            <tr key={row}>
                                <Td key={row[1]}><img src={row[1]} width='200px' height='200px'/></Td>
                                <Td key={row[0]}>{row[0]}</Td>
                                <Td>00:00 12:00 13:51 14:20</Td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default Timeline;