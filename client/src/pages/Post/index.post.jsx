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
    // const [countDisplay, setCountDisplay] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);


    // /* Infinity scroll */
    // /***************** */
    // // If window is in bottom, get 5 more post 
    // // (if addition of mouse position more 1 pixel is taller than windows size)
    // const loadMore = () => {
    //     if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
    //         setLoadPost(true);
    //     };
    // };

    // // Display posts with inifinty scroll
    // useEffect(() => {
    //     if (loadPost) {
    //         dispatch(getPosts(countDisplay));
    //         setLoadPost(false);
    //         setCountDisplay(countDisplay + 5);
    //     };
    //     window.addEventListener('scroll', loadMore);
    //     return () => window.removeEventListener('scroll', loadMore);
    // }, [loadPost, dispatch, countDisplay]);


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
