import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UidContext } from '../../utils/context';
import { likePost, unlikePost } from "../../action/post.action";
// Style
import { StyledLittlePinkButton, StyledLittleGreyButton } from '../../utils/style/StyledGlobalButton';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    
    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };
    
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
        <>
            {uid && liked === false && (
                <StyledLittlePinkButton post={post} onClick={like}> J'aime </StyledLittlePinkButton>
            )}
            {uid && liked && (
                <StyledLittleGreyButton post={post} onClick={unlike}> J'aime </StyledLittleGreyButton>
            )}
        </>
        
    );
};

export default LikeButton;