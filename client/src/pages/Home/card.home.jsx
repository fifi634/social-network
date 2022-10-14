import { useEffect, useState } from "react";
import Loader from "../../utils/style/Atom";
import { useSelector } from 'react-redux';  
import { isEmpty } from "../../utils/utils";

// Style
import { AvatarImg, AvatarContainer } from "./style.home";
 
const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    // const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);


    return (
        <li key={post._id}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                <AvatarContainer>
                    <AvatarImg src={
                        !isEmpty(usersData[0]) && 
                        usersData.map((user) => {
                            if(user._id === post.posterId) return user.avatar_slug;
                        }).join('')
                    } alt="Avatar du créateur du post" />
                </AvatarContainer>
                <div>
                    <h2>
                        {!isEmpty(usersData[0]) &&
                        usersData.map((user) => {
                            if(user._id === user.posterId) return user.pseudo;
                        }).join('')}
                    </h2>
                </div>
                </>
            )}
        </li>
    );
};

export default Card;