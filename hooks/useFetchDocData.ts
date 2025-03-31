import { getDocument } from "@/firebase/getDocument";
import { useEffect, useState } from "react";
import { ILandingPage } from "@/tools/interfaces/ILandingPage";

const useFetchData = (slug?: string) => {
  const [data, setData] = useState<ILandingPage | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDocument("landing_pages", slug || "");
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

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return { data, loading, error };
};

export default useFetchData;