import { useState } from 'react';
import { useFetch } from '../../utils/hooks';

// Import images
import male_avatar from '../../assets/image/male_avatar.svg';
import female_avatar from '../../assets/image/female_avatar.svg';

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
} from './style';
import {
    FormContainer,
    InputContainer,
    StyledLabel,
    StyledH1,
    StyledSubLabel,
    TextInput,
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
    const [inputAvatar, setInputAvatar] = useState('male_avatar.svg');
    const [selectedFile, setSelectedFile] = useState({});
    const [userObject, setUserObject] = useState(null);

    // Object construction
    const user = {
        email: inputEmail,
        password: inputPassword,
        pseudo: inputPseudo,
        avatar: inputAvatar,
    }

 
    function submit() {
        // Create user object
        const currentFile = document.getElementById('download-files').files[0];
        user.push(JSON.parse(currentFile));
        setSelectedFile(user);

        // Send user oject to server
        // useEffect(() => {
        //     useFetch('http://localhost:3000/api/auth/signup');
        // });
        console.log('user : ', user);

    }






    // Form generation
    return (
        <FormContainer>
            <StyledH1>Créer votre compte</StyledH1>
            <InputContainer>
                <StyledLabel htmlFor="email">
                    Quel est votre e-mail ?
                </StyledLabel>
                <TextInput
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
                <TextInput type="password" id="password" />
            </InputContainer>
            <InputContainer>
                <StyledLabel htmlFor="confirm-password">
                    Confirmez votre mot de passe :
                </StyledLabel>
                <TextInput
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
                <TextInput
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
                            onClick={() => setInputAvatar('male_avatar.svg')}
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
                            onClick={() => setInputAvatar('female_avatar.svg')}
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
                    <StyledGreyButton
                        // type="submit"
                        onClick={submit}
                    >
                        Création du compte
                    </StyledGreyButton>
                </CreateButtonContainer>
            </InputContainer>
        </FormContainer>
    );
}

export default Signup;
