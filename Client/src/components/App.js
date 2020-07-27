import React, {useState, useEffect} from 'react';
import NameInput from './NameInput';
import CountryInput from './CountryInput';
import {MonthName} from './helpers/MonthName';
import Table from './Table';
import axios from 'axios';

//inicialização dos arrays que guardam a lista de países (options) e os valores
//temporários dos inputs

let options = [];
let temp = ['','','','']


const App = () => {

  //state variables que guardam a mensagem, a informação sobre todos os utilizadores (data)
  //se há erros em algum dos inputs (errors)
  const[message, setMessage] = useState('');
  const[data, setData] = useState([]);
  const[errors, setErrors] = useState([false,false,false,false]);

  //variável que guarda a data e que é usada para calcular o próximo aniversário do utilizador

  const date = new Date();

  //função que vai buscar a lista de países ao servidor. Como a lista não muda
  //ao longo da execução do programa, só é preciso pedi-la uma vez, daí o useEffect

  useEffect(() => {
    axios.get('http://localhost:4000/info').then((res) => {res.data.forEach((item) => {
      options.push(item.name);
    });
    })
  },[])

  //função que vai ser passada às componentes dos inputs para actualizar o valore
  //da variável temp

  const changeValue = (prop, value) => {
    temp[prop] = value;
  }

  //função que corre quando o utilizador clica no botão Save.
  //Começa por verificar se os campos estão preenchidos (função validate)
  //e depois verifica se a data de nascimento é válida (função validateBirthday)
  //Se não houver erros, actualiza a mensagem e guarda os dados que estão na variável temp na variável data

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
      setData([...data, {name: `${temp[0]} ${temp[1]}`, country: temp[2], birthday: `${month}/${day}/${year}` }]);
    }
    else{ setData([...data]);}
  }

  //definição das helper functions

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
    if(!Number(day) || !Number(month) || !Number(year) || month > 12 || month < 0 || day < 0 || day > 31 || (['04','06','09','11'].indexOf(month) >= 0 && day > 30) || (month == '02' && day > (28 + (year%4 == 0))) || !(year < date.getFullYear() || (year === date.getFullYear() && month <= date.getMonth() + 1 && day < date.getDate()))){
      let temp2 = errors;
      temp2[3] = true;
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
          <NameInput label="Name" changeValue={changeValue} prop={0} isError={errors[0]} />
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
