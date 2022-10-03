// import { useEffect } from 'react';
import { useState } from 'react';
import { useGetFetch } from '../../utils/hooks/index.hook';
import Loader from '../../utils/style/Atom';
// require('dotenv').config({path:'../../config/.env'});


const Profil = () => {
    const [ isDataLoading, setDataLoading] = useState(false);
    const [ getUsers, setGetUsers] = useState({});
    const [error, setError] = useState(false);

    // Receveid data from server
    const { datas, isLoading } = useGetFetch(process.env.FETCH_USERS);

    
    // Get users from server
    // useEffect(() => {
    //     async function fetchUsers() {
    //         setDataLoading(true);
    //         try {
    //             const response = await fetch('http://localhost:5000/api/user');
    //             const { datas } = await response.json;
    //             setGetUsers(users);
    //         } catch (err) {
    //             console.log('Users reception failed : ', err);
    //             setError(true);
    //         } finally {
    //             setDataLoading(false);
    //         }
    //     }
    //     fetchUsers();
    // }, [])

    // if (error) return <span>Oups ! Il y a eu un problème.</span>
 
    return (
        <div>
            <h1>Profil</h1>
            {isDataLoading ? (<Loader />) : (
                <ul> {datas.map(data => (<li key={data.email}> {data} </li>))} </ul>
            )}
        </div>
    );
}

export default Profil;