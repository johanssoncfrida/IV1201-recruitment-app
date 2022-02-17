import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import SignUp from './presenters/SignUp';
import SignIn from './presenters/SignIn';
import ApplicantHomepage from './presenters/ApplicantHomepage';
import RecruiterHomepage from './presenters/RecruiterHomepage';

function App() {

    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="applicanthomepage" element={<ApplicantHomepage />} />
            <Route path="recruiterhomepage" element={<RecruiterHomepage />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    ); 
}

export default App;