import React from 'react';
import { CLASS_LIST } from '../../consts.js';

const Classes = ( { handleClick, validClasses } ) => {

    const classList = CLASS_LIST;

    const validStyle = {
        color: "red"
    }

    const invalidStyle = {
        color: "black"
    }

    return(
        <div style={{border: '2px solid black'}}>
            <h2>Classes</h2>
                {Object.keys(classList)?.map((cl, index) => {
                    return(
                        <p key={index} onClick={() => handleClick(cl)} style={validClasses[index] ? validStyle : invalidStyle}>{cl}</p>
                    )
                })}
        </div>
    )
    
}

export default Classes;