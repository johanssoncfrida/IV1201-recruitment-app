import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SignInView from '../views/SignInView';

/**
 * This is a React function component responsible for the frontend logic of
 * signing in and presenting the user interface to enter credentials.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function SignIn() {

    const [credentials, setCredentials] = useState({username: '', password: ''});
    // Result could be an error message to show if and why the sign in failed
    const [result, setResult] = useState("");

    const handleChange = (e) => {
        setCredentials(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value, 
        }));
    }

    // Used to redirect to another page
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate("/signup");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        performSignIn().then(res => {
            console.log(res.data);
            console.log(res.status);
            if(res.status === 200) {
                setResult(res.data.result);
                if(res.data.role === 'recruiter') {
                    navigate("/recruiterhomepage");
                } else {
                    navigate("/applicanthomepage");
                }
            } else {
                setResult(res.data.error);
            }
        });
    }

    // credentials: 'include' is a header that should probably 
    // be included later for auth
    const performSignIn = async () => {
        let status;
        let statusText;
        return await fetch('/signin/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res => {
            statusText = res.statusText;
            status = res.status;
            return res.json();
        }).then(data => {
            return { status, data };
        }).catch(err => {
            return { status, data: { error: statusText }};
        });
    }

    return SignInView({
        handleSubmit, 
        handleChange, 
        result, 
        goToSignUp 
    });
}

export default SignIn;