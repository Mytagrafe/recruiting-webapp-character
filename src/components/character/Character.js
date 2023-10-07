import React, { useState } from 'react';
import Attributes from './Attributes.js';
import Classes from './Classes.js';
import ClassDetail from './ClassDetail.js';
import Skills from './Skills.js'
import { CLASS_LIST } from '../../consts.js';

const Character = ({ character, handleSkill, handleAddSub }) => {

    const classList = CLASS_LIST

    const [selected, setSelected] = useState({});
    const [selectedName, setSelectedName] = useState('')
    const [classDetails, setClassDetails] = useState(false);

    const { index, attributeValues, modifiers, skillPoints, skillValues, validClasses } = character;

    const handleClassClick = (select) => {
        setClassDetails(true);
        setSelected(classList[select])
        setSelectedName(select);
    }

    const handleSkillClick = (ind, op) => {
        handleSkill(ind, op, character);
    }

    const handleAddSubClick = (ind, op) => {
        handleAddSub(ind, op, character);
    }

    const closeDetails = () => {
        setClassDetails(false);
    }

    return(
        <div>
            <h2 style={{ display: "flex", justifyContent: "center" }}>Character: {index}</h2>
            <div style={{ display: "flex", justifyContent: "center", columnGap: "2em"}}>
                <Attributes attributeValues={attributeValues} handleAddSub={handleAddSubClick} />
                <Classes handleClick={handleClassClick} validClasses={validClasses}/>
                {classDetails ? <ClassDetail classSelected={selected} name={selectedName} handleClick={closeDetails}/> : <></>}
                <Skills skillValues={skillValues} modValues={modifiers} skillPoints={skillPoints} handleSkill={handleSkillClick}/>
            </div>

        </div>
    )
    
}

export default Character;