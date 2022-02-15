import {useState} from 'react';
import SignUpView from '../views/SignUpView';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPerson, selectPerson } from '../store/reducers/authReducer'
/**
 * This is the basic frontend to sign up a user. 
 */
function SignUp() {

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
            dispatch(setCurrentPerson({person}));
            setReturnedData(newData.result);
        }
        console.log(reduxPerson);
    }

    return SignUpView({
        setInput: setInput, 
        getData: getData, 
        returnedData: returnedData
    });
}

export default SignUp;