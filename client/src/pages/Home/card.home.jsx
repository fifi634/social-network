import { useEffect, useState } from "react";
import Loader from "../../utils/style/Atom";
import { useSelector } from 'react-redux';  
import { isEmpty } from "../../utils/utils";
import { dateParser } from "../../utils/utils";
import LikeButton from "./like.home";


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
    StyledBottomCommandContainer,
    StyledLikeContainer,
    StyledModifyLink
} from "./style.home";

// import { StyledLittlePinkButton } from "../../utils/style/StyledGlobalButton";




/******* */
 
const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    // const userData = useSelector((state) => state.userReducer);

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
                        <StyledMessageP>{post.message}</StyledMessageP>
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
                        <StyledModifyLink to="#">Modifier</StyledModifyLink>
                    </StyledBottomCommandContainer>
                </PostContainer>
            )}
        </StyledLi>
    );
};

export default Card;