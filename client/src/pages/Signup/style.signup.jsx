import styled from 'styled-components';
// import colors from '../../utils/style/colors';

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
`;

export const AvatarRadioContainer = styled.div`
    display: flex;
    margin: 24px;
    align-items: center;
    @media screen and (max-width: 500px) {
        justify-content: center;
    }
`;

export const AvatarInput = styled.input`
    margin-right: 10px;
`;

export const CreateButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 48px auto 10px auto;
`;

export const StyledContainer = styled.div`
    display: flex;
    margin: auto;
    @media screen and (min-width: 800px)
    {
        max-width: 800px;
    }    
`;