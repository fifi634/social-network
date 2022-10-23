import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/style/Atom";
import { isEmpty, timestampParser } from "../../utils/utils";
import { addPost, getPosts, GET_USER_ERRORS } from "../../action/post.action";
import axios from 'axios';
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
import { fetchUrl } from "../../config";





const CreatePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    // const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();


    // Get user by Redux
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.uploadFile);
    const dispatch = useDispatch();


    // Upload picture Error
    let errorFormat = '';
    let errorSize = '';
    let uploadDocuments = document.getElementById('file-upload');
    if(error) errorFormat = "Format accepté : .jpg .jpeg .gif .webP";
    if(file && uploadDocuments.files[0].size >= 6291456) errorSize = "Taille maximale dépassée : 5 Mo";

    const cancelPost = () => {
        setMessage('');
        setFile('');
        // setPostPicture('');
        document.getElementById("file-upload").value = "";     
        errorFormat = '';
        errorSize = '';
    };

    const handlePost = async () => {
        
        if(message || (file && uploadDocuments.files[0].size < 6291456)) {
            console.log('1 create post');
            
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if(file) data.append('file', file);

            await dispatch(addPost(data));
            await dispatch(getPosts());
            cancelPost();
        } else {
            alert("Veuillez entrer un message ou charger une image au bon format et de taille inférieur à 5mo.")
        };
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
                                <StyledError>{errorFormat}</StyledError>
                                <StyledError>{errorSize}</StyledError>
                            </label>
                            <StyledPostFileInput
                                type="file" 
                                id="file-upload" 
                                name="file" 
                                accept=".jpg, .jpeg, .png, .gif, .webp" 
                                onChange={(e) => setFile(e.target.files[0])} 
                            />                           
                        <StyledModifyButtonContainer>
                            {message || file ? (
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