import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../utils/style/Atom";
import { isEmpty } from "../../utils/utils";

// Import icon
import picture from '../../assets/image/picture.svg';
// Style
import { 
    StyledEditMessageContainer,
    StyledPostFileInput, 
    StyledIconContainer, 
    StyledIconImg,
    StyledMessageTextaera,
    StyledModifyButtonContainer,
    StyledModifyButton
} from './style.post';




const CreatePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();

    // Redux
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = () => {};

    const trucPost = () => {};

    // Stop loading spinner
    useEffect(() => {
        if(!isEmpty(userData)) setIsLoading(false);
    }, [userData]);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <StyledEditMessageContainer>
                    <StyledMessageTextaera 
                        name="message"
                        id="message"
                        placeholder="Quoi de neuf ?"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <StyledIconContainer>
                        <StyledIconImg src={picture} alt="illustration du post" />
                        <StyledPostFileInput
                            type="file" 
                            id="file-upload" 
                            name="file" 
                            accept=".jpg, .jpeg, .png, .gif, .webp" 
                            oneChange={(e) => handlePicture(e)} 
                        />
                    </StyledIconContainer>
                    <StyledModifyButtonContainer>
                        <StyledModifyButton onClick={trucPost}>Poster</StyledModifyButton>
                    </StyledModifyButtonContainer>
                </StyledEditMessageContainer>
            )}
        </div>
    );
};

export default CreatePost;