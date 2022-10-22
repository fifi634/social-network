import styled from 'styled-components';
import { colors } from '../../config';
// import picture from '../../assets/image/picture.svg';

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
    background: rgba(78, 81, 102, 0.1);
    box-shadow: 4px 4px 8px ${colors.boxShadow};
    &.createPostOverview {
        margin: unset;
        background: #ededef;
        box-shadow: none;
    }
`;

export const StyledCenterContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledSpaceBetweenContainer = styled.div`
    display: flex;
    justify-content: space-between;
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
        flex-direction: column;
    }
`;

export const PostImageContainer = styled.div`
    width: 550px;
    max-height: 350px;
    margin: 10px 0;
    border-radius: 25px;
    @media screen and (max-width: 800px) {
        width: auto;
    }
`;

export const PostImg = styled.img`
    max-height: 350px;
    width: 100%;
    object-fit: cover;
    border-radius: 25px;
`;

export const StyledMessageP = styled.p`
    overflow-wrap: anywhere;
    margin: 10px 20px 10px 50px;
    padding: 20px;
    border-radius: 6px 20px 20px 20px;
    background-color: #ffffff;
    width: 300px;
    white-space: pre-wrap;
    @media screen and (max-width: 800px) {
        width: auto;
    }
    @media screen and (max-width: 400px) {
        margin: 10px 0;
        max-height: 200px;
        overflow-y: scroll;
    }
    &.textAlone {
        width: auto;
    }
`;

export const StyledEditMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.editPost};
    padding: 10px;
    border-radius: 20px 6px 20px 20px;
    &.createPost {
        margin: -10px auto;
        max-width: 1000px;
        box-shadow: 0px 2px 2px ${colors.boxShadow};
    }
    &.editPost {
        margin: 10px 10px 0 10px; 
    }
    @media screen and (min-width: 800px) {
        margin: 0 10px;
        &.createPost {
            max-width: 1000px;
        }
        &.editPost {
            width: 400px;     
        }
        &.textAlone {
            width: 960px;
        }
    }
`;

export const StyledMessageTextaera = styled.textarea`
    margin: 15px 0 5px 0;
    border-radius: 20px 20px 6px 20px;
    border: solid 1px ${colors.primary};
    padding: 20px;
    @media screen and (min-width: 800px) {
        &.withPicture {
            height: 100px;
        }
    }
    @media screen and (max-width: 800px) {
        max-width: 800px;
    }
`;

export const StyledRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 510px) {
        flex-direction: column;
    }
`;

export const StyledPostFileInput = styled.input`
    opacity: 0;
    width: 0.1px;
`;

export const StyledFileP = styled.p`
    margin: 3px;
`;

export const StyledModifyButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0 10px 0;
    @media screen and (max-width: 300px) {
        flex-direction: column; 
    }
`;

export const StyledModifyButton = styled.button`
    background: ${colors.primary};
    color: #ffffff;
    width: 160px;
    height: 30px;
    margin: 0 0 0 10px;
    box-shadow: 0px 4px 4px ${colors.boxShadow};
    border-radius: 20px 6px 20px 20px;
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
    &.cancelButton {
        background: ${colors.tertiary};
    }
    @media screen and (max-width: 300px) {
        margin-top: 5px;
        width: 100px; 
    }
`;

export const StyledBottomCommandContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 300px) {
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
    cursor: pointer;
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
