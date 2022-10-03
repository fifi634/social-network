import React, { useEffect, useState } from 'react';


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
    const [isDataLoading, setDataLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();


    };

    return (
        <FormContainer action="" onSubmit={handleLogin} id={"sign-up-FormContainer"}>
            <StyledH1>Connectez-vous !</StyledH1>
            <InputContainer>
                <StyledLabel htmlFor="email">Inscrivez votre email :</StyledLabel>
                <StyledInput type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <StyledError>
                    erreur
                </StyledError>
            </InputContainer>
            <InputContainer>
                <StyledLabel htmlFor="password">Entrez votre mot de passe :</StyledLabel>
                <StyledInput type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <StyledError>
                    erreur
                </StyledError>
            </InputContainer>
            <StyledGreyButton type="submit">Connexion</StyledGreyButton>
        </FormContainer>
    );
}

export default LoginForm;