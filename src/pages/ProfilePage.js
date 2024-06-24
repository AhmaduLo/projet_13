import React from 'react';
import Footer from '../components/Footer';
import Containerprofil from '../components/ContainerProfil';
import HeaderAfterLogin from '../components/HeaderAfterLogin';

const ProfilePage = (props) => {
    return (
        
       <div className="profilPage">
       <HeaderAfterLogin/>
        <Containerprofil/>
        <Footer/>
       </div>
    );
};

export default ProfilePage;