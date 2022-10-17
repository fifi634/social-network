import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from "../../utils/utils";
// Style
import { StyledLittlePinkButton } from "../../utils/style/StyledGlobalButton";




function EditPost() {
    const [ textUpdate, setTextUpdate] = useState();
    

    // Get post for edit
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    console.log('posts ', posts);
    
    
    return (
        <form action="" >
            <label htmlFor="post-edit">Votre texte :</label>
            <textarea 
                id="post-edit" 
                // defaultValue={message}
                onChange={(e) => setTextUpdate(e.target.value)}/>
            <label htmlFor="post-picture">Illustration :</label>
            <input
                type="file"
                id="post-picture"
                accept=".jpg, .jpeg, .png, .webp .gif"
                // onChange={(e) => setFile(e.target.files[0])}
            />                
            <div className='post-picture error'></div>
            <div>
                <Link to="#">Supprimer le post</Link>
                <StyledLittlePinkButton>Modifier</StyledLittlePinkButton>
            </div>
            
        </form>
    );
};

export default EditPost;