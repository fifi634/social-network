import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UidContext } from '../../utils/context';
import completLogo from '../../assets/image/icon-left-font-monochrome-white.png';
import Logout from './logout.header';
import { useSelector } from 'react-redux';
//test avatar
import avatarTest from "../../assets/uploads/profil/Aven_d'Armand_(13).jpg1664657136384.jpg";

// Style
import { StyledPinkButton, StyledLittlePinkButton } from '../../utils/style/StyledGlobalButton';
import { 
    StyledHeader, 
    HeaderLogo, 
    StyledAvatarMenuContainer,
    StyledAvatarPcture,
    StyledUserMenuContainer,
    StyledPseudo
} from './style.header.jsx';


function Header() {
    const uid = useContext(UidContext);
    const userData = useSelector(state => state.userReducer);

    // Get path of url
    const pathname = useLocation().pathname;
    return (
        <StyledHeader>
            <Link to="/">
                <HeaderLogo
                    src={completLogo}
                    alt="Aller à la page d'accueil de Groupomania"
                />
            </Link>
            { pathname === '/login' ? (
                    <Link to="/signup">
                        <StyledPinkButton>
                            Vous n'avez pas de compte ?
                        </StyledPinkButton>
                    </Link>
                ) : pathname === '/signup' ? (
                    <Link to="/login">
                        <StyledPinkButton>
                            Vous avez un compte ?
                        </StyledPinkButton>
                    </Link>
                ) : uid ? (
                    <StyledAvatarMenuContainer>
                        <Link to="/profil">
                            <StyledAvatarPcture src={avatarTest} alt="avatar utilisateur"/>
                        </Link>
                        <StyledUserMenuContainer>
                            <StyledPseudo> {userData.pseudo} </StyledPseudo>
                            <Link to="/profil">
                                <StyledLittlePinkButton>Compte</StyledLittlePinkButton>
                            </Link>
                            <Logout />
                        </StyledUserMenuContainer>
                    </StyledAvatarMenuContainer>
                ) : (
                    <Link to="/login">
                        <StyledPinkButton>
                            Vous avez un compte ?
                        </StyledPinkButton>
                    </Link>
                )
            }
            
        </StyledHeader>
    );
}

export default Header;
