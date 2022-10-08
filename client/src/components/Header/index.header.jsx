import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UidContext } from '../../utils/context';
import completLogo from '../../assets/image/icon-left-font-monochrome-white.png';
import Logout from './logout.header';
import { useSelector } from 'react-redux';

// Style
import { 
    StyledPinkButton, 
    StyledLittlePinkButton, 
    StyledLittleGreyButton 
} from '../../utils/style/StyledGlobalButton';

import { 
    StyledHeader,
    HeaderLogoDisconnect,
    HeaderLogo, 
    StyledAvatarMenuContainer,
    StyledLinkAvatarContainer,
    StyledAvatarPicture,
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
            { pathname === '/login' ? (
                    <>
                    <Link to="/">
                        <HeaderLogoDisconnect
                            src={completLogo}
                            alt="Aller à la page d'accueil de Groupomania"
                        />
                    </Link>
                    <Link to="/signup">
                        <StyledPinkButton>
                            Vous n'avez pas de compte ?
                        </StyledPinkButton>
                    </Link>
                    </>
                ) : pathname === '/signup' ? (
                    <>
                    <Link to="/">
                        <HeaderLogoDisconnect
                            src={completLogo}
                            alt="Aller à la page d'accueil de Groupomania"
                        />
                    </Link>
                    <Link to="/login">
                        <StyledPinkButton>
                            Vous avez un compte ?
                        </StyledPinkButton>
                    </Link>
                    </>
                ) : uid ? (
                    <>
                    <Link to="/">
                        <HeaderLogo
                            src={completLogo}
                            alt="Aller à la page d'accueil de Groupomania"
                        />
                    </Link>
                    <StyledAvatarMenuContainer>
                        <StyledLinkAvatarContainer to="/profil">
                            <StyledAvatarPicture src={userData.avatar_slug} alt="avatar utilisateur"/>
                        </StyledLinkAvatarContainer>
                        <StyledUserMenuContainer>
                            <StyledPseudo> {userData.pseudo} </StyledPseudo>                            
                            <Link to="/profil">
                                { pathname === '/profil' ? (
                                    <StyledLittleGreyButton>Compte</StyledLittleGreyButton>
                                ) : (
                                    <StyledLittlePinkButton>Compte</StyledLittlePinkButton>
                                )}                                
                            </Link>
                            <Logout />
                        </StyledUserMenuContainer>
                    </StyledAvatarMenuContainer>
                    </>
                ) : (
                    <>
                    <Link to="/">
                        <HeaderLogoDisconnect
                            src={completLogo}
                            alt="Aller à la page d'accueil de Groupomania"
                        />
                    </Link>
                    <Link to="/login">
                        <StyledPinkButton>
                            Vous avez un compte ?
                        </StyledPinkButton>
                    </Link>
                    </>
                )
            }
            
        </StyledHeader>
    );
}

export default Header;
