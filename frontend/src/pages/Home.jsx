import React from 'react';
import '../styles/Home.css';
import '../styles/common.css';
import Banner from "../components/banner/Banner";
import Feature from "../components/Feature/Feature";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Feature/>
        </div>
    );
}

export default Home;