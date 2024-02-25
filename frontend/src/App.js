// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import DoctorPage from "./pages/DoctorPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/appointment" element={<Home />} />
                <Route path="/doctor" element={<DoctorPage />} />
            </Routes>
        </Router>
    );
}

export default App;