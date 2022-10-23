import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../action/post.action';
import { isEmpty } from '../../utils/utils';
import Card from './card.post';
import CreatePost from './create.post';
// Style
import { StyledThreadContainer } from './style.post';


function Thread() {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    // Display posts
    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        };
    }, [loadPost, dispatch]);


    return (
        <StyledThreadContainer>
            <CreatePost />
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card post={post} key={post._id} />;
                    })
                }
            </ul>            
        </StyledThreadContainer>
    );
};

export default Thread;
