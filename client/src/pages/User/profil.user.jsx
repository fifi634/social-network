import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
// Components
import Login from '../Login/index.login';
import { UidContext } from '../../utils/context';
// import { deleteUser } from '../../action/users.action';
import { uploadPicture, uploadDefaultAvatar, updateProfil, GET_USER } from '../../action/user.actions';
import { DELETE_USER } from '../../action/users.action';
import { fetchUrl } from '../../config';
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
    // StyledInputFile
} from '../../utils/style/StyledGlobalForm';
import {
    StyledP,
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
    // // Selection a good radio choice when click on "Downloaded Files" button
    // function selectRadio() {
    //     document.getElementById('download-files').checked = true;
    // };


    // Get user id(uid) by useContext
    const uid = useContext(UidContext);
    // Redux upload file
    // const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer);
    // const error = useSelector((state) => state.errorReducer.updateUserErrors);
    // Form data storage
    const [formSubmit, setFormSubmit] = useState(false);
    // const [inputEmail, setInputEmail] = useState(userData.email);
    const [inputPassword, setInputPassword] = useState(null);
    const [controlPassword, setControlPassword] = useState(null);
    const [inputPseudo, setInputPseudo] = useState(userData.pseudo);
    const [inputAvatar, setInputAvatar] = useState('Homme');
    const [errorHandle, setErrorHandle] = useState(false);


    // // Upload avatar file by Redux
    // function uploadFile(file) {        
    //     const data = new FormData();
    //     data.append('name', userData._id);
    //     data.append('userId', userData._id);
    //     data.append('file', file);
    //     dispatch(uploadPicture(data, userData._id));    // uploadPicture : Redux function in src/action/user.action.js
    //     console.log(data, userData._id);
    // };


    // // Upload default avatar by Redux
    // function defaultAvatar(inputAvatar) {
    //     const avatarSlug = `uploads/profil/${inputAvatar}-avatar.svg`;
    //     dispatch(uploadDefaultAvatar(avatarSlug));
    // };



    const removeCookie = (key) => {
        if(window !== "underfined") cookie.remove(key, {expire: 1})
        console.log(window);
    };


    const logout = async() => {
        await axios.get(fetchUrl + 'api/user/logout', {withCredentials: true})
            .then(() => removeCookie('jwt'))
            .catch(err => console.log('Axios logout failed. ' + err))
        ;
        window.location = '/';
    };


    const deleteUser = async() => {
        await axios.delete(fetchUrl + 'api/user/', {withCredentials: true})
            .then(() => logout())
            .catch((err) => console.log('Axios delete user failed. ' + err))
        ;
        window.location = '/';
    };


    // When form is submit
    const handleProfil = (e) => {
        e.preventDefault();
        setErrorHandle(false);

        // Link for display errors
        // const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const checkPasswordError = document.querySelector('.check-password.error');
        const pseudoError = document.querySelector('.pseudo.error');
        // const avatarError = document.querySelector('.avatar.error');

        // Reset display errors
        // emailError.innerHTML = '';
        passwordError.innerHTML = '';
        checkPasswordError.innerHTML = '';
        pseudoError.innerHTML = '';
        // avatarError.innerHTML = '';
        

        // If no errors, send new user to server        
        if (inputPassword !== controlPassword) {
            setErrorHandle(true);
            checkPasswordError.innerHTML = "Les mots de passe ne correspondent pas.";
        } else if (inputPseudo.length > 15) {
            setErrorHandle(true);
            pseudoError.innerHTML = 'Votre pseudo doit comporter au maximum 15 caractères';
        } else {
            // // If picture file is in upload, send it to server by Redux
            // if (file !== null) uploadFile(file);

            // // If no picture file in upload, send default avatar to server by Redux
            // if (file === null) defaultAvatar(inputAvatar);
            
            // Update user info
            // const avatarSlug = `uploads/profil/${inputAvatar}-avatar.svg`;
            // dispatch(updateProfil(inputEmail, inputPassword, inputPseudo, avatarSlug, uid));

            // Update user info on database
            axios({
                method: 'patch',
                url: `${fetchUrl}api/user/`,
                withCredentials: true,
                data: {
                    // email: inputEmail,
                    password: inputPassword,
                    pseudo: inputPseudo,
                    avatar_slug: `uploads/profil/${inputAvatar}-avatar.svg`
                }
            })
                .then((res) => {
                    // Update profil errors 
                    if (res.data.errors || res.data.err) {
                        setErrorHandle(true);
                        if (res.data.message === 'Password not accepted') {                   
                            passwordError.innerHTML = res.data.errors;
                            // avatarError.innerHTML = res.data.error.avatar;
                        }
                        if (res.data.errors.pseudo) {
                            pseudoError.innerHTML = res.data.errors.pseudo;
                        }
                    }
                    // Get new user for display modification
                    axios
                        .get(`${fetchUrl}api/user/${uid}`, {withCredentials: true})
                        .then((res) => {
                            dispatch({ type: GET_USER, payload: res.data });
                        })
                        .catch((err) => console.log('Get user failed. ' + err))
                    ;
                })
                .catch(err => {
                    setErrorHandle(true);
                    console.log("err ", err.code)
                    console.log('Update user info failed. ' + err);
                })
            ;
            setFormSubmit(true);   
        };   
    };
    


    // Form generation
    return (
        <>
            {uid ? (
                <>
                    { (formSubmit && errorHandle === false ) && <StyledSignupSuccessH2>Votre compte a été mis à jour.</StyledSignupSuccessH2> }
                    <StyledContainer>
                        <FormContainer action="" onSubmit={handleProfil} enctype="multipart/form-data">
                            <StyledH1>Compte</StyledH1>
                            <InputContainer>
                                <StyledLabel htmlFor="email">Votre e-mail :</StyledLabel>
                                <StyledP id="email">{userData.email}</StyledP>
                                {/* <StyledInput
                                    type="email"
                                    id="email"
                                    defaultValue={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                                <StyledError className='email error'></StyledError>                               */}
                            </InputContainer>
                            <InputContainer>
                                <StyledLabel htmlFor="password">
                                    Nouveau mot de passe ou mot de passe actuel :
                                </StyledLabel>
                                <StyledSubLabel htmlFor="password">
                                    minimum 8 caractères avec majuscule, minuscule et chiffre 
                                    <br/> (obligatoire pour tout changements)
                                </StyledSubLabel>
                                <StyledInput 
                                    type="password" 
                                    id="password" 
                                    defaultValue={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                /> 
                                <StyledError className='password error'>
                                    {/* {!isEmpty(error) && error} */}
                                </StyledError>
                                
                            </InputContainer>
                            <InputContainer>
                                <StyledLabel htmlFor="confirm-password">
                                    Confirmez le mot de passe saisie :
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
                                    maximum 15 caractères
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
                                    {/* <AvatarRadioContainer>
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
                                    </AvatarRadioContainer> */}
                                </AvatarChoiceContainer>
                                <CreateButtonContainer>  
                                    <StyledProfilControlContainer>
                                        <StyledProfilLinkContainer>
                                            <StyledDisconnectLink onClick={logout}>Déconnexion</StyledDisconnectLink>
                                            <StyledDeleteLink 
                                                onClick={() => {
                                                    if(window.confirm('Voulez-vous supprimer votre compte ?')) deleteUser();
                                                }}
                                            >
                                                Supprimer le compte
                                            </StyledDeleteLink>
                                        </StyledProfilLinkContainer>
                                        <StyledLittleGreyButton type="submit">Modifier</StyledLittleGreyButton>
                                    </StyledProfilControlContainer>        
                                </CreateButtonContainer>
                            </InputContainer>
                        </FormContainer>
                    </StyledContainer>
                </>
            ) : (
                <Login />
            )}
        </>     
    );
};

export default Profil;
