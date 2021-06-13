import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const props = useContext(AppContext);

  const baseUrl = "https://api.spotify.com/v1/";

  useEffect(() => {
    let controller = new AbortController();
    const getFetch = async () => {
      setIsLoading(true);
      try {
        const data = await props?.spotifyApi.getGeneric(baseUrl + url, {
          signal: controller.signal,
        });
        setData(data);
        console.log(data);
        setIsLoading(false);
        controller = null;
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    url && getFetch();
    return () => controller?.abort();
  }, [url, props?.spotifyApi]);

  return { data, error, isLoading };
};

export default useFetch;
