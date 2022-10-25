import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UidContext } from '../../utils/context';
import { likePost, unlikePost, getPosts } from "../../action/post.action";
// Style
import { StyledIconImg, StyledIconContainer, StyledCenterContainer } from './style.post';
// Icon
import heart from '../../assets/image/heart.svg';
import heartFilled from '../../assets/image/heart-filled.svg';



const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    
    // Send like to database
    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };
    
    // Send unlike to database
    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    };

    // Check if user has liked a post
    useEffect(() => {
        if(post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked]);


    return (
        <StyledCenterContainer>
            {uid && liked === false && (
                <StyledIconContainer onClick={like} className="createPost">
                    <StyledIconImg src={heart} alt="J'aime !" post={post}  />
                </StyledIconContainer>
            )}
            {uid && liked && (
                <StyledIconContainer onClick={unlike}>
                    <StyledIconImg src={heartFilled} alt="Je n'aime plus." post={post}  />
                </StyledIconContainer>
            )}
            {post.likers.length >= 1 && 
            <span>{post.likers.length} J'aime</span>}
        </StyledCenterContainer>        
    );
};

export default LikeButton;