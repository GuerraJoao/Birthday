import React, {useState, useEffect} from 'react';
import NameInput from './NameInput';
import CountryInput from './CountryInput';
import {MonthName} from './helpers/MonthName';
import {options} from './helpers/Options';
import Table from './Table';
import axios from 'axios';


const App = () => {
  const[message, setMessage] = useState('');
  const[data, setData] = useState([]);
  const[errors, setErrors] = useState([false,false,false,false]);
  const[temp, setTemp] = useState(['','','','']);

  const date = new Date();

  useEffect(() => {
    axios.get('http://localhost:4000/info').then((res) => {res.data.forEach((item) => {
      options.push(item.name);
    });
    })
  },[])

  const changeValue = (prop, value) => {
    const temp2 = temp;
    temp2[prop] = value;
    setTemp(temp2);
  }

  const onClick = () => {
    temp.forEach((item, i) => {
      validate(i);
      }
    );

    const day = temp[3][3] + temp[3][4];
    const month = temp[3][0] + temp[3][1];
    const year = temp[3][6] + temp[3][7] + temp[3][8] + temp[3][9];

    validateBirthday(day,month,year);

    const isError = errors.reduce((acc, item) => {
      return acc || item;
    },false)

    if(!isError){
      setMessage(`Hello, ${temp[0]} ${temp[1]} from ${temp[2]}. On ${day} of ${MonthName(month)} of ${nextBirthday(day,month)} you will be ${nextBirthday(day,month) - year} years old!`);
      setData([...data, {name: `${temp[0]} ${temp[1]}`, country: temp[2], birthday: temp[3] }]);
    }
    else{ setData([...data]);}
    console.log(data)
  }

  const validate = (index) => {
    const temp2 = errors;
    if(!temp[index]){
      temp2[index] = true;
      setErrors(temp2);
    }
    else{
      temp2[index] = false;
      setErrors(temp2);
    }
  }

  const validateBirthday = (day, month, year) => {
    if(!Number(day) || !Number(month) || !Number(year) || month > 12 || month < 0 || day < 0 || day > 31 || !(year < date.getFullYear() || (year === date.getFullYear() && month <= date.getMonth() + 1 && day < date.getDate()))){
      let temp2 = errors;
      temp2[3] = true;
      console.log(temp2)
        setErrors(temp2);
    }
  }

  const nextBirthday = (day,month) => {
    if(month <= date.getMonth() + 1 && day < date.getDate()){
      return date.getFullYear() + 1;
    }
    return date.getFullYear();
  }

  return(
    <div className="ui container" >
      <div className="ui grid" style={{paddingTop: "10px"}}>
        <div className="eight wide column">
          <NameInput label="Name" changeValue={changeValue} prop={0} isError={errors[0]}/>
          <NameInput label="Surname" changeValue={changeValue} prop={1} isError={errors[1]}/>
          <CountryInput label="Country" options={options} changeValue={changeValue} prop={2} isError={errors[2]}/>
          <NameInput label="Birthday" changeValue={changeValue} prop={3} isError={errors[3]}/>
          <div style={{paddingTop: "20px", float: "right"}}>
            <button className="ui button primary" onClick={onClick}>
              Save
            </button>
          </div>
          <div style={{paddingTop: "100px"}}>
            {message}
          </div>
        </div>
        <div className="eight wide column">
          <Table data={data}/>
        </div>
      </div>
    </div>
  );
}

export default App;
