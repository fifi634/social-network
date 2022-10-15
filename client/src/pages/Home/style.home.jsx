import styled from 'styled-components';
import { colors } from '../../config';


export const StyledLi = styled.li`
    list-style: none;
`;

export const PostContainer = styled.div`
    max-width: 830px;
    max-height: 695px;
    border: solid #000000 1px;
    border-radius: 10px;
    margin: 40px 0;
    padding: 20px;
    background: rgba(78, 81, 102, 0.07);
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

export const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    background-color:${colors.tertiary};
    width: 70px;
    height: 70px; 
    border-radius: 50%;
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
    @media screen and (max-width: 330px) {
        display: none;
    }
`;

export const PostImageContainer = styled.div`
    width: 650px;
    height: 350px;
    margin: 10px 0;
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
    @media screen and (max-width: 330px) {
        display: none;
    }
`;