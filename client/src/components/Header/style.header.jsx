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
    @media screen and (max-width: 800px) {
        max-width: 800px;
        height: 140px;
    }
`;

export const HeaderLogo = styled.img`
    display: flex;
    width: 333px;
    @media screen and (max-width: 800px) {
        max-width: 200px;
    }
`;