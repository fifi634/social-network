import styled from 'styled-components';
import { colors } from '../../config';
import logoAlone from '../../assets/image/icon-monochrome-white.png';
import completLogo from '../../assets/image/icon-left-font-monochrome-white-900x220.png';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
    max-width: 1440px;
    height: 152px;
    background: ${colors.tertiary};
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    padding: 12px 12px;
    @media screen and (min-width: 1440px) {
        box-shadow: unset;
    }
    @media screen and (max-width: 610px) {
        height: auto;
    }
`;

export const StyledDisconnectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 152px;
    align-items: center;
`;

export const StyledLogoMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 920px) {
        flex-direction: row;
    }
`;

export const StyledConnectContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 610px) {
        display: flex;
        flex-direction: column-reverse;
    }
`;

export const HeaderLogo = styled.img`
    max-width: 300px;
    content: url(${completLogo});
    @media screen and (max-width:1040px) {
        content: url(${logoAlone});
        max-height: 80px;
    }
    @media screen and (max-width: 760px) {
        display: none;
    }
`;

export const StyledMenuContainer = styled.div`
    display: flex;
    @media screen and (max-width: 920px) {
        align-items: center;
    })
    @media screen and (max-width: 400px) {
        display: flex;
        justify-context: center;
    }
`;

export const StyledAvatarMenuContainer = styled.div`
    display: flex;
    @media screen and (max-width: 610px) {
        margin: auto;
    }
`;

export const StyledLinkAvatarContainer = styled(Link)`
    margin: 10px;
    width: 120px;
    height: 120px;
    @media screen and (max-width: 400px) {
        display: none;
    }
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
    @media screen and (max-width: 400px) {
        align-items: center;
    }
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
    @media screen and (max-width: 610px) {
        content: url(${logoAlone});
        max-width: 80px;
    }
`;
