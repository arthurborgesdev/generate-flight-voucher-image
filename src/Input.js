import React, { useReducer } from 'react';


const Input = () => {
  
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      cpf: '',
      address: '',
    }
  );

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;

    setUserInput({[name]: newValue});
  }

  const onSubmit = () => {
    alert(JSON.stringify(userInput));
  }
  
  return (
    <div className="input-reducer">
      <input type="text" name="firstName" value={userInput.firstName} onChange={handleChange} />
      <input type="text" name="lastName" value={userInput.lastName} onChange={handleChange} />
      <input type="text" name="phoneNumber" value={userInput.phoneNumber} onChange={handleChange} />
      <input type="text" name="cpf" value={userInput.cpf} onChange={handleChange} />
      <input type="text" name="address" value={userInput.address} onChange={handleChange} />
      <button type="submit" value="Submit" onClick={() => onSubmit()}>Enviar</button>
    </div>
  );
}

export default Input;