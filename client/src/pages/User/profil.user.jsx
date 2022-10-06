import React, { useState, useContext } from 'react';
import axios from 'axios';
import { fetchUrl } from '../../config';
import Login from '../Login/index.login';
import { useSelector } from 'react-redux';
import { UidContext } from '../../utils/context';

// Import images
import male_avatar from '../../assets/image/Homme.svg';
import female_avatar from '../../assets/image/Femme.svg';

// Import style
import { StyledLittleGreyButton } from '../../utils/style/StyledGlobalButton';
import {
    AvatarText,
    StyledFilesName,
    StyledAvatarImage,
    AvatarChoiceContainer,
    AvatarRadioContainer,
    AvatarInput,
    CreateButtonContainer,
    StyledContainer,
    StyledSignupSuccessH2,
    StyledProfilControlContainer,
    StyledProfilLinkContainer,
    StyledDisconnectLink,
    StyledDeleteLink 
} from '../User/style.user';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledSubLabel,
    StyledInput,
    StyledError
} from '../../utils/style/StyledGlobalForm';



function Profil() {
    const uid = useContext(UidContext);
    const userData = useSelector(state => state.userReducer);

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
    const [inputAvatar, setInputAvatar] = useState('Homme.svg');

    // Get avatar file
    const handleAvatar = (e) => {
         setInputAvatar(URL.createObjectURL(e.target.files[0]))
    };
    

    // When form is submit
    const handleSignup = async (e) => {
        e.preventDefault();

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
        

        // If no errors, send new user to server
        const terms = document.getElementById('terms');

        if (inputPassword !== controlPassword) {
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
                    avatar_slug: inputAvatar,
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
            {uid ? (
                formSubmit ? (
                    <>
                        <Login />
                        <StyledSignupSuccessH2>Votre compte a été mis à jour, veuillez vous reconnecter.</StyledSignupSuccessH2>
                    </>
                ) : (
                    <StyledContainer>
                        <FormContainer action="" onSubmit={handleSignup}>
                            <StyledH1>Compte</StyledH1>
                            <InputContainer>
                                <StyledLabel htmlFor="email">
                                    E-mail
                                </StyledLabel>
                                <StyledInput
                                    type="text"
                                    id="email"
                                    value={userData.email}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                                <StyledError className='email error'></StyledError>
                            </InputContainer>
                            <InputContainer>
                                <StyledLabel htmlFor="password">
                                    Nouveau mot de passe :
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
                                    Confirmez votre nouveau mot de passe :
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
                                    Pseudo :
                                </StyledLabel>
                                <StyledSubLabel htmlFor="password">
                                    (maximum 15 caractères)
                                </StyledSubLabel>
                                <StyledInput
                                    type="text"
                                    id="pseudo"
                                    value={userData.pseudo}
                                    onChange={(e) => setInputPseudo(e.target.value)}
                                />
                                <StyledError className='pseudo error'></StyledError>
                            </InputContainer>
                            <InputContainer>
                                <AvatarText>
                                    <StyledLabel htmlFor="avatar">
                                        Avatar :
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
                                            onClick={() => setInputAvatar('Homme.svg')}
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
                                            onClick={() => setInputAvatar('Femme.svg')}
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
                                            name="avatar"
                                            value={inputAvatar}
                                        />
                                        <label htmlFor="download-files">
                                        <input
                                            type="file"
                                            id="download-files"
                                            name="avatar"
                                            accept=".jpg, .jpeg, .png, .webp"
                                            onChange={(e) => handleAvatar(e)}
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
                                <StyledProfilControlContainer>
                                    <StyledProfilLinkContainer>
                                        <StyledDisconnectLink href="/login">Déconnexion</StyledDisconnectLink>
                                        <StyledDeleteLink href='/delete-compte'>Supprimer le compte</StyledDeleteLink>
                                    </StyledProfilLinkContainer>
                                    <StyledLittleGreyButton type="submit">Modifier</StyledLittleGreyButton>
                                </StyledProfilControlContainer>        
                                </CreateButtonContainer>
                            </InputContainer>
                        </FormContainer>
                    </StyledContainer>
                )
            ) : (
                <Login />
            )}
        </>     
    );
};

export default Profil;
