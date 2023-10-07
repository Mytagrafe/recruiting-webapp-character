import React from 'react';

const OptionBar = ({ handleClick }) => {
    
    return(
        <section>
            <button onClick={() => handleClick('add')}>Add New Character</button>
            <button onClick={() => handleClick('reset')}>Reset All Characters</button>
            <button onClick={() => handleClick('save')}>Save All Characters</button>
        </section>
    )
    
}

export default OptionBar;