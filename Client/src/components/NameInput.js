import React, {useState} from 'react';

const NameInput = ({label, changeValue, prop, isError}) => {
  const [name,setName] = useState('');

  const errorMessage = `Please insert a valid ${label}`

  return(
    <div className="ui form">
        <div className="field">
          <label>{label}</label>
          <input
            value={name}
            className="input"
            placeholder={prop===3 ? "mm/dd/yyyy" : ''}
            onChange={(e) => {setName(e.target.value); changeValue(prop, e.target.value)}}
          />
          <div style={{color: "red"}}>
            {isError ? errorMessage : ''}
          </div>
        </div>
      </div>
  );
}

export default NameInput;
