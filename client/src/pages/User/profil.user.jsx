import React, { useState, useContext } from 'react';
import Login from '../Login/index.login';
import { UidContext } from '../../utils/context';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture, uploadDefaultAvatar, updateProfil } from '../../action/user.actions';

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


    // Get user id(uid) by useContext
    const uid = useContext(UidContext);
    // Redux upload file
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer);
    // Form data storage
    const [formSubmit, setFormSubmit] = useState(false);
    const [inputEmail, setInputEmail] = useState(userData.email);
    const [inputPassword, setInputPassword] = useState(null);
    const [controlPassword, setControlPassword] = useState(null);
    const [inputPseudo, setInputPseudo] = useState(userData.pseudo);
    const [inputAvatar, setInputAvatar] = useState('Homme');


    // Upload avatar file by Redux
    function uploadFile(file) {        
        const data = new FormData();
        data.append('name', userData._id);
        data.append('userId', userData._id);
        data.append('file', file);
        dispatch(uploadPicture(data, userData._id));    // uploadPicture : Redux function in src/action/user.action.js
    };


    // Upload default avatar by Redux
    function defaultAvatar(inputAvatar) {
        const avatarSlug = `uploads/profil/${inputAvatar}-avatar.svg`;
        dispatch(uploadDefaultAvatar(avatarSlug));
    };


    // When form is submit
    const handleProfil = (e) => {
        e.preventDefault();

        // Link for display errors
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const checkPasswordError = document.querySelector('.check-password.error');
        const pseudoError = document.querySelector('.pseudo.error');
        const avatarError = document.querySelector('.avatar.error');
        // Reset display errors
        emailError.innerHTML = '';
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

            // Update user info
            dispatch(updateProfil(inputEmail, inputPassword, inputPseudo, uid));
            setFormSubmit(true);            
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
                        <FormContainer action="" onSubmit={handleProfil} enctype="multipart/form-data">
                            <StyledH1>Compte</StyledH1>
                            <InputContainer>
                                <StyledLabel htmlFor="email">Votre e-mail :</StyledLabel>                             
                                <StyledInput
                                    type="text"
                                    id="email"
                                    defaultValue={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                                <StyledError className='email error'></StyledError>                              
                            </InputContainer>
                            <InputContainer>
                                <StyledLabel htmlFor="password">Nouveau mot de passe :</StyledLabel>
                                <StyledSubLabel htmlFor="password">
                                    (minimum 8 caractères avec majuscule, minuscule et chiffre)
                                </StyledSubLabel>
                                <StyledInput 
                                    type="password" 
                                    id="password" 
                                    defaultValue={inputPassword}
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
                                    defaultValue={controlPassword}
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
                                    defaultValue={inputPseudo}
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
                                            onChange={(e) => setFile(e.target.files[0])}
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
