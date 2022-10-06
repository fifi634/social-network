import React, { useContext } from 'react';
import Signup from '../User/OLD index.signup';
import { UidContext } from '../../utils/context';


const Profil = () => {
    const uid = useContext(UidContext);   
 
    return (
        <div>
            {uid ? (
                <h1>COMPTE</h1>
            ) : (
                <div>
                    <Signup />
                </div>
            )}
        </div>
    );
}

export default Profil;