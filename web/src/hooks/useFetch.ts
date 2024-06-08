import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  // biome-ignore lint/suspicious/noExplicitAny: Needs to be any for 
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setLoading(false);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
