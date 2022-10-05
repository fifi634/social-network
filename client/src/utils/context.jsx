import { createContext, useState, useEffect } from 'react';
import { fetchUrl } from '../config';
import axios from 'axios';

export const UidContext = createContext();

// Get userId for give it to all application
export const UidProvider = ({ children }) => {
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const fetchToken = async() => {
          axios({
            method: "get",
            url: `${fetchUrl}jwtid`,
            withCredentials: true
          })
            .then((res) => {
              setUid(res.data)})
            .catch((err) => console.log('No token'))
          ;
        };
        fetchToken();
    }, [uid]);

    return (
        <UidContext.Provider value={uid}>
            {children}
        </UidContext.Provider>
    );
};