import { useState, useEffect, useRef } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url){
    // Think of this like an instance variable. React persists ref values between renders.
    const isMounted = useRef(false);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
      // Note: You must call .current to reference or change the ref's value
      isMounted.current = true;
        async function init(){
          try{
            const response = await fetch(baseUrl + url);
            if(response.ok){
                const json = await response.json();
                if(isMounted.current) setData(json);
            }else{
                throw response;
            }
          }catch(e){
            if(isMounted.current) setError(e);
          }finally{
            if(isMounted.current) setLoading(false);
          }
        }
        init();

        // this function will be called when the component unmounts
        return () => {
          isMounted.current = false;
        }
    }, [url]);

    return {data, error, loading};
}