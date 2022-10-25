import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/style/Atom";
import { isEmpty } from "../../utils/utils";
import { addPost, getPosts } from "../../action/post.action";
import picture from '../../assets/image/picture.svg';
// Style
import { 
    StyledEditMessageContainer,
    StyledRowContainer,
    StyledPostFileInput,
    StyledFileNameContainer,
    StyledFileP,
    StyledIconContainer, 
    StyledIconImg,
    StyledMessageTextaera,
    StyledModifyButtonContainer,
    StyledSpaceBetweenContainer,
    StyledModifyButton   
} from './style.post';
import { StyledError } from "../../utils/style/StyledGlobalForm";



const CreatePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState();


    // Get user and error by Redux
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.uploadFile);
    const dispatch = useDispatch();


    // Upload picture Error
    let errorFormat = '';
    let errorSize = '';
    let uploadDocuments = document.getElementById('file-upload');
    if(error) errorFormat = "Formats acceptés : .jpg / .jpeg / .png / .gif / .webP";
    if(file && uploadDocuments.files[0].size >= 6291456) errorSize = "Poid maximale dépassée : 5 Mo";


    // Erase entry new post and file, and errors message
    const cancelPost = () => {
        setMessage('');
        setFile('');
        document.getElementById("file-upload").value = "";     
        errorFormat = '';
        errorSize = '';
    };


    // When clicking on 'Poster'
    const handlePost = async () => {

        // If have a new message or new picture whith good size file
        // Make an new post object 
        if(message || (file && uploadDocuments.files[0].size < 6291456)) {            
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if(file) data.append('file', file);
            // Send new post and get last all posts update
            await dispatch(addPost(data));
            await dispatch(getPosts());
            cancelPost();
        } else {
            alert("Veuillez entrer un message et/ou charger une image au bon format avec un poid inférieur à 5 Mo.")
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
                    <label htmlFor='message'><h1>Quoi de neuf ?</h1></label>
                    <StyledMessageTextaera
                        className="createPost"
                        name="message"
                        id="message"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <StyledSpaceBetweenContainer>                        
                        <label htmlFor="file-upload">
                            <StyledRowContainer>
                                <StyledIconContainer>
                                    <StyledIconImg src={picture} alt="Editer le post" />
                                </StyledIconContainer>
                                {file ? (
                                    <StyledFileNameContainer>
                                        <StyledFileP>{file.name}</StyledFileP>
                                    </StyledFileNameContainer>
                                ) : ('')}
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