import { useDispatch } from 'react-redux';
import { deletePost } from '../../action/post.action';
import trash from '../../assets/image/trash.svg';
// Style
import { StyledIconImg } from './style.post';



function DeleteCard(props) {
    // Send post deleted and erase it in Redux
    const dispatch = useDispatch();
    const deleteQuote = () => dispatch(deletePost(props.id));

    return (
        <>
            <StyledIconImg 
                src={trash} 
                alt="Supprimer le post" 
                onClick={() => {
                    if(window.confirm('Voulez-vous supprimer ce post ?')) deleteQuote();
                }}
            />
        </>
    );
};

export default DeleteCard;
   