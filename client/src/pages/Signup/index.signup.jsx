import axios from 'axios';
import { useState, useEffect } from 'react';
import { fetchUrl } from '../../config';

// Import images
import male_avatar from '../../assets/image/Homme.svg';
import female_avatar from '../../assets/image/Femme.svg';

// Import style
import { StyledGreyButton } from '../../utils/style/StyledGlobalButton';
import {
    AvatarText,
    StyledFilesName,
    StyledAvatarImage,
    AvatarChoiceContainer,
    AvatarRadioContainer,
    AvatarInput,
    CreateButtonContainer,
    StyledContainer,
} from './style.signup';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledSubLabel,
    StyledInput,
} from '../../utils/style/StyledGlobalForm';



function Signup() {
    // Selection a good radio choice when click on "Downloaded Files" button
    function selectRadio() {
        document.getElementById('download-files').checked = true;
    };

    // Form data storage
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPseudo, setInputPseudo] = useState('');
    const [inputAvatar, setInputAvatar] = useState('Homme.svg');
    const [selectedFile, setSelectedFile] = useState({});
    const [userObject, setUserObject] = useState(null);

    // Object construction
    const user = {
        email: inputEmail,
        password: inputPassword,
        pseudo: inputPseudo,
        avatar_slug: inputAvatar,
    }

    // Create user object
    function submit() {
        const currentFile = document.getElementById('download-files').files[0];
        user.push(JSON.parse(currentFile));
        setSelectedFile(user);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
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
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    console.log('reponse : ', res)
                    window.location = '/';
                }
            })
            .catch(err => console.log('fetch login error', err))
        ;
    };

    // Form generation
    return (
        <StyledContainer>
            <FormContainer action="" onSubmit={handleSignup} id={"login-form"}>
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
            </InputContainer>
            <InputContainer>
                <StyledLabel htmlFor="password">
                    Choisissez un mot de passe :
                </StyledLabel>
                <StyledSubLabel htmlFor="password">
                    (minimum 8 caractères avec majuscule, minuscule et chiffre)
                </StyledSubLabel>
                <StyledInput type="password" id="password" />
            </InputContainer>
            <InputContainer>
                <StyledLabel htmlFor="confirm-password">
                    Confirmez votre mot de passe :
                </StyledLabel>
                <StyledInput
                    type="password"
                    id="confirm-password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                />
            </InputContainer>
            <InputContainer>
                <StyledLabel htmlFor="pseudo">
                    Choisissez un pseudo :
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="pseudo"
                    value={inputPseudo}
                    onChange={(e) => setInputPseudo(e.target.value)}
                />
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
                            // onChange={setSelectedFile(files[0])}
                            onClick={ () => {
                                setInputAvatar('Image utilisateur');
                                selectRadio();
                            }}
                        />
                        </label>
                    </AvatarRadioContainer>
                </AvatarChoiceContainer>
                <CreateButtonContainer>
                    <StyledGreyButton type="submit">Création du compte</StyledGreyButton>
                </CreateButtonContainer>
            </InputContainer>
        </FormContainer>
        </StyledContainer>
        
    );
}

export default Signup;
