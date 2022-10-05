import styled from 'styled-components';
import { colors } from '../../config';

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

export const StyledAvatarPcture = styled.img`
    border-radius: 50%;
    margin: 10px;
    width: 120px;
    height: 120px;
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
`;
