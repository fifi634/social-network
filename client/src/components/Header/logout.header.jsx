import axios from 'axios';
import cookie from 'js-cookie';
import { fetchUrl } from '../../config';
// Style
import { StyledLittlePinkButton } from '../../utils/style/StyledGlobalButton';



const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "underfined") {
            cookie.remove(key, { expire: 1 });
        }        
    };

    const logout = async () => {
        await axios ({
            method: "get",
            url: `${fetchUrl}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch(err => console.log('Logout failed. ' + err))
        ;
        window.location = '/';
    };

    return (
        <StyledLittlePinkButton onClick={logout}>
            Déconnexion
        </StyledLittlePinkButton>
    );
};

export default Logout;

