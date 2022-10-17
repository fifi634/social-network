import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../config';


export const StyledLi = styled.li`
    list-style: none;
`;

export const PostContainer = styled.div`
    max-width: 1000px;
    max-height: 695px;
    border: solid ${colors.tertiary} 1px;
    border-radius: 10px;
    margin: 40px auto;
    padding: 20px;
    background: rgba(78, 81, 102, 0.04);
    box-shadow: 4px 4px 8px ${colors.boxShadow};
`;

export const StyledPosterContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledUserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
`;

export const StyledH2 = styled.h2`
    margin: 0;
`;

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    background-color:${colors.tertiary};
    width: 70px;
    height: 70px; 
    border-radius: 50%;
    @media screen and (max-width: 400px) {
        display: none;
    }
`;

export const AvatarImg = styled.img`
    position: relative;
    height: 100%;
    width: 100%;
    object-fit: cover;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
`;

export const StyledCorpContainer = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 800px) {
        flex-direction: column-reverse;
    }
`;

export const PostImageContainer = styled.div`
    width: 550px;
    height: 350px;
    margin: 10px 0;
    // border: solid ${colors.tertiary} 1px;
    border-radius: 25px;
    @media screen and (max-width: 800px) {
        width: auto;
    }
`;

export const PostImg = styled.img`
    position: relative;
    height: 100%;
    width: 100%;
    object-fit: cover;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
`;

export const StyledMessageP = styled.p`
    margin: 10px 20px;
    padding: 20px;
    border-radius: 20px;
    background-color: #ffffff;
    min-width: 350px;
    // border: solid ${colors.tertiary} 2px;
    @media screen and (max-width: 800px) {
        min-width : 200px;
        width: auto;
        margin: 10px 0;
    }
    @media screen and (max-width: 400px) {
        min-width: unset;
    }
`;

export const StyledBottomCommandContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 330px) {
        flex-direction: column;
    }
`;

export const StyledLikeContainer = styled.div`
    @media screen and (max-width: 550px) {
        display: flex;
        flex-direction: column;
    }
`;

export const StyledModifyLink = styled(Link)`
    color: ${colors.tertiary};
    &:hover {
        color: ${colors.primary};
    }
`;

export const StyledIconsContainer = styled.div`
    display: flex;
`;

export const StyledIconContainer = styled.div`
    border-radius: 50%;
    background-color: ${colors.secondary};
    margin: 5px;
    &:hover {
        cursor: pointer;
        background-color: ${colors.primary};
        transition: 0.5s;
    }
`;

export const StyledImg = styled.img`

`;