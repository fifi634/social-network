import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/style/Atom";
import { isEmpty, timestampParser } from "../../utils/utils";
import { addPost, getPosts } from "../../action/post.action";

// Import icon
import picture from '../../assets/image/picture.svg';
// Style
import { 
    StyledEditMessageContainer,
    StyledRowContainer,
    StyledPostFileInput,
    StyledFileP,
    StyledIconContainer, 
    StyledIconImg,
    StyledMessageTextaera,
    StyledModifyButtonContainer,
    StyledSpaceBetweenContainer,
    StyledModifyButton,
    AvatarContainer,
    AvatarImg,

    PostContainer,
    StyledCenterContainer,
    StyledUserInfoContainer,
    StyledH2,
    StyledCorpContainer,
    PostImageContainer,
    PostImg,
    StyledMessageP    
} from './style.post';
import { StyledError } from "../../utils/style/StyledGlobalForm";





const CreatePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    // const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();


    // Get user by Redux
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.userError);
    const dispatch = useDispatch();

   
    // // Upload picture error
    // const fileError = document.querySelector('.file.error');
    // fileError.innerHTML = '';


    const cancelPost = () => {
        setMessage('');
        // setPostPicture('');
        document.getElementById("file-upload").value = "";
        setFile('');
    };

    const handlePost = async () => {
        if(message) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if(file) data.append('file', file);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
        } else {
            alert("Veuillez entrer un message.")
        };
    };


    const handlePicture = (e) => {
        // async 
        // setPostPicture(URL.createObjectURL(e.target.files[0]));
        // await setFile(e.target.files[0]);
        setFile(e.target.files[0]);
    };



    // Stop loading spinner
    useEffect(() => {
        if(!isEmpty(userData)) setIsLoading(false);
    }, [userData]);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <StyledEditMessageContainer className="createPost">
                    <StyledMessageTextaera
                        className="createPost"
                        name="message"
                        id="message"
                        placeholder="Quoi de neuf ?"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    {/* {message || postPicture ? (
                        <PostContainer className="createPostOverview">
                            <StyledCenterContainer>
                                <AvatarContainer>
                                    <AvatarImg src={userData.avatar_slug} alt="Avatar du créateur du post" />
                                </AvatarContainer>
                                <StyledUserInfoContainer>
                                    <StyledH2>
                                        {userData.pseudo}
                                    </StyledH2>
                                    <span>{timestampParser(Date.now())}</span>
                                </StyledUserInfoContainer>
                            </StyledCenterContainer>
                            <StyledCorpContainer>
                            {file && 
                                <PostImageContainer>
                                    <PostImg src={file} alt="Illustration du post" />
                                </PostImageContainer>
                            }
                            <StyledMessageP>{message}</StyledMessageP>
                        </StyledCorpContainer>
                        </PostContainer>
                    ) : null} */}
                    <StyledSpaceBetweenContainer>                        
                            <label htmlFor="file-upload">
                                <StyledRowContainer>
                                    <StyledIconContainer>
                                        <StyledIconImg src={picture} alt="Editer le post" />
                                    </StyledIconContainer>
                                    {file ? (<StyledFileP>{file.name}</StyledFileP>) : ('')}
                                </StyledRowContainer>
                                {/* <StyledError><p>{error.maxSize}</p></StyledError>
                                <StyledError><p>{error.format}</p></StyledError> */}
                            </label>
                            <StyledPostFileInput
                                type="file" 
                                id="file-upload" 
                                name="file" 
                                accept=".jpg, .jpeg, .png, .gif, .webp" 
                                onChange={(e) => handlePicture(e)} 
                            />                           
                        <StyledModifyButtonContainer>
                            {message ? (
                                <StyledModifyButton onClick={cancelPost} className="cancelButton">Annuler</StyledModifyButton>
                            ): null }
                                <StyledModifyButton onClick={handlePost}>Poster</StyledModifyButton>
                        </StyledModifyButtonContainer>
                    </StyledSpaceBetweenContainer>                
                </StyledEditMessageContainer>
            )}
        </div>
    );
};

export default CreatePost;