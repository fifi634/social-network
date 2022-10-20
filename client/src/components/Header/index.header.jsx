import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UidContext } from '../../utils/context';
import completLogo from '../../assets/image/icon-left-font-monochrome-white-900x220.png';
import Logout from './logout.header';
import logoAlone from '../../assets/image/icon-monochrome-white.png';
import { useSelector } from 'react-redux';

// Style
import { 
    StyledPinkButton, 
    StyledGreyButton,
    StyledLittlePinkButton, 
    StyledLittleGreyButton 
} from '../../utils/style/StyledGlobalButton';

import { 
    StyledHeader,
    StyledDisconnectContainer,
    StyledLogoMenuContainer,
    StyledConnectContainer,
    HeaderLogoDisconnect,
    HeaderLogo, 
    StyledMenuContainer,
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
                    <StyledDisconnectContainer>
                        <Link to="/home">
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
                    </StyledDisconnectContainer>
                ) : pathname === '/signup' ? (
                    <StyledDisconnectContainer>
                        <Link to="/home">
                            <HeaderLogoDisconnect
                                src={completLogo}
                                alt="Aller à la page d'accueil de Groupomania"
                            />
                        </Link>
                        <Link to="/">
                            <StyledPinkButton>
                                Vous avez un compte ?
                            </StyledPinkButton>
                        </Link>
                    </StyledDisconnectContainer>
                ) : uid ? (
                    <StyledConnectContainer>
                        <StyledLogoMenuContainer>
                            <Link to="/home">
                                <HeaderLogo
                                    src={logoAlone}
                                    alt="Aller à la page d'accueil de Groupomania"
                                />
                            </Link>          
                        </StyledLogoMenuContainer>
                        <StyledMenuContainer to="/">
                            <Link to="/home">
                                {pathname === '/home' ? (
                                    <StyledGreyButton className='home'>Fil d'actualité</StyledGreyButton>
                                ) : (
                                    <StyledPinkButton className='home'>Fil d'actualité</StyledPinkButton>
                                )}
                            </Link>
                        </StyledMenuContainer> 
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
                    </StyledConnectContainer >
                ) : (
                    <StyledDisconnectContainer>
                        <Link to="/home">
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
                    </StyledDisconnectContainer>
                )
            }
        </StyledHeader>
    );
}

export default Header;
