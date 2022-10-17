// Asset import
import { useDispatch } from 'react-redux';
import { deletePost } from '../../action/post.action';
import trash from '../../assets/image/trash.svg';
// Style
import {
    StyledIconContainer,
    StyledIconImg
} from './style.post';

function DeleteCard(props) {
    const dispatch = useDispatch();

    const deleteQuote = () => dispatch(deletePost(props.id));

    return (
        <StyledIconContainer>
            <StyledIconImg 
                src={trash} 
                alt="Supprimer le post" 
                onClick={() => {
                    if(window.confirm('Voulez-vous supprimer ce post ?')) {
                        deleteQuote();
                    };
                }}
            />
        </StyledIconContainer>
    );
};

export default DeleteCard;
   