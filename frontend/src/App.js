import './App.css';
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPerson, selectPerson } from './reducer/personSlice';

/**
 * This is the basic frontend to sign up a user. 
 */
function App() {

  const [returnedData, setReturnedData] = useState();
  const [person, setPerson] = useState({name: '', surname: '', pnr: '', email: '', password: '', username: ''});
  
  /**
   * When an action is dispatched, useSelector() will do a reference comparison of the 
   * previous selector result value and the current result value. If they are different,
   * the component will be forced to re-render. If they are the same, the component will 
   * not re-render.
   * 
   * useDispatch() gives you the ability to trigger actions from directly within the components/classes..
   * dispatch can be used multiple timed to wrap any functions that dispatch actions to the store.
   */
  const reduxPerson = useSelector(selectPerson);
  const dispatch = useDispatch();

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
      /**
       * dispatches action, equivalent to mapDispatchToProps
       */
      dispatch(setCurrentPerson({person}));
      setReturnedData(newData.result);
    }
  }

  return (
    <div className="App">
 
      {Object.keys(reduxPerson).map((key, i) => {
        return(
          <p key={i}>{reduxPerson[key]}</p>
        )
      })}

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