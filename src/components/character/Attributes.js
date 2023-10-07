import React from 'react';
import { ATTRIBUTE_LIST } from '../../consts.js';

const Attributes = ({ attributeValues, handleAddSub }) => {

    const attributeList = ATTRIBUTE_LIST;

    return(
        <div style={{border: '2px solid black'}}>
            <h2>Attributes</h2>
            {attributeList.map((attribute, index) => {
                
                let modifier = (Math.floor(attributeValues[index] / 2)) - 5;

                return(<p key={index}>{attribute}: {attributeValues[index]} {`(Modifier: ` + modifier + `)`}
                    <button onClick={() => handleAddSub(index, 1)}>+</button>
                    <button onClick={() => handleAddSub(index, -1)}>-</button>
                </p>)
            })}
        </div>

    )
    
}

export default Attributes;