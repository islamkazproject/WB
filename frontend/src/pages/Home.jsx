import React from 'react';
import '../styles/Home.css';
import Banner from "../components/banner/Banner";
import Feature from "../components/Feature/Feature";
import Services from "../components/Services/Services";
import Footer from "../components/Footer/Footer";
import Reviews from "../components/Reviews/reviews";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Feature/>
            <Services/>
            <Reviews/>
            <Footer/>
        </div>
    );
}

export default Home;