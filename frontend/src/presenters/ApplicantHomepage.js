import ApplicantHomepageView from "../views/ApplicantHomepageView";
import { useState} from 'react';

/**
 * This is a React function component responsible for the frontend logic
 * when an applicant is signed in and presenting that user interface.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function ApplicantHomepage() {
    const [result, setResult] = useState("");

    const handleClick = (e) => {
        e.preventDefault();

        performAuth().then(res => {
            console.log(res.data);
            console.log(res.status);
            if(res.status === 200) {
                setResult(res.data.result);
            } else {
                setResult(res.data.error);
            }
        });
    }

    // credentials: 'include' is a header that should probably 
    // be included later for auth
    const performAuth = async () => {
        let status;
        let statusText;
        return await fetch('/applicant/apply', {
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
        ApplicantHomepageView({
            handleClick, 
            result
        })
    );
}

export default ApplicantHomepage;