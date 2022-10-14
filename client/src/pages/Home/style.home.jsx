import styled from 'styled-components';
import { colors } from '../../config';

export const AvatarContainer = styled.div`
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
    &[alt] {
        display: flex;
        color: #ffffff;
    }
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
    &[alt] {
        display: flex;
        color: #ffffff;
    }
    @media screen and (max-width: 330px) {
        display: none;
    }
`;