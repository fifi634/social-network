import styled from 'styled-components';
import { colors } from '../../config';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
`;

export const StyledH1 = styled.h1`
    margin: 48px 0 24px 0;
`;

export const InputContainer = styled.div`
    margin: 24px 0 0px 0;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 800px) {
        width: 500px;
    }
    @media screen and (max-width: 480px) {
        width: 350px;
    } 
`;

export const StyledLabel = styled.label`
    margin: 3px 0 3px 0;
    font-weight: 600;
`;

export const StyledSubLabel = styled.label`
    margin-bottom: 3px;
`;

export const StyledInput = styled.input`
    width: 568px;
    height: 24px;
    border-radius: 10px;
    font-size: 18px;
    padding: 10px 5px 10px 5px;
    border: 1px solid #000000;
    &:focus {
        color: ${colors.secondary};
        background: ${colors.tertiary};
        font-weight: 800;
        box-shadow: 0px 4px 4px ${colors.boxShadow};
    }
    @media screen and (max-width: 800px) {
        width: 450px;
    }
    @media screen and (max-width: 500px) {
        width: 350px;
    }
`;

export const StyledError = styled.div`
    color: ${colors.primary};
    font-weight: 700;
    max-width: 568px;
    @media screen and (max-width: 800px) {
        max-width: 450px;
    }
    @media screen and (max-width: 500px) {
        max-width: 350px;
    }
`;

export const StyledTermsLabel = styled.label`
    margin: 0 0 0 5px;
`;