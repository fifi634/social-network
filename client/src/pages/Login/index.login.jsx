import React, { useState, useContext } from 'react';
import axios from 'axios';
import { fetchUrl } from '../../config';
import { UidContext } from '../../utils/context';
import Home from '../Home/index.home';

// Import Style
import { StyledGreyButton } from '../../utils/style/StyledGlobalButton';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledInput,
} from '../../utils/style/StyledGlobalForm';

function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const uid = useContext(UidContext);


    // When form is submit
    const handleLogin = async (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: `${fetchUrl}api/user/login`,
            withCredentials: true,
            data: {
                email: email,
                password: password,
            }
        })
            .then((res) => {
                console.log(res.data.message);
                window.location = '/home';
            })
            .catch((err) => {
                console.log('fetch login error. ' + err);
                alert('La connection à échoué. Avez-vous entré le bon email et/ou le bon mot de passe ?');
            })
        ;
    };

    return (
        <>
        { uid ? (
            <Home />
        ) : (
            <FormContainer action="" onSubmit={handleLogin}>
                <StyledH1>Connectez-vous !</StyledH1>
                <InputContainer>
                    <StyledLabel htmlFor="email">Entrez votre email :</StyledLabel>
                    <StyledInput type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </InputContainer>
                <InputContainer>
                    <StyledLabel htmlFor="password">Entrez votre mot de passe :</StyledLabel>
                    <StyledInput type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </InputContainer>
                <StyledGreyButton type="submit">Connexion</StyledGreyButton>
            </FormContainer>
        )}
        </>
    );
};

export default LoginForm;