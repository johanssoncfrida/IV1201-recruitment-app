import {useState} from 'react';
import SignUpView from '../views/SignUpView';

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

    return SignUpView({
        setInput: setInput, 
        getData: getData, 
        returnedData: returnedData
        });
}

export default SignUp;