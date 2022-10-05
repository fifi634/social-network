import styled from 'styled-components';
import { colors } from '../../config';

export const ErrorWrapper = styled.div`
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ErrorTitle = styled.h1`
    font-weight: 300;
`;

export const Illustration = styled.img`
    max-width: 800px;
    @media screen and (max-width: 800px) {
        max-width: 500px;
    }
    @media screen and (max-width: 500px) {
        max-width: 350px;
    }
`;

export const ErrorSubtitle = styled.h2`
    // font-weight: 300;
    color: ${colors.backgroundDark};
`;
