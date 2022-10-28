import { useState } from 'react';
import axios from 'axios';
import { fetchUrl } from '../../config';
import Login from '../Login/index.login';
// Images
import male_avatar from '../../assets/image/Homme-avatar.svg';
import female_avatar from '../../assets/image/Femme-avatar.svg';
// Style
import { StyledGreyButton } from '../../utils/style/StyledGlobalButton';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledSubLabel,
    StyledLegend,
    StyledInput,
    StyledFieldset,
    StyledError,
    StyledTermsContainer,
    StyledTermsLabel
} from '../../utils/style/StyledGlobalForm';
import {
    AvatarText,
    StyledFilesName,
    StyledAvatarImage,
    AvatarChoiceContainer,
    AvatarRadioContainer,
    AvatarInput,
    CreateButtonContainer,
    StyledContainer,
    StyledSignupSuccessH2
} from './style.user';



function Signup() {

    // Form data storage
    const [formSubmit, setFormSubmit] = useState(false);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const [inputPseudo, setInputPseudo] = useState('');
    const [inputAvatar, setInputAvatar] = useState('Homme');


    // When form is submit
    const handleSignup = (e) => {
        e.preventDefault();

        // Link for display errors
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const checkPasswordError = document.querySelector('.check-password.error');
        const pseudoError = document.querySelector('.pseudo.error');
        const termsError = document.querySelector('.terms.error');


        // Reset display errors
        emailError.innerText = '';
        passwordError.innerText = '';
        checkPasswordError.innerText = '';
        pseudoError.innerText = '';
        termsError.innerText = '';
        

        // If no errors, send new user to server
        const terms = document.getElementById('terms');

        if (inputPassword !== controlPassword || !terms.checked) {
            if (inputPassword !== controlPassword) {
                checkPasswordError.innerHTML = "Les mots de passe ne correspondent pas.";
            }
            if (!terms.checked) {
                termsError.innerHTML = "Vous avez besoin de lire et de valider<br>les conditions générales pour utiliser ce service.";
            }
        } else {
            axios({
                method: 'post',
                url: `${fetchUrl}api/user/signup`,
                withCredentials: true,
                data: {
                    email: inputEmail,
                    password: inputPassword,
                    pseudo: inputPseudo,
                    avatar_slug: `${fetchUrl}uploads/profil/${inputAvatar}-avatar.svg`,
                }
            })
                .then((res) => {
                    // Sgnup errors 
                    if (res.data.errors) {
                        if (res.data.message === 'Password not accepted') {                   
                            passwordError.innerText = res.data.errors;
                        }
                        if (res.data.errors.email) {
                            emailError.innerText = res.data.errors.email;
                        }
                        if (res.data.errors.pseudo) {
                            pseudoError.innerText = res.data.errors.pseudo;
                        }
                    } else {
                        setFormSubmit(true);
                    }              
                })
                .catch(err => {
                    console.log('Create user failed. ' + err);
                })
            ;
        }      
    };


 
    return (
        <>
            {formSubmit ? (
                <>
                    <Login />
                    <StyledSignupSuccessH2>Enregistrement réussi, veuillez-vous connecter.</StyledSignupSuccessH2>
                </>
            ) : (
                <StyledContainer>
                    <FormContainer action="" onSubmit={handleSignup} name="signup">
                        <StyledH1>Créer votre compte</StyledH1>
                        <InputContainer>
                            <StyledLabel htmlFor="email">
                                Quel est votre e-mail ?
                            </StyledLabel>
                            <StyledInput
                                type="text"
                                id="email"
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            <StyledError className='email error'></StyledError>
                        </InputContainer>
                        <InputContainer>
                            <StyledLabel htmlFor="password">
                                Choisissez un mot de passe :
                            </StyledLabel>
                            <StyledSubLabel htmlFor="password">
                                (minimum 8 caractères avec majuscule, minuscule et chiffre)
                            </StyledSubLabel>
                            <StyledInput 
                                type="password" 
                                id="password" 
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                            /> 
                            <StyledError className='password error'></StyledError>
                        </InputContainer>
                        <InputContainer>
                            <StyledLabel htmlFor="confirm-password">
                                Confirmez votre mot de passe :
                            </StyledLabel>
                            <StyledInput
                                type="password"
                                id="confirm-password"
                                value={controlPassword}
                                onChange={(e) => setControlPassword(e.target.value)}
                            />
                            <StyledError className='check-password error'></StyledError>
                        </InputContainer>
                        <InputContainer>
                            <StyledLabel htmlFor="pseudo">
                                Choisissez un pseudo :
                            </StyledLabel>
                            <StyledSubLabel htmlFor="pseudo">
                                (maximum 15 caractères)
                            </StyledSubLabel>
                            <StyledInput
                                type="text"
                                id="pseudo"
                                value={inputPseudo}
                                onChange={(e) => setInputPseudo(e.target.value)}
                            />
                            <StyledError className='pseudo error'></StyledError>
                        </InputContainer>
                        <InputContainer>
                            <StyledFieldset>
                                <AvatarText>
                                    <StyledLegend htmlFor="avatar">
                                        Choisissez votre avatar :
                                    </StyledLegend>
                                    <StyledFilesName id='avatar'>{inputAvatar}</StyledFilesName>
                                </AvatarText>
                                <AvatarChoiceContainer id="file">
                                    <AvatarRadioContainer>
                                        <AvatarInput
                                            type="radio"
                                            id="avatar-male"
                                            name="file"
                                            defaultChecked={true}
                                            onClick={() => setInputAvatar('Homme')}
                                        />
                                        <label htmlFor="avatar-male">
                                            <StyledAvatarImage
                                                src={male_avatar}
                                                alt="avatar homme"
                                            />
                                        </label>
                                    </AvatarRadioContainer>
                                    <AvatarRadioContainer>
                                        <AvatarInput
                                            type="radio"
                                            id="avatar-female"
                                            name="file"
                                            onClick={() => setInputAvatar('Femme')}
                                        />
                                        <label htmlFor="avatar-female">
                                            <StyledAvatarImage
                                                src={female_avatar}
                                                alt="avatar femme"
                                            />
                                        </label>
                                    </AvatarRadioContainer>
                                </AvatarChoiceContainer>
                            </StyledFieldset>
                            <CreateButtonContainer> 
                                <StyledTermsContainer>
                                    <input type="checkbox" id="terms" />
                                    <StyledTermsLabel htmlFor="terms">
                                        J'accepte les
                                            <a href="/terms" target="_blank" rel="noopener noreferrer">
                                                {' '}conditions générales
                                            </a>
                                    </StyledTermsLabel>
                                    <StyledError className='terms error'></StyledError>
                                </StyledTermsContainer>                    
                                <StyledGreyButton type="submit">Création du compte</StyledGreyButton>
                            </CreateButtonContainer>
                        </InputContainer>
                    </FormContainer>
                </StyledContainer>
            )}
        </>     
    );
};

export default Signup;
