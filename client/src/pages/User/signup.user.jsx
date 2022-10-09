import React, { useState } from 'react';
import axios from 'axios';
import { fetchUrl } from '../../config';
import Login from '../Login/index.login';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDefaultAvatar, uploadPicture } from '../../action/user.actions';

// Import images
import male_avatar from '../../assets/image/Homme-avatar.svg';
import female_avatar from '../../assets/image/Femme-avatar.svg';

// Import style
import { StyledGreyButton } from '../../utils/style/StyledGlobalButton';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledSubLabel,
    StyledInput,
    StyledError,
    StyledTermsContainer,
    StyledInputFile
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
    // Selection a good radio choice when click on "Downloaded Files" button
    function selectRadio() {
        document.getElementById('download-files').checked = true;
    };


    // Form data storage
    const [formSubmit, setFormSubmit] = useState(false);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const [inputPseudo, setInputPseudo] = useState('');
    const [inputAvatar, setInputAvatar] = useState('Homme');
    // Redux upload file
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer);


    // When form is submit
    const handleSignup = async (e) => {
        e.preventDefault();

        // Upload file by Redux
        if (file !== null) {
            const data = new FormData();
            data.append('name', userData._id);
            data.append('userId', userData._id);
            data.append('file', file);
            dispatch(uploadPicture(data, userData._id));    // uploadPicture : Redux function in src/action/user.action.js
        } else {
            const avatarSlug = `uploads/profil/${inputAvatar}-avatar.svg`;
            dispatch(uploadDefaultAvatar(avatarSlug));
        };


        // Link for display errors
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const checkPasswordError = document.querySelector('.check-password.error');
        const pseudoError = document.querySelector('.pseudo.error');
        const avatarError = document.querySelector('.avatar.error');
        const termsError = document.querySelector('.terms.error');


        // Reset display errors
        emailError.innerHTML = '';
        passwordError.innerHTML = '';
        checkPasswordError.innerHTML = '';
        pseudoError.innerHTML = '';
        avatarError.innerHTML = '';
        termsError.innerHTML = '';
        

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
            // Fetch 
            axios({
                method: 'post',
                url: `${fetchUrl}api/user/signup`,
                withCredentials: true,
                data: {
                    email: inputEmail,
                    password: inputPassword,
                    pseudo: inputPseudo,
                }
            })
                .then((res) => {
                    // Sgnup errors 
                    if (res.data.errors) {
                        if (res.data.message === 'Password not accepted') {                   
                            passwordError.innerHTML = res.data.errors;
                            // avatarError.innerHTML = res.data.error.avatar;
                        }
                        if (res.data.errors.email) {
                            emailError.innerHTML = res.data.errors.email;
                        }
                        if (res.data.errors.pseudo) {
                            pseudoError.innerHTML = res.data.errors.pseudo;
                        }
                    } else {
                        setFormSubmit(true);
                    }              
                })
                .catch(err => {
                    console.log('fetch login error', err);
                })
            ;
        }      
    };


    // Form generation
    return (
        <>
            {formSubmit ? (
                <>
                    <Login />
                    <StyledSignupSuccessH2>Enregistrement réussi, veuillez-vous connecter.</StyledSignupSuccessH2>
                </>
            ) : (
                <StyledContainer>
                    <FormContainer action="" onSubmit={handleSignup}>
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
                            <StyledSubLabel htmlFor="password">
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
                            <AvatarText>
                                <StyledLabel htmlFor="avatar">
                                    Choisissez votre avatar :
                                </StyledLabel>
                                <StyledFilesName>{inputAvatar}</StyledFilesName>
                            </AvatarText>
                            <AvatarChoiceContainer id="avatar">
                                <AvatarRadioContainer>
                                    <AvatarInput
                                        type="radio"
                                        id="avatar-male"
                                        name="avatar"
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
                                        name="avatar"
                                        onClick={() => setInputAvatar('Femme')}
                                    />
                                    <label htmlFor="avatar-female">
                                        <StyledAvatarImage
                                            src={female_avatar}
                                            alt="avatar femme"
                                        />
                                    </label>
                                </AvatarRadioContainer>
                                <AvatarRadioContainer>
                                    <AvatarInput
                                        type="radio"
                                        id="download-files"
                                        name="file"
                                        value={inputAvatar}
                                    />
                                    <label htmlFor="download-files">
                                        <StyledInputFile
                                            type="file"
                                            name="file"
                                            accept=".jpg, .jpeg, .png, .webp"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            onClick={ () => {
                                                setInputAvatar('Image utilisateur');
                                                selectRadio();
                                            }}
                                        />
                                    </label>
                                    <StyledError className='avatar error'></StyledError>
                                </AvatarRadioContainer>
                            </AvatarChoiceContainer>
                            <CreateButtonContainer> 
                                <StyledTermsContainer>
                                    <input type="checkbox" id="terms" />
                                    <StyledSubLabel htmlFor="terms">
                                        J'accepte les
                                            <a href="/terms" target="_blank" rel="noopener noreferrer">
                                                {' '}conditions générales
                                            </a>
                                    </StyledSubLabel>
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
};;

export default Signup;
