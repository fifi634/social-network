import { useEffect, useState } from "react";
import Loader from "../../utils/style/Atom";
import { useDispatch, useSelector } from 'react-redux';  
import { isEmpty } from "../../utils/utils";
import { dateParser } from "../../utils/utils";
import LikeButton from "./like.post";
import { updatePost } from "../../action/post.action";
import DeleteCard from "./delete.post";
// Images import
import edit from "../../assets/image/edit.svg";
import trash from "../../assets/image/trash.svg";


/* Style */
/******* */
import { 
    StyledLi,
    PostContainer,
    StyledPosterContainer,
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

import { StyledLittlePinkButton } from "../../utils/style/StyledGlobalButton";

/******* */
 
const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    // Redux
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = () => {
        if(textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    return (
        <StyledLi key={post._id}>
            {isLoading ? (
                <Loader />
            ) : (
                <PostContainer>
                    <StyledPosterContainer>
                        <AvatarContainer>
                            <AvatarImg src={
                                !isEmpty(usersData[0]) && 
                                usersData.map((user) => {
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
                                }).join('')}
                            </StyledH2>
                            <span>{dateParser(post.createdAt)}</span>
                        </StyledUserInfoContainer>
                    </StyledPosterContainer>
                    <StyledCorpContainer>
                        {post.picture && 
                        <PostImageContainer>
                            <PostImg src={post.picture} alt="Illustration du post" />
                        </PostImageContainer>}
                        {/* {post.video && (
                            <iframe
                                title={post._id}
                                width="320"
                                height="350"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )} */}
                        {isUpdated === false && (<StyledMessageP>{post.message}</StyledMessageP>)}
                        {isUpdated === true && (
                            <StyledEditMessageContainer>
                                <StyledMessageTextaera 
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <StyledModifyButtonContainer>
                                    <StyledModifyButton onClick={updateItem}>Modifier</StyledModifyButton>
                                </StyledModifyButtonContainer>
                            </StyledEditMessageContainer>
                        )}
                    </StyledCorpContainer>
                    <StyledBottomCommandContainer>
                        <StyledLikeContainer>
                            <LikeButton post={post}/>
                            {post.likers.length >= 1 && 
                            <span> Aimé par {post.likers.length} personne{post.likers.length > 1 && 's'}</span>}
                        </StyledLikeContainer>

                        {/* <div>
                            <StyledLittlePinkButton> J'aime </StyledLittlePinkButton>
                            <StyledLittlePinkButton>
                                {<span>{post.comments.length} commentaire{post.comments.length > 1 ? 's ' : ' '}</span>}
                            </StyledLittlePinkButton>  
                        </div> */}
                        <StyledIconsContainer>
                            {userData._id === post.posterId && (
                                <StyledIconContainer 
                                    onClick={() => setIsUpdated(!isUpdated)}
                                    className={isUpdated ? "editing" : '' }
                                >
                                    <StyledIconImg src={edit} alt="Editer le post" />
                                </StyledIconContainer>
                            )}
                            <DeleteCard id={post._id} />
                        </StyledIconsContainer>

                        {/* <StyledModifyLink to="/edit-post">Modifier</StyledModifyLink> */}
                    </StyledBottomCommandContainer>
                </PostContainer>
            )}
        </StyledLi>
    );
};

export default Card;