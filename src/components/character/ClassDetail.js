import React from 'react';

const ClassDetail = ({ classSelected, name, handleClick }) => {

    return(
        <div style={{border: '2px solid black'}}>
            <h2>{name} Minimum Requirements</h2>
            {Object.keys(classSelected)?.map((attribute) => {
                return(
                    <p>
                        {attribute}: {classSelected[attribute]}
                    </p>
                )
            })}
            <button onClick={() => handleClick()}>Close Requirement View</button>
        </div>
    )
    
}

export default ClassDetail;