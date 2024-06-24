import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Containerprofil from '../components/ContainerProfil';

const ProfilePage = (props) => {
    return (
        
       <div className="profilPage">
        <Header/>
        <Containerprofil/>
        <Footer/>
       </div>
    );
};

export default ProfilePage;