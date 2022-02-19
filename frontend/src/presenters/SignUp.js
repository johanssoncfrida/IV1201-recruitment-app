import {useEffect, useState} from 'react';
import SignUpView from '../views/SignUpView';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCurrentPerson } from '../store/actions/Actions';

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
     * useSelector() will look in the index.js file after Provider.
     * Provider will provide useSelector with the store state which
     * is the state parameter. reduxPerson is an object with 
     * the store state's parameters.
     * 
     * useDispatch() will dispatch actions to the reducer.
     */
    const reduxPerson = useSelector(state => state.auth.person);
    const dispatch = useDispatch();

    // Used to redirect to another page
    const navigate = useNavigate();

    /**
     * Creates a POST-request with the data filled in by the user in the client. 
     * Receives the response from the server and sets the state variable "returnedData".
     */
    const getData = async () => {
        let status;
        let statusText;
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
        }).then(res => {
            status = res.status;
            statusText = res.statusText;
            return res.json();
        }).catch(err => {
            return { error: statusText };
        });

        if(status === 200) {
            setReturnedData(newData.result);
            navigate("/applicanthomepage");
        } else {
            setReturnedData(newData.error);
        }
    }

    /**
     * This is needed to always get the newest redux state 
     * rendered when signing up a new person. UseEffect runs both after the first render
     * and after every update.
     * The second parameter is to prevent useEffect to run continuously on every render,
     * it will only run when this component state has changed/differs from redux state.
     */
    useEffect(() => {
        dispatch(setCurrentPerson(person));
    }, [dispatch, person]);

    console.log(reduxPerson); //helper, to see redux state
    return SignUpView({
        setInput: setInput, 
        getData: getData, 
        returnedData: returnedData
    });
}

export default SignUp;