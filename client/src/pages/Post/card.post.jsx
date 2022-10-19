import { useEffect, useState } from "react";
import Loader from "../../utils/style/Atom";
import { useDispatch, useSelector } from 'react-redux';  
import { isEmpty } from "../../utils/utils";
import { dateParser } from "../../utils/utils";
import LikeButton from "./like.post";
import { updatePost } from "../../action/post.action";
import DeleteCard from "./delete.post";
import { uploadPicture } from "../../action/user.actions";


/* Style */
/******* */
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

import { StyledLittlePinkButton } from "../../utils/style/StyledGlobalButton";
import { StyledInputFile } from '../../utils/style/StyledGlobalForm';
import edit from "../../assets/image/edit.svg";


/******* */
 



const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [file, setFile] = useState(null);

    // Redux
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    // When clicking on 'Modifier'
    const updateItem = async () => {
        if(file !== (null || undefined)) {
            const data = new FormData();
            data.append('file', file);
            data.append('message', textUpdate);
            await dispatch(uploadPicture(post._id, data));
        }
        if(textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        };
        setIsUpdated(false);
    };

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
                            <StyledEditMessageContainer className="editPost">
                                <StyledMessageTextaera 
                                    className="editPost"
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <StyledModifyButtonContainer>
                                    <StyledInputFile
                                        type="file"
                                        accept=".jpg, .jpeg, .png, .webp .gif"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <StyledModifyButton onClick={updateItem}>Modifier</StyledModifyButton>
                                </StyledModifyButtonContainer>
                            </StyledEditMessageContainer>
                        )}
                        {post.picture && 
                            <PostImageContainer>
                                <PostImg src={post.picture} alt="Illustration du post" />
                            </PostImageContainer>
                        }
                    </StyledCorpContainer>
                    <StyledBottomCommandContainer>
                        <StyledLikeContainer>
                            <LikeButton post={post}/>                            
                        </StyledLikeContainer>

                        {/* <div>
                            <StyledLittlePinkButton>
                                {<span>{post.comments.length} commentaire{post.comments.length > 1 ? 's ' : ' '}</span>}
                            </StyledLittlePinkButton>  
                        </div> */}

                            {userData._id === post.posterId || userData.admin_role === true && (
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