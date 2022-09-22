import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1440px;
    height: 152px;
    background: ${colors.tertiary};
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    padding: 0 24px;
`;

export const HeaderLogo = styled.img`
    width: 333px;
`;
