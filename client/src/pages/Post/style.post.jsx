import styled from 'styled-components';
import { colors } from '../../config';


export const StyledLi = styled.li`
    list-style: none;
`;

export const StyledCreatePostContainer = styled.div`
    // max-width: 1050px;
    // margin: 0 auto;  
`;

export const PostContainer = styled.div`
    max-width: 1000px;
    max-height: 695px;
    border: solid ${colors.tertiary} 1px;
    border-radius: 10px;
    margin: 40px auto;
    padding: 20px;
    background: rgba(78, 81, 102, 0.1);
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
    border-radius: 20px 20px 20px 6px;
    background-color: #ffffff;
    min-width: 350px;
    @media screen and (max-width: 800px) {
        min-width : 200px;
        width: auto;
        margin: 10px 0;
    }
    @media screen and (max-width: 400px) {
        min-width: unset;
    }
`;

export const StyledEditMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    background-color: ${colors.editPost};
    padding: 10px;
    border-radius: 20px 6px 20px 20px;
    &.createPost {
        max-width: 1000px;
        margin: 0 auto;
    }
    @media screen and (min-width: 800px) {
        margin: 0 10px;
        max-width: 500px;
    }

`;

export const StyledMessageTextaera = styled.textarea`
    margin: 15px 0 5px 0;
    border-radius: 20px 20px 6px 20px;
    border: solid 1px ${colors.primary};
    padding: 20px;
    max-width: auto;
    @media screen and (max-width: 800px) {
        max-width: 800px;
    }

`;

export const StyledModifyButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    margin: 0 0 10px 0;
`;

export const StyledModifyButton = styled.button`
    background: ${colors.primary};
    color: #ffffff;
    width: 160px;
    height: 30px;
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    border-radius: 6px 20px 20px 20px;
    border: 1px solid #000000;
    font-weight: 700;
    &:active {
        box-shadow: 0 0 0;
        border: 1px solid #ffffff;
        background: ${colors.tertiary};
        color: #ffffff;
    }
    &:hover {
        cursor: pointer;
        letter-spacing: 1px;
        background-color: ${colors.primary};
        transition: 0.3s
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

export const StyledIconsContainer = styled.div`
    display: flex;
`;

export const StyledIconContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 1.5px #ffffff;
    background-color: ${colors.secondary};
    margin: 5px;
    &:hover {
        cursor: pointer;
        background-color: ${colors.primary};
        transition: 0.5s;
    }
    &.editing {
        background-color: ${colors.primary};
    }
`;

export const StyledIconImg = styled.img`
    width: 20px;
    height: 20px;
    transform: translate(50%, 50%);
`;

export const StyledPostFileInput = styled.input`
    opacity: 0;
`;

export const StyledCountLikeContainer = styled.div`
    display: flex;
    align-items: center;
`;