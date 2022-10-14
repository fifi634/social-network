import { useEffect, useState } from "react";
import Loader from "../../utils/style/Atom";
import { useSelector } from 'react-redux';  
import { isEmpty } from "../../utils/utils";
 
const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);


    return (
        <li key={post._id}>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <img src={
                        !isEmpty(usersData[0]) && 
                        usersData.map((user) => {
                            if(user.id === post.posterId) return user.avatar_slug;
                        }).join('')
                    } alt="" />
                </div> 
            )}
        </li>
    );
};

export default Card;