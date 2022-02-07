import './App.css';
import React, {useState} from 'react';

function App() {

  const [returnedData, setReturnedData] = useState({});
  const [person, setPerson] = useState({name: '', surname: '', pnr: '', email: '', password: '', username: ''});

  const setInput = (e) => {
    const {name, value} = e.target;

    setPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const getData = async () => {
    const newData = await fetch('/signup/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: person.name,
        surname: person.surname,
        pnr: person.pnr,
        email: person.email,
        password: person.password,
        username: person.username
      })
    })
    .then(res => res.json());

    setReturnedData({
      name: newData.person.name, 
      surname: newData.person.name,
      pnr: newData.person.pnr,
      email: newData.person.email,
      password: newData.person.password,
      username: newData.person.username
    });
  }

  return (
    <div className="App">
      <input type="text" name="name" placeholder="Name" onChange={setInput}></input>
      <input type="text" name="surname" placeholder="Surname" onChange={setInput}></input>
      <input type="number" name="pnr" placeholder="SSN" onChange={setInput}></input>
      <input type="email" name="email" placeholder="Email" onChange={setInput}></input>
      <input type="password" name="password" placeholder="Password" onChange={setInput}></input>
      <input type="text" name="username" placeholder="Username" onChange={setInput}></input>
      <button onClick={() => getData()}>Sign up</button>
      <p>Firstname: {returnedData.name}</p>
      <p>Surname: {returnedData.surname}</p>
      <p>SSN: {returnedData.pnr}</p>
      <p>Email: {returnedData.email}</p>
      <p>Password: {returnedData.password}</p>
      <p>Username: {returnedData.username}</p>

    </div>
  );
}

export default App;