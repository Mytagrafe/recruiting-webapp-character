import React from 'react';
import { SKILL_LIST, MODIFIER_ENUM } from '../../consts.js';

const Skills = ({ skillValues, modValues, skillPoints, handleSkill }) => {

    const skillList = SKILL_LIST;
    const modifierEnum = MODIFIER_ENUM;

    return(
        <div style={{border: '2px solid black'}}>
            <h2>Skills</h2>
            <p>Total Skill Points available: {skillPoints} </p>
            {skillList.map((skill, index) => {

                let modInd = modifierEnum[skill.attributeModifier];

                    return(
                        <p key={index}>
                            {`${skill.name}: ${skillValues[index]} (Modifier: ${skill.attributeModifier}): 
                            ${modValues[modInd]} Total: ${modValues[modInd] + skillValues[index]}`}
                            <button onClick={() => handleSkill(index, 1)}>+</button>
                            <button onClick={() => handleSkill(index, -1)}>-</button>
                        </p>
                    )
            })}
        </div>
    )
    
}

export default Skills;