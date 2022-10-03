import { Link, useLocation } from 'react-router-dom';
import completLogo from '../../assets/image/icon-left-font-monochrome-white.png';

// Style
import { StyledHeader, HeaderLogo } from './style.header.jsx';
import { StyledPinkButton } from '../../utils/style/StyledGlobalButton';

function Header() {
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
            {pathname === '/login' ? (
                <Link to="/signup">
                    <StyledPinkButton type="button">
                        Vous n'avez pas de compte ?
                    </StyledPinkButton>
                </Link>
            ) : pathname === '/signup' ? (
                <Link to="/login">
                    <StyledPinkButton type="button">
                        Vous avez un compte ?
                    </StyledPinkButton>
                </Link>
            ) : (
                <Link to="/signup">
                    <StyledPinkButton type="button">
                        Connecté !
                    </StyledPinkButton>
                </Link>
            )}
        </StyledHeader>
    );
}

export default Header;
