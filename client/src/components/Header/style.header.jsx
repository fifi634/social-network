import styled from 'styled-components';
import { colors } from '../../config';
import logoAlone from '../../assets/image/icon-monochrome-white.png';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1440px;
    height: 152px;
    background: ${colors.tertiary};
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    padding: 0 24px;
    @media screen and (min-width: 1440px) {
        box-shadow: unset;
    }
    @media screen and (max-width: 500px) {
        height: auto;
    }
`;

export const HeaderLogo = styled.img`
    display: flex;
    width: 333px;
    @media screen and (max-width: 800px) {
        max-width: 200px;
    }
    @media screen and (max-width: 550px) {
        display: none;
    }
`;

export const StyledAvatarMenuContainer = styled.div`
    display: flex;
    @media screen and (max-width: 550px) {
        margin: auto;
    }
`;

export const StyledLinkAvatarContainer = styled(Link)`
    margin: 10px;
    width: 120px;
    height: 120px;    
`;


export const StyledAvatarPicture = styled.img`
    position: relative;
    height: 100%;
    width: 100%;
    margin: auto;
    object-fit: cover;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    &[alt] {
        display: flex;
        color: #ffffff;
    }
    @media screen and (max-width: 330px) {
        display: none;
    }
`;

export const StyledUserMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledPseudo = styled.div`
    color: #FFFFFF;
    font-weight: 700;
    font-size: 24px;
    margin: 10px;
    @media screen and (max-width: 330px) {
        text-align: center;
    } 
`;

export const HeaderLogoDisconnect = styled.img`
    display: flex;
    width: 333px;
    @media screen and (max-width: 650px) {
        content: url(${logoAlone});
        max-width: 80px;
    }
`;
