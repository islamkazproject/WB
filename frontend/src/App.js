// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import DoctorPage from "./pages/DoctorPage";
import RegistrationForm from "./pages/RegistrationForm";
import Appointment from "./pages/appointment";
import ProfilePage from "./pages/ProfilePage";
import Registrator from "./pages/Registrator";



function App() {
    const url = "api/v1";
    return (
        <Router>
            <Routes>
                <Route path={`${url}/`} element={<Home />} />
                <Route path={`${url}/login`} element={<LoginPage />} />
                <Route path={`${url}/appointment`} element={<Home />} />
                <Route path={`${url}/doctor`} element={<DoctorPage />} />
                <Route path={`${url}/sing_in`} element={<RegistrationForm />} />
                <Route path={`${url}/service`} element={<Appointment />} />
                <Route path={`${url}/profile`} element={<ProfilePage />} />
                <Route path={`${url}/registration`} element={<Registrator />} />
            </Routes>
        </Router>
    );
}

export default App;