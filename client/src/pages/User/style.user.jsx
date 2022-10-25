import styled from 'styled-components';
import { colors } from '../../config';


export const StyledP = styled.p`
    width: 568px;
    height: 24px;
    border-radius: 10px;
    font-size: 18px;
    padding: 10px 5px 10px 5px;
    @media screen and (max-width: 800px) {
        width: 450px;
    }
    @media screen and (max-width: 500px) {
        width: 350px;
    }
    @media screen and (max-width: 370px) {
        width: 200px;
        display: flex;
    }
`;

export const AvatarText = styled.div`
    display: flex;
    @media screen and (max-width: 800px) {
        justify-content: center;
    }
    @media screen and (max-width: 500px) {
        flex-direction: column;
        margin: auto;
    }
`;

export const StyledFilesName = styled.div`
    margin: 3px 5px;
`;

export const StyledAvatarImage = styled.img`
    width: 102px;
    height: 102px;
    &:hover {
        cursor: pointer;
    }
`;

export const StyledBoldContainer = styled.div`
    margin: 3px 0 3px 0;
    font-weight: 600;
    @media screen and (max-width: 370px) {
        width: 200px;
    }
`;

export const AvatarChoiceContainer = styled.div`
    display: flex;
    @media screen and (max-width: 800px) {
        flex-wrap: wrap;
        justify-content: center;;
    }
    @media screen and (max-width: 500px) {
        flex-direction: column;
    }
    @media screen and (max-width: 370px) {
        width: 200px;
    }
`;

export const AvatarRadioContainer = styled.div`
    display: flex;
    margin: 24px;
    align-items: center;
    @media screen and (max-width: 500px) {
        justify-content: center;
    }
    @media screen and (max-width: 370px) {
        width: 160px;
    }
`;

export const AvatarInput = styled.input`
    margin-right: 10px;
    &:hover {
        cursor: pointer;
    }
`;

export const CreateButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 48px auto 10px auto;
    align-items: center;
`;

export const StyledContainer = styled.div`
    display: flex;
    margin: auto;
    @media screen and (min-width: 800px)
    {
        max-width: 800px;
    }    
`;

export const StyledSignupSuccessH2 = styled.h2`
    color: #008000;
    text-align: center;
`;

export const StyledProfilControlContainer = styled.div`
    display: flex;
    width: 700px;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        flex-direction: column-reverse;
        width: auto;
        align-items: center;
    }
    @media screen and (max-width: 370px) {
        width: 200px;
    }
`;

export const StyledProfilLinkContainer = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 800px) {
        margin: 20px 0;
    }
    @media screen and (max-width: 370px) {
        flex-direction: column;        
    }
`;

export const StyledProfilLink = styled.a`
    margin: 0 20px;
    color: ${colors.tertiary};
    &:hover {
        cursor: pointer;
        letter-spacing: 1px;
        transition: 0.3s
    }
    &.delete {
        color: #7E1601;
    }
`;