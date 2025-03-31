import { getDocument } from "@/firebase/getDocument";
import { useEffect, useState } from "react";

const useFetchData = (company?: string) => {
  const [data, setData] = useState<any>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDocument("landing_pages", company || "");
        if (res) {
          setData(res);
        } else {
          setError("Cliente não exsite");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (company) {
      fetchData();
    }
  }, [company]);

  return { data, loading, error };
};

export default useFetchData;