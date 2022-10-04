import React, { useState } from 'react';
import axios from 'axios';
import { fetchUrl } from '../../config';


// Import Style
import { StyledGreyButton } from '../../utils/style/StyledGlobalButton';
import { StyledError } from '../../utils/style/StyledGlobalError'; 
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


    // When form is submit
    const handleLogin = (e) => {
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
                window.location = '/';
            })
            .catch((err) => {
                console.log('fetch login error', err);
                alert('La connection à échoué');
            })
        ;
    };

    return (
        <FormContainer action="" onSubmit={handleLogin} id={"signup-form"}>
            <StyledH1>Connectez-vous !</StyledH1>
            <InputContainer>
                <StyledLabel htmlFor="email">Inscrivez votre email :</StyledLabel>
                <StyledInput type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </InputContainer>
            <InputContainer>
                <StyledLabel htmlFor="password">Entrez votre mot de passe :</StyledLabel>
                <StyledInput type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </InputContainer>
            <StyledGreyButton type="submit">Connexion</StyledGreyButton>
        </FormContainer>
    );
}

export default LoginForm;