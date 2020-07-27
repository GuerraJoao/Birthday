import React, {useState} from 'react';

const Dropdown = ({label, options, changeValue, prop, isError}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Choose a Country')

  if(!options){
    options = [];
  }
  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option}
        className="item"
        onClick={() => {setSelected(option); changeValue(prop, option)}}
      >
        {option}
      </div>
    );
  });

  return(
    <div className="ui form">
      <div className="field">
        <label>{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
        <div style={{color: "red"}}>
          {isError ? 'Please choose a Country' : ''}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
