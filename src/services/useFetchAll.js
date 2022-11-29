import { useState, useRef, useEffect } from "react";

export default function useFetchAll(urls) {
  // holds the array of urls from the previous run
  const prevUrls = useRef([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Only run if the array of URLs passed in changes
    if(areEqual(prevUrls.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrls.current = urls;

    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return { data, loading, error };
}


function areEqual(array1, array2){
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}