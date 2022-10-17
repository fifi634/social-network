import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../utils/style/Atom";
import { isEmpty } from "../../utils/utils";

const CreatePost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();

    // Redux
    const userData = useSelector((state) => state.userReducer);

    // Stop loading spinner
    useEffect(() => {
        if(!isEmpty(userData)) setIsLoading(false);
    }, [userData]);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <textarea 
                        name="message"
                        id="message"
                        placeholder="Quoi de neuf ?"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div>
                        
                    </div>
                </>
            )}
        </div>
    );
};

export default CreatePost;