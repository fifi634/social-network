import React, { useState, useContext } from 'react';
import axios from 'axios';
import { fetchUrl } from '../../config';
import Login from '../Login/index.login';
import { UidContext } from '../../utils/context';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture, uploadDefaultAvatar } from '../../action/user.actions';

// Import images
import male_avatar from '../../assets/image/Homme-avatar.svg';
import female_avatar from '../../assets/image/Femme-avatar.svg';

// Import style
import { StyledLittleGreyButton } from '../../utils/style/StyledGlobalButton';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledSubLabel,
    StyledInput,
    StyledError,
    StyledInputFile
} from '../../utils/style/StyledGlobalForm';
import {
    StyledEmailDisplay,
    StyledEmailTitle,
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




function Profil() {
    // Selection a good radio choice when click on "Downloaded Files" button
    function selectRadio() {
        document.getElementById('download-files').checked = true;
    };


    // Form data storage
    const [formSubmit, setFormSubmit] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    const [inputPseudo, setInputPseudo] = useState('');
    const [inputAvatar, setInputAvatar] = useState('Homme');
    // Get user id(uid) by useContext
    const uid = useContext(UidContext);
    // Redux upload file
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer);


    // Upload avatar file by Redux
    async function uploadFile(file) {        
        const data = new FormData();
        data.append('name', userData._id);
        data.append('userId', userData._id);
        data.append('file', file);
        await dispatch(uploadPicture(data, userData._id));    // uploadPicture : Redux function in src/action/user.action.js
    };


    // Upload default avatar by Redux
    function defaultAvatar(inputAvatar) {
        const avatarSlug = `uploads/profil/${inputAvatar}-avatar.svg`;
        dispatch(uploadDefaultAvatar(avatarSlug, userData._id));
    };


    // When form is submit
    const handleProfil = async (e) => {
        e.preventDefault();

        // Link for display errors
        const passwordError = document.querySelector('.password.error');
        const checkPasswordError = document.querySelector('.check-password.error');
        const pseudoError = document.querySelector('.pseudo.error');
        const avatarError = document.querySelector('.avatar.error');
        // Reset display errors
        passwordError.innerHTML = '';
        checkPasswordError.innerHTML = '';
        pseudoError.innerHTML = '';
        avatarError.innerHTML = '';
        

        // If no errors, send new user to server
        if (inputPassword !== controlPassword) {
            checkPasswordError.innerHTML = "Les mots de passe ne correspondent pas.";
        } else {

            // If picture file is in upload, send it to server by Redux
            if (file !== null) uploadFile(file);

            // If no picture file in upload, send default avatar to server by Redux
            if (file === null) defaultAvatar(inputAvatar);

            //Fetch 
            axios({
                method: 'patch',
                url: `${fetchUrl}api/user/${uid}`,
                withCredentials: true,
                data: {
                    password: inputPassword,
                    pseudo: inputPseudo,
                    // avatar_slug: userData.avatar_slug,
                }
            })
                .then((res) => {                    
                    // Sgnup errors 
                    if (res.data.errors) {
                        if (res.data.message === 'Password not accepted') {                   
                            passwordError.innerHTML = res.data.errors;
                        }
                        // avatarError.innerHTML = res.data.error.avatar;
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
                    <FormContainer action="" onSubmit={handleProfil}>
                        <StyledH1>Compte</StyledH1>
                        <InputContainer>
                            <StyledEmailTitle htmlFor="email">Votre e-mail :</StyledEmailTitle>
                            <StyledEmailDisplay>{userData.email}</StyledEmailDisplay>                                
                        </InputContainer>
                        <InputContainer>
                            <StyledLabel htmlFor="password">Nouveau mot de passe :</StyledLabel>
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
                                value={inputPseudo}
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
                                <AvatarRadioContainer>
                                    <AvatarInput
                                        type="radio"
                                        id="download-files"
                                        name="file"
                                        value={inputAvatar}
                                    />
                                    <label htmlFor="files">
                                    <StyledInputFile
                                        type="file"
                                        name="file"
                                        accept=".jpg, .jpeg, .png, .webp"
                                        onChange={(e) => {
                                            // uploadFile(e.target.files[0]);
                                            setFile(e.target.files[0]);
                                        }}
                                        onClick={() => {
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
