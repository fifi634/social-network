import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Loader from "../../utils/style/Atom";
import { useSelector } from 'react-redux';  
import { isEmpty } from "../../utils/utils";
import { dateParser } from "../../utils/utils";


/* Style */
/******* */
import { 
    StyledLi,
    PostContainer,
    StyledPosterContainer,
    StyledUserInfoContainer,
    AvatarImg, 
    AvatarContainer,
    PostImageContainer,
    PostImg
} from "./style.home";

import { StyledLittleGreyButton } from "../../utils/style/StyledGlobalButton";



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
                                }).join('')
                            } alt="Avatar du créateur du post" />
                        </AvatarContainer>
                        <StyledUserInfoContainer>
                            <h2>
                                {!isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if(user._id === post.posterId) return user.pseudo;
                                }).join('')}
                            </h2>
                            <span>{dateParser(post.createdAt)}</span>
                        </StyledUserInfoContainer>
                    </StyledPosterContainer>
                    {post.picture && 
                    <PostImageContainer>
                        <PostImg src={post.picture} alt="Illustration du post" />
                    </PostImageContainer>}
                    {post.video && (
                        <iframe
                            title={post._id}
                            width="500"
                            height="300"
                            src={post.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                    <p>{post.message}</p>
                    <div>
                        <StyledLittleGreyButton>
                            {<span>{post.comments.length} commentaire{post.comments.length > 1 ? 's ' : ' '}</span>}
                        </StyledLittleGreyButton>
                        <StyledLittleGreyButton> J'aime </StyledLittleGreyButton>
                    </div>
                    <div>
                        <Link to="#">Modifier</Link>
                    </div>
                </PostContainer>
            )}
        </StyledLi>
    );
};

export default Card;