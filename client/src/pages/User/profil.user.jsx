import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
// Components
import Login from '../Login/index.login';
import { UidContext } from '../../utils/context';
import { GET_USER } from '../../action/user.actions';
import { fetchUrl } from '../../config';
// Images
import male_avatar from '../../assets/image/Homme-avatar.svg';
import female_avatar from '../../assets/image/Femme-avatar.svg';
// Style
import { StyledLittleGreyButton } from '../../utils/style/StyledGlobalButton';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledSubLabel,
    StyledLegend,
    StyledInput,
    StyledError
} from '../../utils/style/StyledGlobalForm';
import {
    StyledP,
    AvatarText,
    StyledFilesName,
    StyledAvatarImage,
    StyledBoldContainer,
    AvatarChoiceContainer,
    AvatarRadioContainer,
    AvatarInput,
    CreateButtonContainer,
    StyledContainer,
    StyledSignupSuccessH2,
    StyledProfilControlContainer,
    StyledProfilLinkContainer,
    StyledProfilLink 
} from '../User/style.user';



function Profil() {

    // Get user id(uid) by useContext
    const uid = useContext(UidContext);


    // Redux, get user information
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer);


    // Form data storage
    const [formSubmit, setFormSubmit] = useState(false);
    const [inputPassword, setInputPassword] = useState(null);
    const [controlPassword, setControlPassword] = useState(null);
    const [inputPseudo, setInputPseudo] = useState(userData.pseudo);
    const [inputAvatar, setInputAvatar] = useState('Homme');
    const [errorHandle, setErrorHandle] = useState(false);


    /* Logout link */
    /************* */

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

    /************ */


    // Erase account link
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
        const passwordError = document.querySelector('.password.error');
        const checkPasswordError = document.querySelector('.check-password.error');
        const pseudoError = document.querySelector('.pseudo.error');


        // Reset display errors
        passwordError.innerHTML = '';
        checkPasswordError.innerHTML = '';
        pseudoError.innerHTML = '';
        

        // If no errors, send new user to server        
        if (inputPassword !== controlPassword) {
            setErrorHandle(true);
            checkPasswordError.innerHTML = "Les mots de passe ne correspondent pas.";
        } else if (inputPseudo.length > 15) {
            setErrorHandle(true);
            pseudoError.innerHTML = 'Votre pseudo doit comporter au maximum 15 caractères';
        } else {
            axios({
                method: 'patch',
                url: `${fetchUrl}api/user/`,
                withCredentials: true,
                data: {
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
                        };
                        if (res.data.errors.pseudo) {
                            pseudoError.innerHTML = res.data.errors.pseudo;
                        };
                    };

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
    


    return (
        <>
            {uid ? (
                <>
                    { (formSubmit && errorHandle === false ) && 
                        <StyledSignupSuccessH2>Votre compte a été mis à jour.</StyledSignupSuccessH2> 
                    }
                    <StyledContainer>
                        <FormContainer action="" onSubmit={handleProfil} enctype="multipart/form-data">
                            <StyledH1>Compte</StyledH1>
                            <InputContainer>
                                <StyledBoldContainer>Votre e-mail :</StyledBoldContainer>
                                <StyledP id="email">{userData.email}</StyledP>
                            </InputContainer>
                            <InputContainer>
                                <StyledLabel htmlFor="password">
                                    Nouveau mot de passe ou mot de passe actuel :
                                    <StyledSubLabel>
                                        minimum 8 caractères avec majuscule, minuscule et chiffre 
                                        <br/> (obligatoire pour tout changements)
                                    </StyledSubLabel>
                                </StyledLabel>
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
                                {userData.admin_role === true ? '' : (
                                    <fieldset>
                                        <AvatarText>                                        
                                            <StyledLegend htmlFor="avatar">
                                                Avatar :
                                            </StyledLegend>
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
                                        </AvatarChoiceContainer>  
                                    </fieldset>                            
                                )}                                
                                <CreateButtonContainer>  
                                    <StyledProfilControlContainer>
                                        <StyledProfilLinkContainer>
                                            <StyledProfilLink onClick={logout}>Déconnexion</StyledProfilLink>
                                            { userData.admin_role === true ? ('') : (
                                                <StyledProfilLink 
                                                    className="delete"
                                                    onClick={() => {
                                                        if(window.confirm('Voulez-vous supprimer votre compte ?')) deleteUser();
                                                    }}
                                                >
                                                    Supprimer le compte
                                                </StyledProfilLink>
                                            )}
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
