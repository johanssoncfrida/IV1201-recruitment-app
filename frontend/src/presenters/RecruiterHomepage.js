import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterHomepageView from "../views/RecruiterHomepageView";

/**
 * This is a React function component responsible for the frontend logic
 * when an recruiter is signed in and presenting that user interface.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function RecruiterHomepage() {
    const [result, setResult] = useState("");
    const navigate = useNavigate();

    /**
     * Helper function to verify that JWT is working.
     * This method might change futher on.
     * 
     * @param {Event} e The event from click on button
     */
    const handleClick = (e) => {
        e.preventDefault();

        performAuth().then(res => {
            console.log(res.data);
            console.log(res.status);
            switch(res.status){
                case 200:   
                    setResult(res.data.result);
                    break;
                case 401:   
                    window.alert('Unauthorized. You will be redirected to signin');
                    navigate('/');
                    break;
                default:    
                    setResult(res.data.error);
                    break;
            }
        });
    }

    // credentials: 'include' is a header that should probably 
    // be included later for auth
    const performAuth = async () => {
        let status;
        let statusText;
        return await fetch('/recruiter/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }).then(res => {
            status = res.status;
            statusText = res.statusText;
            return res.json();
        }).then(data => {
            return { status, data };
        }).catch(err => {
            return { status, data: { error: statusText }};
        });
    }
    
    return (
        RecruiterHomepageView({
            handleClick,
            result
        })
    );
}

export default RecruiterHomepage;