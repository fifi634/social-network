import { useEffect, useState } from "react";
import Loader from "../../utils/style/Atom";
import { useDispatch, useSelector } from 'react-redux';  
import { isEmpty } from "../../utils/utils";
import { dateParser } from "../../utils/utils";
import LikeButton from "./like.post";
import { updatePost } from "../../action/post.action";
import DeleteCard from "./delete.post";
import edit from "../../assets/image/edit.svg";
// Style
import { 
    StyledLi,
    PostContainer,
    StyledCenterContainer,
    StyledUserInfoContainer,
    StyledH2,
    AvatarImg, 
    AvatarContainer,
    StyledCorpContainer,
    PostImageContainer,
    PostImg,
    StyledMessageP,
    StyledEditMessageContainer,
    StyledMessageTextaera,
    StyledModifyButtonContainer,
    StyledModifyButton,
    StyledBottomCommandContainer,
    StyledLikeContainer,
    StyledIconsContainer,
    StyledIconContainer,
    StyledIconImg
} from "./style.post";

 

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);


    // Redux, get users and user informations
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    // When clicking on 'Modifier'
    const updateItem = () => {
        if(textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        };
        setIsUpdated(false);
    };


    // Stop loader
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);  


    
    return (
        <StyledLi key={post._id}>
            {isLoading ? (
                <Loader />
            ) : (
                <PostContainer>
                    <StyledCenterContainer>
                        <AvatarContainer>
                            <AvatarImg src={
                                !isEmpty(usersData[0]) && usersData.map((user) => {
                                    if(user._id === post.posterId) return user.avatar_slug;
                                    else return null;
                                }).join('')
                            } alt="Avatar du créateur du post" />
                        </AvatarContainer>
                        <StyledUserInfoContainer>
                            <StyledH2>
                                {!isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if(user._id === post.posterId) return user.pseudo;
                                        else return null;
                                    }).join('')
                                }
                            </StyledH2>
                            <span>{dateParser(post.createdAt)}</span>
                        </StyledUserInfoContainer>
                    </StyledCenterContainer>
                    <StyledCorpContainer>
                        {isUpdated === false && post.message && (
                            <StyledMessageP className={post.picture ? '' : 'textAlone'}>
                                {post.message}
                            </StyledMessageP>
                        )}
                        {isUpdated === true && (
                            <StyledEditMessageContainer className={post.picture ? 'editPost withPicture' : 'textAlone editPost'}>
                                <StyledMessageTextaera 
                                    className={post.picture ? 'withPicture' : ''}
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <StyledModifyButtonContainer>
                                    <StyledModifyButton onClick={updateItem}>Modifier</StyledModifyButton>
                                </StyledModifyButtonContainer>
                            </StyledEditMessageContainer>
                        )}
                        {post.picture && 
                            <PostImageContainer>
                                <PostImg src={post.picture} alt="Illustration du post" />
                                {console.log(post.picture)}
                            </PostImageContainer>
                        }
                    </StyledCorpContainer>
                    <StyledBottomCommandContainer>
                        <StyledLikeContainer>
                            <LikeButton post={post}/>                            
                        </StyledLikeContainer>
                            {(userData._id === post.posterId || userData.admin_role === true) && (
                                <StyledIconsContainer>
                                    <StyledIconContainer
                                        onClick={() => setIsUpdated(!isUpdated)}
                                        className={isUpdated ? "editing" : '' }
                                    >
                                        <StyledIconImg src={edit} alt="Editer le post" />
                                    </StyledIconContainer>
                                    <StyledIconContainer>
                                        <DeleteCard id={post._id} />
                                    </StyledIconContainer>
                                </StyledIconsContainer>
                            )}
                    </StyledBottomCommandContainer>
                </PostContainer>
            )}
        </StyledLi>
    );
};

export default Card;