import styled from 'styled-components';
import { colors } from '../../config';

export const StyledPinkButton = styled.button`     
    background: ${colors.secondary};
    margin: 20px;
    width: 266px;
    height: 60px;
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    border-radius: 10px;
    border: 1px solid #000000;
    &:active {
        box-shadow: 0 0 0;
        border: 1px solid #ffffff;
        background: ${colors.tertiary};
        color: white;
    }
    &:hover {
        cursor: pointer;
        letter-spacing: 1px;
        transition: 0.3s
    }
    @ media screen and (max-width: 800px) {
        display: flex;
        width: auto;
        height: auto;
        margin: 5px;
    }
    @media screen and (max-device-width: 480px) {
        width: 160px;
    } 
`;

export const StyledGreyButton = styled.button`
    background: ${colors.tertiary};
    margin: 20px 0;
    width: 266px;
    height: 60px;
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    border-radius: 10px;
    border: 1px solid #000000;
    color: #ffffff;
    &:active {
        box-shadow: 0 0 0;
        border: 1px solid #000000;
        background: ${colors.secondary};
        color: #000000;
    }
    &:hover {
        cursor: pointer;
        letter-spacing: 1px;
        transition: 0.3s
    }
    @ media screen and (max-width: 800px) {
        display: flex;
        width: auto;
        height: auto;
        margin: 5px;
    }
    @media screen and (max-device-width: 480px) {
        width: 160px;
    } 
`;

export const StyledLittlePinkButton = styled.button`     
    background: ${colors.secondary};
    margin: 5px;
    width: 160px;
    height: 30px;
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    border-radius: 10px;
    border: 1px solid #000000;
    &:active {
        box-shadow: 0 0 0;
        border: 1px solid #ffffff;
        background: ${colors.tertiary};
        color: #ffffff;
    }
    &:hover {
        cursor: pointer;
        letter-spacing: 1px;
        transition: 0.3s
    }
`;

export const StyledLittleGreyButton = styled.button`
    background: ${colors.tertiary};
    // margin: 20px 0;
    margin: 5px;
    width: 160px;
    height: 30px;
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    border-radius: 10px;
    border: 1px solid #FFFFFF;
    color: #ffffff;
    &:active {
        box-shadow: 0 0 0;
        border: 1px solid #000000;
        background: ${colors.secondary};
        color: #000000;
    }
    &:hover {
        cursor: pointer;
        letter-spacing: 1px;
        transition: 0.3s
    }
`;