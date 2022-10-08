import { createContext, useState, useEffect } from 'react';
import { fetchUrl } from '../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from '../action/user.actions';

export const UidContext = createContext();

// Get userId for give it to all application
export const UidProvider = ({ children }) => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {
      axios({
        method: "get",
        url: `${fetchUrl}jwtid`,
        withCredentials: true
      })
        .then((res) => { setUid(res.data) })
        .catch((err) => console.log('userId useContext : No token. ' + err))
      ;
    };
    fetchToken();

    if (uid) dispatch(getUser(uid))
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[uid]);

  return (
      <UidContext.Provider value={uid}>
          {children}
      </UidContext.Provider>
  );
};