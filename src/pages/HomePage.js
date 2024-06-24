import React from 'react';
import Header from "../components/Header"
import Footer from '../components/Footer';
import Containtaccueil from '../components/ContaintAccueil';

const HomePage = (props) => {
    return (
       <div className='HomePage'>
        <Header/>
        <Containtaccueil/>
        <Footer/>
       </div>
    );
};

export default HomePage;