import { useState, useEffect } from 'react';


// Data send to server
export function useGetRequest(url) {
    const [getData, setGetData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        async function fetchGetData() {
            const response = await fetch(url);
            const data = await response.json();

            setGetData(data);
            setLoading(false);
        }
        
        setLoading(true);
        fetchGetData();
    }, [url]);

    return { isLoading, getData };
}


// Data received from server
export function usePostRequest(url) {
    const [postData, setPostData] = useState();
    const [postReceptionData, setPostReceptionData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [getPostError, setPostError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json',
            body: JSON.stringify({ postData })}
        };

        async function fetchPostData() {
            const response = fetch(url, requestOptions);
            const data = await response.json();
            setPostReceptionData(data);
            setLoading(false);
        };

        setLoading(true);
        fetchPostData();
    }, [url]);

    return { isLoading, postReceptionData }
}