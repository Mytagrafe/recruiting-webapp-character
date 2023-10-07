import { useState, useEffect } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Character from './components/character/Character.js';
import OptionBar from './components/options/OptionBar';
import axios from 'axios';
import './axios/global';

function App() {
  const [characters, setCharacters] = useState([]);
  
  const url = 'https://recruiting.verylongdomaintotestwith.ca/api/{mytagrafe}/character';

  const loadData = async () => {
      try{
        await axios(url)
        .then(function (response) {

          if(response.status === 200)
            setCharacters(response.data.body.characters);
          else setCharacters([]);
        })
      } catch (error) {
        console.log(error);
        setCharacters([]);
      }
  }

  useEffect(() => {
    loadData();
  }, [])

  const saveCharacters = async () => {
    try {
      await axios.post(url, {
        characters
      }).then(function (response) {
        console.log(response);
      })
    } catch (error) {
      console.log(error);
    }
  }


  const newCharacter = () => {

    let newChar = {
      index: characters.length + 1,
      attributeValues: [],
      skillValues: [],
      validClasses: [],
      skillPoints: 10,
      modifiers: [],
    }

    let av = Array(ATTRIBUTE_LIST.length);
    av.fill(10);
    newChar.attributeValues = av;

    let sv = Array(SKILL_LIST.length);
    sv.fill(0);
    newChar.skillValues = sv;

    let modifiers = Array(ATTRIBUTE_LIST.length);
    modifiers.fill(0);
    newChar.modifiers = modifiers;

    let validClasses = checkValidClasses(newChar.attributeValues);
    newChar.validClasses = validClasses;

    setCharacters([...characters, newChar]);
  }

  const checkValidClasses = (arr) => {

    const vc = Object.keys(CLASS_LIST).map((cl) => {

        let vals = Object.values(CLASS_LIST[cl]);

        for(let i = 0; i < arr.length; i++) {

            if(arr[i] < vals[i]) {
                return false;
            }

        }
        return true;
    })
    return vc;
  }

  const handleAddSub = (ind, op, character) => {

    let attributeSum = character.attributeValues.reduce((sum, currValue) => {
        return sum + currValue;
    })

    if(attributeSum >= 70 && op > 0)
        alert("A character can have up to 70 delegated attribute points.");

    else {
        let newChar = character;
        let arr = character.attributeValues.map((attribute, index) => {

            if(ind === index) {

                if(attribute === 0 && op < 0) {
                    alert("Cannot go below zero.")
                    return 0;
                } else return attribute + (op);

            }
            else return attribute;
        })

        newChar.attributeValues = arr;
        newChar.validClasses = checkValidClasses(arr);
        newChar.skillPoints = checkSkillPoints(arr);
        newChar.modifiers = updateModifiers(arr);

        let newCharState = characters.map((ch) => {
          if(ch.index === character.index) {
            return newChar;
          } else return ch;
        })

        setCharacters(newCharState);
    }
  }

  const checkSkillPoints = (arr) => {
    let modifier = (Math.floor(arr[3] / 2)) - 5;
    return Math.max((10 + modifier*4), 0);
  }

  const updateModifiers = (arr) => {
    let res = arr.map((a, index) => {
      let modifier = (Math.floor(arr[index] / 2)) - 5;
      return modifier;
    })
    return res;
  }


const handleSkill = (ind, op, character) => {

  let skillSum = character.skillValues.reduce((sum, currValue) => {
      return sum + currValue;
  })

  if(skillSum >= character.skillPoints && op > 0)
      alert(`A character can have up to ${character.skillPoints} delegated skill points.`);

  else { 

    let newChar = character;
    let arr = character.skillValues.map((skill, index) => {
        if(ind === index) {
              if(skill === 0 && op < 0) {
                  alert("Cannot go below zero.")
                  return 0;
              } else return skill + (op);
          }
          else return skill;
    })

      newChar.skillValues = arr;

      let newCharState = characters.map((ch) => {
        if(ch.index === character.index)
          return newChar;
        else return ch;
      });

      setCharacters(newCharState);
  }
}

  const handleOptionBar = (type) => {
    switch(type) {
      case 'add':
        newCharacter();
        break;
      case 'reset':
        setCharacters([]);
        break;
      case 'save':
        saveCharacters(characters);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <header className="App-header">
        <h1>React Take Home Assignment - Yujie Li</h1>
      </header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <OptionBar handleClick={handleOptionBar}/>
      </div>
      {characters?.map((character, index) => {
        return(
          <Character key={index} character={character} handleAddSub={handleAddSub} handleSkill={handleSkill} />
        )
      })}
    </>
  );
}

export default App;
