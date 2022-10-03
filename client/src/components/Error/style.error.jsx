import styled from 'styled-components';
import colors from '../../config/colors';

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
`;

export const ErrorSubtitle = styled.h2`
    // font-weight: 300;
    color: ${colors.backgroundDark};
`;
