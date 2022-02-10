import './App.css';
import React, {useState} from 'react';

/**
 * This is the basic frontend to sign up a user. 
 */
function App() {

  const [returnedData, setReturnedData] = useState();
  const [person, setPerson] = useState({name: '', surname: '', pnr: '', email: '', password: '', username: ''});

  const setInput = (e) => {
    const {name, value} = e.target;

    setPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  /**
   * Creates a POST-request with the data filled in by the user in the client. 
   * Receives the response from the server and sets the state variable "returnedData".
   */
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

    if(newData.error) {
      setReturnedData(newData.error);
    }
    
    if(newData.result) {
      setReturnedData(newData.result);
    }
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

      <p>{returnedData}</p>

    </div>
  );
}

export default App;