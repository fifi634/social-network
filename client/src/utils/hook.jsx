// import { useState, useEffect } from 'react';
// import { fetchUrl } from '../config';

// // Data send to server 
// export function useGetFetch(url) {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!url) return;

//         async function fetchGetData() {
//             setIsLoading(true);
//             try {
//                 const response = await fetch(fetchUrl + url);
//                 const resData = await response.json();
//                 setData(resData);
//             } catch (err) {
//                 console.log('fetch get failed : ', err);
//                 setError(true);
//             } finally {
//                 setIsLoading(false);
//             };
//         };     
//         fetchGetData();
//     }, [url]);

//     return { isLoading, data, error };
// }


// // Data received from server
// export function usePostFetch(url) {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!url) return;

//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-type': 'application/json' },
//             body: JSON.stringify({ data })
//         };

//         async function fetchPostData() {            
//             setIsLoading(true);
//             try {
//                 const response = await fetch(process.env.FETCH_URL + url, requestOptions);
//                 const resData = await response.json();
//                 setData(resData);
//             } catch (err) {
//                 console.log('fetch post failed : ', err);
//                 setError(true);
//             } finally {
//                 setIsLoading(false);
//             };
//         };     
//         fetchPostData();
//     }, [url, data]);

//     return { isLoading, data, error };
// }